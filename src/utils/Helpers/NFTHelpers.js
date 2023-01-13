import QuestionMark from 'assets/images/questionMark.svg'
import axios from 'axios'
import ToadStakeButton from 'components/EcosystemProjects/Aptoads/StakeButton'
import MonkeysStakeButton from 'components/EcosystemProjects/AptosMonkeys/StakeButton'
import BearStakeButton from 'components/EcosystemProjects/BruhBears/StakeButton'

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

  if (String(url).startsWith('https://static.bluemove.net/')) {
    if (String(url).endsWith('.webp')) return url
    if (String(url).endsWith('.png')) return url
    if (String(url).endsWith('.jpg')) return url
    if (String(url).endsWith('.gif')) return url
    if (String(url).endsWith('.json')) return await fetchNFTImage(url)
  }

  if (String(url).startsWith('https://bluemovecdn')) {
    if (String(url).endsWith('.webp')) return url
    if (String(url).endsWith('.png')) return url
    if (String(url).endsWith('.jpg')) return url
    if (String(url).endsWith('.gif')) return url
    if (String(url).endsWith('.json')) return await fetchNFTImage(url)
  }

  if (String(url).startsWith('https://cdn.bluemove')) {
    if (String(url).endsWith('.webp')) return url
    if (String(url).endsWith('.png')) return url
    if (String(url).endsWith('.jpg')) return url
    if (String(url).endsWith('.gif')) return url
    if (String(url).endsWith('.json')) return await fetchNFTImage(url)
  }

  if (String(url).startsWith('https://ipfs.bluemove')) {
    if (String(url).endsWith('.webp')) return url
    if (String(url).endsWith('.png')) return url
    if (String(url).endsWith('.jpg')) return url
    if (String(url).endsWith('.gif')) return url
    if (String(url).endsWith('.json')) return await fetchNFTImage(url)
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

export const getFetchUrl = (url) => {
  if (String(url).startsWith('ipfs://')) {
    return String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
  }

  if (String(url).startsWith('https://ipfs.io/ipfs/')) {
    return url
  }

  if (String(url).startsWith('https://nftstorage.link/ipfs/')) {
    return String(url).replace('https://nftstorage.link/ipfs/', 'https://ipfs.io/ipfs/')
  }

  if (String(url).startsWith('https://cloudflare-ipfs.com/ipfs/')) {
    return String(url).replace('https://cloudflare-ipfs.com/ipfs/', 'https://ipfs.io/ipfs/')
  }

  return url
}

export const getNftDetails = async (url) => {
  const json = await axios(getFetchUrl(url))
    .then((response) => response)
    .catch((error) => error.response)
  return json.hasOwnProperty('status') && json.status === 200 ? json : []
}

export const convertHexToString = (hexString) => {
  if (String(hexString).startsWith('0x')) {
    const hex = hexString
    const hexArray = new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
    const decoder = new TextDecoder()
    const readableString = decoder.decode(hexArray)
    return readableString
  } else {
    return hexString
  }
}

export const checkIfStakable = (contractAddress, data) => {
  //Toads
  if (contractAddress === '0x74b6b765f6710a0c24888643babfe337241ad1888a55e33ed86f389fe3f13f52') {
    return <ToadStakeButton data={data.current_token_data.name} />
  }

  //Monkeys
  if (contractAddress === '0xf932dcb9835e681b21d2f411ef99f4f5e577e6ac299eebee2272a39fb348f702') {
    return <MonkeysStakeButton name={data.current_token_data.name} propertyVersion={data.property_version} />
  }

  //BruhBears
  if (contractAddress === '0x043ec2cb158e3569842d537740fd53403e992b9e7349cc5d3dfaa5aff8faaef2') {
    return <BearStakeButton name={data.current_token_data.name} propertyVersion={data.property_version} />
  }
}
