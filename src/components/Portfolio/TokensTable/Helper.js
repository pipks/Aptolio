import { checkIfAddressExists, checkWalletSpecificTokenBalance, convertNameToAddress, check0x3Resource } from 'utils/APIs/AptosAPI'
import { mainnetTokens } from 'config/mainnetTokens'
import questionMark from 'assets/images/questionMark.svg'
import BigNumber from 'bignumber.js'

export const checkAddress = async (walletAddress, data) => {
  if (String(walletAddress).length > 60 && String(walletAddress).startsWith('0x', 0)) {
    const ifExists = await checkIfAddressExists(walletAddress)
    if (Object.keys(ifExists).length > 0) {
      if (ifExists.status === 200) {
        if (!ifExists.data.hasOwnProperty('error_code')) {
          if (data.hasOwnProperty('collection_name')) {
            const checkTokenStore = await check0x3Resource(walletAddress)
            if (checkTokenStore.status === 200 && !checkTokenStore.data.hasOwnProperty('error_code')) {
              return ({ status: 'success', type: 'address', error: '', address: walletAddress })
            } else {
              return ({ status: 'error', type: 'address', error: 'The recipient did not initialize an 0x3::token::TokenStore account in his wallet.', address: walletAddress })
            }
          } else {
            const getSendingTokenBalance = await checkWalletSpecificTokenBalance(walletAddress, data.coin_info.coin_type)
            if (Object.keys(getSendingTokenBalance).length > 0) {
              if (getSendingTokenBalance.status === 200) {
                if (Object.keys(getSendingTokenBalance.data.data.current_coin_balances).length > 0) {
                  if (getSendingTokenBalance.data.data.current_coin_balances[0].amount !== 0) {
                    return ({ status: 'success', type: 'address', error: '', address: walletAddress, tokenBalance: Number(getSendingTokenBalance.data.data.current_coin_balances[0].amount) / 10 ** data.coin_info.decimals })
                  } else {
                    if (data.coin_info.coin_type !== '0x1::aptos_coin::AptosCoin') {
                      return ({ status: 'success', type: 'address', error: '', address: walletAddress, tokenBalance: "0" })
                    } else {
                      return ({ status: 'success', type: 'address', error: `Account not found but will be created` })
                    }
                  }
                } else {
                  if (data.coin_info.coin_type !== '0x1::aptos_coin::AptosCoin') {
                    return ({ status: 'error', type: 'address', error: `The recipient needs to have a ${String(data.coin_info.symbol).toUpperCase()} account to be able to receive this transaction.` })
                  } else {
                    return ({ status: 'success', type: 'address', error: `Account not found but will be created` })
                  }
                }
              } else {
                return ({ status: 'error', type: 'address', error: 'Failed to check token balance' })
              }
            } else {
              return ({ status: 'warning', type: 'address', error: 'Checking token balanace' })
            }
          }
        } else {
          return ({ status: 'error', type: 'address', error: 'Account not found' })
        }
      } else {
        if (data.hasOwnProperty('collection_name')) {
          return ({ status: 'error', type: 'address', error: 'The recipient did not initialize an 0x3::token::TokenStore account in his wallet.', address: walletAddress })
        } else {
          if (data.coin_info.coin !== '0x1::aptos_coin::AptosCoin') {
            return ({ status: 'error', type: 'address', error: `The recipient needs to have a ${String(data.coin_info.symbol).toUpperCase()} account to be able to receive this transaction.` })
          } else {
            return ({ status: 'success', type: 'address', error: 'Account not found but will be created' })
          }
        }
      }
    }
  } else if (String(walletAddress).includes('.apt')) {
    const nameToAddress = await convertNameToAddress(walletAddress)
    if (Object.keys(nameToAddress).length > 0) {
      if (nameToAddress.status === 200) {
        if (nameToAddress.data.hasOwnProperty('address')) {
          if (data.hasOwnProperty('collection_name')) {
            const checkTokenStore = await check0x3Resource(nameToAddress.data.address)
            if (checkTokenStore.status === 200 && !checkTokenStore.data.hasOwnProperty('error_code')) {
              return ({ status: 'success', type: 'address', error: '', address: nameToAddress.data.address })
            } else {
              return ({ status: 'error', type: 'address', error: 'The recipient did not initialize an 0x3::token::TokenStore account in his wallet.', address: walletAddress })
            }
          } else {
            const getSendingTokenBalance = await checkWalletSpecificTokenBalance(nameToAddress.data.address, data.coin_info.coin_type)
            if (Object.keys(getSendingTokenBalance).length > 0) {
              if (getSendingTokenBalance.status === 200) {
                if (Object.keys(getSendingTokenBalance.data.data.current_coin_balances).length > 0) {
                  if (getSendingTokenBalance.data.data.current_coin_balances[0].amount !== 0) {
                    return ({ status: 'success', type: 'ans', error: '', address: nameToAddress.data.address, tokenBalance: Number(getSendingTokenBalance.data.data.current_coin_balances[0].amount) / 10 ** data.coin_info.decimals })
                  } else {
                    if (data.coin_info.coin_type !== '0x1::aptos_coin::AptosCoin') {
                      return ({ status: 'success', type: 'ans', error: '', address: nameToAddress.data.address, tokenBalance: "0" })
                    } else {
                      return ({ status: 'success', type: 'ans', error: `Account not found but will be created` })
                    }
                  }
                } else {
                  if (data.coin_info.coin_type !== '0x1::aptos_coin::AptosCoin') {
                    return ({ status: 'error', type: 'ans', error: `The recipient needs to have a ${String(data.coin_info.symbol).toUpperCase()} account to be able to receive this transaction.` })
                  } else {
                    return ({ status: 'success', type: 'ans', error: `Account not found but will be created` })
                  }
                }
              } else {
                return ({ status: 'error', type: 'address', error: 'Failed to check token balance' })
              }
            } else {
              return ({ status: 'warning', type: 'address', error: 'Checking token balanace' })
            }
          }
        } else {
          return ({ status: 'error', type: 'ans', error: `Address not found for ${walletAddress}` })
        }
      } else {
        return ({ status: 'error', type: 'ans', error: 'Failed to check address' })
      }
    }
  } else {
    return ({ status: 'error', type: 'address', error: 'Invalid Address' })
  }
}

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
    type: "entry_function_payload",
    function: "0x1::coin::transfer",
    type_arguments: [token],
    arguments: [receiver, result.c[0]]
  };
  try {
    const transaction = await window.rise.generateTransaction(sender, payload)
    const response = await window.rise.signAndSubmitTransaction(transaction);
    const data = await window.rise.getTransaction(response);
    return data
  } catch (error) {
    return error
  }
}