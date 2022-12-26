import moment from 'moment';

export const shortAddress = (address, length) => {
  try {
    return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
  } catch (error) {
    console.log(error)
  }
}

export const shortCoinType = (type) => {
  const getAddress = String(type).split('::')
  const result = `${shortAddress(getAddress[0], 5)}::${getAddress[1]}::${getAddress[2]}`
  return result
}

export const formatTimestamp = (timestamp) => {
  const result = String(timestamp).replace('T', ' ')
  return result
}

export const getExplorerURL = (type, data) => {
  switch (type) {
    case 'account':
      return `https://explorer.aptoslabs.com/account/${data}`
    case 'token':
      return `https://explorer.aptoslabs.com/token/${data}`
    case 'txn':
      return `https://explorer.aptoslabs.com/txn/${data}`
    case 'block':
      return `https://explorer.aptoslabs.com/block/${data}`
    default:
      return `https://explorer.aptoslabs.com/`
  }
}

export const convertTimestampToDate = (timestamp) => {
  const date = moment(Number(timestamp) / 1000);
  return date.format("DD/MM/YYYY hh:mm")
}