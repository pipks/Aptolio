import axios from 'axios';
import BigNumber from 'bignumber.js';

const INDEXER = 'https://indexer.mainnet.aptoslabs.com/v1/graphql'

export const checkIfAddressExists = async (address) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resources`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
}

export const check0x3Resource = async (address) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resource/0x3::token::TokenStore`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
}

export const getBlockchainStats = async () => {
  const json = await axios(`https://api.apscan.io/blockchain_stats`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
};

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
    variables: { 'owner_address': walletAddress }
  })

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
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
      variables: { 'owner_address': walletAddress, 'amount': greaterThen }
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
      variables: { 'owner_address': walletAddress }
    })
  }

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
};

export const getWalletNFTsBalance = async (walletAddress) => {
  const json = await axios(`https://api-v1.topaz.so/api/profile-data?owner=${walletAddress}`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
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
    variables: { 'address': walletAddress }
  })

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
};

export const getWalletTransactions = async (walletAddress) => {
  const data = JSON.stringify({
    query: `query UserTransactions($address: String, $limit: Int) {
      user_transactions(
        where: {sender: {_eq: $address}}
        order_by: {timestamp: desc}
        limit: $limit
      ) {
        version
        timestamp
        sequence_number
        sender
        parent_signature_type
        max_gas_amount
        gas_unit_price
        expiration_timestamp_secs
        epoch
        entry_function_id_str
        block_height
      }
    }`,
    variables: { 'address': walletAddress, 'limit': 100 }
  })

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
};

export const getUserTransactionsVersions = async (walletAddress, limit, offset) => {
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
    variables: { 'address': walletAddress, 'limit': limit, 'offset': offset }
  })

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
};

export const getTransactionByVersion = async (version) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/transactions/by_version/${version}`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
}

export const getUserTransactions = async (walletAddress, limit, offset) => {
  const txVersions = await getUserTransactionsVersions(walletAddress, limit, offset)
  var mazafakas = []
  if (Object.keys(txVersions).length > 0 && txVersions.status === 200) {
    if (txVersions.data.data.move_resources.length > 0) {
      mazafakas = []
      await Promise.all(txVersions.data.data.move_resources.map(async (x) => {
        const getTx = await getTransactionByVersion(x.transaction_version)
        if (getTx.status === 200) {
          mazafakas.push(getTx.data)
        }
      }))
    }
  }
  mazafakas.sort((a, b) => b.version - a.version)
  return mazafakas
}

export const convertNameToAddress = async (name) => {
  const json = await axios(`https://www.aptosnames.com/api/mainnet/v1/address/${String(name).replace('.apt', '')}`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
}

export const convertAddressToName = async (address) => {
  const json = await axios(`https://www.aptosnames.com/api/mainnet/v1/name/${address}`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
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
    variables: { 'symbol': symbol }
  })

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
};

export const checkWalletSpecificTokenBalance = async (walletAddress, coinType) => {
  const data = JSON.stringify({
    query: `query checkTokenBalance($walletAddress: String, $coinType: String) {
      current_coin_balances(
        where: {owner_address: {_eq: $walletAddress}, coin_type: {_eq: $coinType}}
      ) {
        amount
      }
    }`,
    variables: { 'walletAddress': walletAddress, 'coinType': coinType }
  })

  const json = await axios.post(INDEXER, data)
    .catch((error) => error.response)
  return json;
};

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
    return a + b;
  });

  return sum
}