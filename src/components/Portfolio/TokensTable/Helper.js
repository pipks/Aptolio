import questionMark from 'assets/images/questionMark.svg'
import BigNumber from 'bignumber.js'
import { mainnetTokens } from 'config/mainnetTokens'

export const getTokenLogo = (type) => {
  var logoURI = ''
  mainnetTokens.forEach((x) => {
    if (String(x.token_type.type).toLocaleLowerCase() === String(type).toLocaleLowerCase()) {
      logoURI = x.logo_url
    }
  })
  return logoURI === '' ? questionMark : logoURI
}

export const sendCoin = async (sender, receiver, token, amount, decimals) => {
  const format = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals))
  const result = new BigNumber(format)
  const payload = {
    type: 'entry_function_payload',
    function: '0x1::coin::transfer',
    type_arguments: [token],
    arguments: [receiver, result.c[0]],
  }
  try {
    const transaction = await window.rise.generateTransaction(sender, payload)
    const response = await window.rise.signAndSubmitTransaction(transaction)
    const data = await window.rise.getTransaction(response)
    return data
  } catch (error) {
    return error
  }
}
