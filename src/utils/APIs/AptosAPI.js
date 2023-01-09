import axios from 'axios'
import BigNumber from 'bignumber.js'
import { INDEXER } from 'config'

export const getAccountResources = async (walletAddress) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resources`)
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getBlockchainStats = async () => {
  const json = await axios(`https://api.apscan.io/blockchain_stats`)
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getWalletAPTBalance = async (walletAddress) => {
  const data = JSON.stringify({
    query: `query MyQuery($owner_address: String) {
      current_coin_balances(
        where: {owner_address: {_eq: $owner_address}, coin_type: {_eq: "0x1::aptos_coin::AptosCoin"}}
      ) {
        amount
        coin_info {
          name
          decimals
          coin_type
          symbol
        }
      }
    }`,
    variables: { owner_address: walletAddress },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getWalletTokensBalance = async (walletAddress, greaterThen) => {
  var data = null
  if (greaterThen === 0) {
    data = JSON.stringify({
      query: `query MyQuery($owner_address: String, $amount: numeric) {
        current_coin_balances(
          where: {owner_address: {_eq: $owner_address}, amount: {_gt: $amount}}
        ) {
          coin_info {
            coin_type
            coin_type_hash
            decimals
            name
            symbol
          }
          amount
          coin_type
          coin_type_hash
        }
      }`,
      variables: { owner_address: walletAddress, amount: greaterThen },
    })
  } else {
    data = JSON.stringify({
      query: `query MyQuery($owner_address: String) {
        current_coin_balances(where: {owner_address: {_eq: $owner_address}}) {
          coin_info {
            coin_type
            coin_type_hash
            decimals
            name
            symbol
          }
          amount
          coin_type
          coin_type_hash
        }
      }`,
      variables: { owner_address: walletAddress },
    })
  }

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getWalletNFTsCount = async (walletAddress) => {
  const data = JSON.stringify({
    query: `query userNftBalanceCount($wallet_address: String) {
      current_token_ownerships_aggregate(
        where: {owner_address: {_eq: $wallet_address}, amount: {_gt: "0"}}
      ) {
        aggregate {
          count
        }
      }
    }
    `,
    variables: { wallet_address: walletAddress },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getNfts = async (walletAddress, limit, offset) => {
  const data = JSON.stringify({
    query: `query MyQuery($address: String, $limit: Int, $offset: Int) {
      current_token_ownerships(
        where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, table_type: {_eq: "0x3::token::TokenStore"}}
        limit: $limit
        offset: $offset
        order_by: {collection_name: asc}
      ) {
        current_token_data {
          metadata_uri
          description
          creator_address
          collection_name
          name
          supply
          last_transaction_timestamp
          last_transaction_version
          royalty_points_numerator
          royalty_points_denominator
          royalty_mutable
          default_properties
        }
        property_version
        amount
        table_type
      }
    } `,
    variables: { address: walletAddress, limit: limit, offset: offset },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getWalletNftBalance = async (walletAddress, limit, offset, totalNfts) => {
  var nftList = []
  var offsetNum = 0

  if (totalNfts === 0) {
    return { status: 404, statusCode: 'info', errorText: 'You dont have NFTs on your wallet' }
  }

  if (totalNfts < 100) {
    const getData = await getNfts(walletAddress, limit, offset)
    if (getData.status === 200) {
      return getData.data.data.current_token_ownerships
    } else {
      return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
    }
  }

  if (totalNfts > 100) {
    do {
      const getData = await getNfts(walletAddress, limit, offsetNum)
      if (getData.status === 200) {
        getData.data.data.current_token_ownerships.forEach((x) => {
          nftList.push(x)
        })
      } else {
        return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
      }
      offsetNum += 100
    } while (offsetNum <= totalNfts)
    return nftList
  }

  return { status: 404, statusCode: 'error', errorText: 'oh no... something went wrong :(' }
}

export const getWalletTransactionsCount = async (walletAddress) => {
  const data = JSON.stringify({
    query: `query AccountTransactionsCount($address: String) {
      move_resources_aggregate(
        where: {address: {_eq: $address}}
        distinct_on: transaction_version
      ) {
        aggregate {
          count
          __typename
        }
        __typename
      }
    }`,
    variables: { address: walletAddress },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getWalletTransactionsVersions = async (walletAddress, limit, offset) => {
  const data = JSON.stringify({
    query: `query UserTransactions($address: String, $limit: Int, $offset: Int) {
      move_resources_aggregate(
        distinct_on: transaction_version
        where: {address: {_eq: $address}}
      ) {
        aggregate {
          count
        }
      }
      move_resources(
        where: {address: {_eq: $address}}
        order_by: {transaction_version: desc}
        distinct_on: transaction_version
        limit: $limit
        offset: $offset
      ) {
        transaction_version
      }}`,
    variables: { address: walletAddress, limit: limit, offset: offset },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getTransactionByVersion = async (version) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/transactions/by_version/${version}`)
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getUserTransactions = async (walletAddress, limit, offset) => {
  const txVersions = await getWalletTransactionsVersions(walletAddress, limit, offset)
  var mazafakas = []
  if (Object.keys(txVersions).length > 0 && txVersions.status === 200) {
    if (txVersions.data.data.move_resources.length > 0) {
      mazafakas = []
      await Promise.all(
        txVersions.data.data.move_resources.map(async (x) => {
          const getTx = await getTransactionByVersion(x.transaction_version)
          if (getTx.status === 200) {
            mazafakas.push(getTx.data)
          }
        })
      )
    }
  }
  mazafakas.sort((a, b) => b.version - a.version)
  return mazafakas
}

export const getUserSpentInFees = async (walletAddress, totalTransactions) => {
  var txs = []
  var offset = 0
  do {
    const data = await getUserTransactions(walletAddress, 100, offset)
    if (data.length > 0) {
      data.forEach((x) => {
        if (x.sender === walletAddress) {
          const result = new BigNumber(x.gas_used).div(new BigNumber(10).pow(8)).multipliedBy(new BigNumber(100)).toString()
          txs.push(Number(result))
        }
      })
    }
    offset += 100
  } while (offset !== totalTransactions)

  let sum = txs.reduce(function (a, b) {
    return a + b
  })

  return sum
}

export const checkWalletTokenBalance = async (walletAddress, coinType) => {
  const data = JSON.stringify({
    query: `query checkTokenBalance($walletAddress: String, $coinType: String) {
      current_coin_balances(
        where: {owner_address: {_eq: $walletAddress}, coin_type: {_eq: $coinType}}
      ) {
        amount
      }
    }`,
    variables: { walletAddress: walletAddress, coinType: coinType },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return { isError: !json.status === 200, balance: Object.keys(json.data.data.current_coin_balances).length > 0 ? json.data.data.current_coin_balances[0].amount : 0 }
}

export const checkAddressResource = async (walletAddress, resource) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resource/0x1::coin::CoinStore<${resource}>`)
    .then((response) => response)
    .catch((error) => error.response)
  if (json.status === 200 && !json.data.hasOwnProperty('error_code')) {
    return { isError: false, balance: json.data.data.coin.value }
  } else {
    return { isError: true, balance: 0 }
  }
}

export const checkAddressExists = async (walletAddress) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resources`)
    .then((response) => response)
    .catch((error) => error.response)
  return json.status === 200 && !json.data.hasOwnProperty('error_code') && json.data[0].type === '0x1::account::Account'
}

export const checkTokenStore = async (walletAddress) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resource/0x3::token::TokenStore`)
    .then((response) => response)
    .catch((error) => error.response)
  return json.status === 200 && json.data.type === '0x3::token::TokenStore'
}

export const convertNameToAddress = async (name) => {
  const json = await axios(`https://www.aptosnames.com/api/mainnet/v1/address/${String(name).replace('.apt', '')}`)
    .then((response) => response)
    .catch((error) => error.response)
  return { status: json.status === 200, address: json.status === 200 ? json.data.address : null }
}

export const convertAddressToName = async (walletAddress) => {
  const json = await axios(`https://www.aptosnames.com/api/mainnet/v1/name/${walletAddress}`)
    .then((response) => response)
    .catch((error) => error.response)
  return { status: json.status === 200, name: json.status === 200 ? json.data.name : null }
}

export const searchTokensBySymbol = async (symbol) => {
  const data = JSON.stringify({
    query: `query SearchTokens($symbol: String) {
      coin_infos(where: {symbol: {_ilike: $symbol}}) {
        symbol
        transaction_created_timestamp
        transaction_version_created
        supply_aggregator_table_key
        supply_aggregator_table_handle
        name
        decimals
        creator_address
        coin_type_hash
        coin_type
      }
    }
    `,
    variables: { symbol: symbol },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}
