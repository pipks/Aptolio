import axios from 'axios';

const INDEXER = 'https://indexer.mainnet.aptoslabs.com/v1/graphql'

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

export const getWalletTokensBalance = async (walletAddress) => {
  const data = JSON.stringify({
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

export const getTransactionByVersion = async (version) => {
  const json = await axios(`https://fullnode.mainnet.aptoslabs.com/v1/transactions/by_version/${version}`)
    .then((response) => response)
    .catch((error) => error.response);
  return json;
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