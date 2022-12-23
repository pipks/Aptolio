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
  console.log(result)
  return result
}

export const getNFTImage = (url) => {
  if (String(url).includes('https://www.aptosnames.com/')) {
    const result = String(url).replace('/mainnet', '').replace('metadata', 'image')
    return result
  } else if (String(url).includes('ipfs://')) {
    const result = String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
    return result
  } else if (String(url).includes('https://lime-worried-crawdad-244.mypinata.cloud/ipfs/')) {
    const result = String(url).replace('https://lime-worried-crawdad-244.mypinata.cloud/ipfs/', 'https://ipfs.io/ipfs/')
    return result
  } else if (String(url).includes('https://nftstorage.link/ipfs/')) {
    const result = String(url).replace('https://nftstorage.link/ipfs/', 'https://ipfs.io/ipfs/')
    return result
  } else if (String(url).includes('https://cloudflare-ipfs.com/ipfs/')) {
    const result = String(url).replace('https://cloudflare-ipfs.com/ipfs/', 'https://ipfs.io/ipfs/')
    return result
  } else if (String(url).includes('https://ipfs.io/ipfs/')) {
    return url
  } else if (String(url).includes('.ipfs.dweb.link')) {
    return url
  } else {
    return 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
  }
}

export const formatTimestamp = (timestamp) => {
  const result = String(timestamp).replace('T', ' ')
  return result
}

export const getAddressFromFunctionId = (id) => {
  const result = String(id).split('::')[0]
  return result
}

export const getFunctionFromFunctionId = (id) => {
  if (String(id) === '0x1::aptos_account::transfer') {
    const result = 'Coin Transfer'
    return result
  } else {
    const func = String(id).split('::')
    const result = `${func[1]}::${func[2]}`
    return result
  }
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