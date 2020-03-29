import {
  decrypt,
} from "../../utils/util.js"

const parseAccount = (text)=>{
  const data = JSON.parse(JSON.parse(decrypt(text)))
  const account = JSON.parse(data.Msg).query_card.card[0] // 查询信息
  return account
}

const parseBalance = (account,key)=>{
  const balance = account[key]
  const int = balance.split('')
  const float = int.splice(-2)
  return int.join('') + '.' +float.join('')
}

module.exports= {
  parseBalance: parseBalance,
  parseAccount: parseAccount
}