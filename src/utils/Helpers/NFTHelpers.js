import QuestionMark from 'assets/images/questionMark.svg'
import axios from 'axios'

export const fetchNFTImage = async (url) => {
  const json = await axios(url)
    .then((response) => response)
    .catch((error) => error.response)

  if (json.headers['content-type'].includes('image')) {
    return url
  } else {
    return json.hasOwnProperty('data') ? json.data.image : QuestionMark
  }
}

export const getNFTImage = async (url) => {
  if (String(url).startsWith('ipfs://')) {
    if (String(url).endsWith('.jpeg')) {
      return String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
    } else if (String(url).endsWith('.png')) {
      return String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
    } else if (String(url).endsWith('.gif')) {
      return String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
    } else if (String(url).endsWith('.jpg')) {
      return String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
    } else if (String(url).endsWith('.json')) {
      const formatedUrl = String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
      const test = await fetchNFTImage(formatedUrl)
      return String(test).replace('ipfs://', 'https://ipfs.io/ipfs/')
    } else {
      return await fetchNFTImage(url)
    }
  }

  if (String(url).startsWith('https://ipfs.io/ipfs/')) {
    if (String(url).endsWith('.jpeg')) {
      return url
    } else if (String(url).endsWith('.png')) {
      return url
    } else if (String(url).endsWith('.gif')) {
      return url
    } else if (String(url).endsWith('.jpg')) {
      return url
    } else {
      return await fetchNFTImage(url)
    }
  }

  if (String(url).startsWith('https://metadata.wav3.net/token/')) {
    return await fetchNFTImage(url)
  }

  if (String(url).includes('https://www.aptosnames.com/')) {
    const result = String(url).replace('/mainnet', '').replace('metadata', 'image')
    return result
  }

  if (String(url).startsWith('https://nftstorage.link/ipfs/')) {
    if (String(url).endsWith('.jpeg')) {
      return url
    } else if (String(url).endsWith('.png')) {
      return url
    } else if (String(url).endsWith('.gif')) {
      return url
    } else if (String(url).endsWith('.jpg')) {
      return url
    } else {
      return await fetchNFTImage(url)
    }
  }

  if (String(url).startsWith('https://cloudflare-ipfs.com/ipfs/')) {
    return await fetchNFTImage(url)
  }

  if (String(url).includes('.arweave.net')) {
    return url
  }

  if (String(url).startsWith('https://arweave.net/')) {
    return url
  }

  if (String(url).includes('https://lime-worried-crawdad-244.mypinata.cloud/ipfs/')) {
    return String(url).replace('https://lime-worried-crawdad-244.mypinata.cloud/ipfs/', 'https://ipfs.io/ipfs/')
  }

  if (String(url).includes('.ipfs.dweb.link')) {
    if (String(url).endsWith('.jpeg')) {
      return url
    } else if (String(url).endsWith('.png')) {
      return url
    } else if (String(url).endsWith('.gif')) {
      return url
    } else if (String(url).endsWith('.jpg')) {
      return url
    } else {
      return await fetchNFTImage(url)
    }
  }

  if (String(url).endsWith('.png')) {
    return url
  }

  if (String(url).endsWith('.gif')) {
    return url
  }

  if (String(url).endsWith('.jpg')) {
    return url
  }

  if (String(url).endsWith('.jpeg')) {
    return url
  }

  return QuestionMark
}
