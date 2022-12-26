import QuestionMark from 'assets/images/questionMark.svg'

export const getNFTImage = (url) => {
  if (String(url).endsWith('.json')) {
    return QuestionMark
  }

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
  } else if (String(url).endsWith('.json')) {
    return QuestionMark
  } else {
    return QuestionMark
  }
}