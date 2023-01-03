import axios from 'axios'
import { mainnetTokens } from 'config/mainnetTokens'

export const getGlobalData = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/global`)
    .then((response) => response)
    .catch(() => 'error')
  return json
}

export const getCGTrendingCoins = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/search/trending`)
    .then((response) => response)
    .catch(() => 'error')
  return json
}

export const getCGDeFiData = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/global/decentralized_finance_defi`)
    .then((response) => response)
    .catch(() => 'error')
  return json.data.data
}

export const getTopCoins = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
    .then((response) => response)
    .catch(() => 'error')
  return json
}

export const getSimpleCoinPrice = async (id) => {
  const json = await axios(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getCoinData = async (id) => {
  const json = await axios(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getTokensPrice = async (tokens) => {
  var tokensList = []
  var tokensUSDList = []
  var value = 0
  if (Object.keys(tokens).length > 0) {
    if (tokens.status === 200) {
      if (Object.keys(tokens.data.data.current_coin_balances).length > 0) {
        tokens.data.data.current_coin_balances.forEach((x) => {
          if (x.coin_type !== '0x1::aptos_coin::AptosCoin' && x.amount > 0) {
            mainnetTokens.forEach((y) => {
              if (x.coin_type === y.token_type.type && y.coingecko_id !== '') {
                tokensList.push({ coingeckoId: y.coingecko_id, type: x.coin_type, name: x.coin_info.name, symbol: x.coin_info.symbol, amount: Number(x.amount) / 10 ** x.coin_info.decimals })
              }
            })
          }
        })
      }
    }
  }

  if (Object.keys(tokensList).length > 0) {
    await Promise.all(
      tokensList.map(async (x) => {
        const getPrice = await getCoinData(x.coingeckoId)
        if (getPrice.status === 200) {
          tokensUSDList.push(getPrice.data.market_data.current_price.usd * x.amount)
        }
      })
    )
    value = tokensUSDList.reduce(function (a, b) {
      return a + b
    })
  }

  return value
}

export const convertAptToUSD = async (balance) => {
  const getAptPrice = await getCoinData('aptos')
  const aptPrice = getAptPrice.data.market_data.current_price.usd
  if (Object.keys(balance).length > 0) {
    if (balance.status === 200) {
      if (Object.keys(balance.data.data.current_coin_balances).length > 0) {
        const result = Number(aptPrice) > 0 ? (Number(balance.data.data.current_coin_balances[0].amount) / 10 ** 8) * Number(aptPrice) : 0
        return result
      } else {
        return 0
      }
    } else {
      return 0
    }
  }
}
