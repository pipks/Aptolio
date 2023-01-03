import axios from 'axios'
import { getCoinData } from './CoinGeckoAPI'

export const getFloorPrice = async (id) => {
  const options = {
    method: 'POST',
    url: 'https://api-v1.topaz.so/api/floor',
    headers: { 'Content-Type': 'application/json' },
    data: {
      collection_id: id,
    },
  }

  const fp = await axios.request(options).catch((error) => error.response)
  return fp
}

export const getNFTsUsdValue = async (nfts) => {
  var nftsFp = []
  var usd = 0
  if (Object.keys(nfts).length > 0) {
    if (nfts.status === 200) {
      if (nfts.data.error === null) {
        if (nfts.data.status === 200) {
          if (Object.keys(nfts.data.data).length > 0) {
            await Promise.all(
              nfts.data.data.map(async (x) => {
                const data = await getFloorPrice(x.collection_id)
                if (data.status === 200) {
                  const fp = data.data.data.floor / 10 ** 8
                  nftsFp.push(fp)
                }
              })
            )
          }
        }
      }
    }
  }

  const getAptPrice = await getCoinData('aptos')
  const aptPrice = getAptPrice.data.market_data.current_price.usd
  if (Object.keys(nftsFp).length > 0) {
    usd = nftsFp.reduce(function (a, b) {
      return a + b
    })
  }

  return usd > 0 ? usd * aptPrice : 0
}
