import { MAINNET_NODE_URL } from "config"
import { AptosClient } from "aptos"
import axios from "axios"
import moment from 'moment';

const aptosClient = new AptosClient(MAINNET_NODE_URL, { WITH_CREDENTIALS: false, })

const TAVERN_CONTRACT_ADDRESS = '0xcfe80c7cfae84f1b66cd2dc65db923360acaaaa6042d9ac7c389c09e033be60e'
const TOKENS_HANDLE = '0xbb2d726882ca4baddf55a5c90f3c4d6a7cd2b6ba48366f2a8d5855c1ba03211'
const START_TS_HANDLE = '0x1683c737da487d28dbfb18f192eb330e2ee8c8a7bd150270f7cfa70b31d5ba18'

export const checkTavern = async (address) => {
  const { data } = await aptosClient.getAccountResource(TAVERN_CONTRACT_ADDRESS, `${TAVERN_CONTRACT_ADDRESS}::levels::TavernAdmin`)
  const secondsToLevel = data.seconds_to_level

  const options = {
    method: 'POST',
    url: `https://fullnode.mainnet.aptoslabs.com/v1/tables/${TOKENS_HANDLE}/item`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      key_type: 'address',
      value_type: 'vector<0x3::token::TokenId>',
      key: address
    }
  };

  const stakedBruhs = await axios.request(options).catch((error) => error.response)
  console.log(stakedBruhs)
  if (Object.keys(stakedBruhs).length > 0) {
    if (stakedBruhs.status === 200) {
      if (!stakedBruhs.data.hasOwnProperty('error_code')) {
        const getTimestamps = await Promise.all(
          stakedBruhs.data?.map(async (x) => [
            x.token_data_id.name,
            await aptosClient.getTableItem(START_TS_HANDLE, {
              key: x,
              key_type: '0x3::token::TokenId',
              value_type: 'u64',
            }),
          ]),
        );

        const startTimesMap = getTimestamps.reduce((prev, curr) => {
          try {
            prev[curr[0]] = new Date(parseInt(curr[1]) * 1000);
          } catch {
            prev[curr[0]] = null;
          }
          return prev;
        }, {});

        var stakedData = []

        stakedBruhs.data.forEach((token) => {
          const secondsPassed = (new Date() - new Date(startTimesMap[token.token_data_id.name])) / 1000;
          const numLevels = (secondsPassed / secondsToLevel).toFixed(0);
          const progress = (((secondsPassed % secondsToLevel) / secondsToLevel) * 100).toFixed(3);
          stakedData.push({ progress: progress, level: numLevels, tokens: { name: token.token_data_id.name, property: token.property_version, stakedAt: moment(startTimesMap[token.token_data_id.name]).format('DD/MM/YYYY HH:mm') } })
        })
        return { status: 200, staked: true, statusText: '', data: stakedData }
      } else {
        return { status: stakedBruhs.status, statusCode: 'warning', staked: false, statusText: stakedBruhs.data.error_code === 'table_item_not_found' ? 'The user has no staked bruh bears' : stakedBruhs.data.error_code }
      }
    } else {
      return { status: stakedBruhs.status, statusCode: 'warning', staked: false, statusText: stakedBruhs.data.error_code === 'table_item_not_found' ? 'The user has no staked bruh bears' : stakedBruhs.data.error_code }
    }
  }
}