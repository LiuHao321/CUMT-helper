const CryptoJS = require('./des.js')
import {
  toLogin
} from './navigate.js'

const key = 'flyingstudioisgood' // 密码
// 用户信息加密
const encypt = (text) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);

  const encrypted = CryptoJS.DES.encrypt(text, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString()
}
// 用户信息解密
const decrypt = (text) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(text)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
const hasToLogin = () => {
  wx.showToast({
    title: '请先登录教务系统',
  })
  toLogin()
}
const parseParams = (params) => {
  let querys = [],
    value
  for (const key in params) {
    value = params[key]
    if (Array.isArray(value)) {
      parseArr(key)
    } else {
      typeof value === 'object' ?
        parseObj(value) : querys.push(`${key}=${value}`)
    }
  }
  return '?' + querys.join('&')

  function parseArr(key) { // value: Array<string>
    // 拼接数组形式的query
    const value = params[key]
    let i, l = value.length;
    for (i = 0; i < l; i++) {
      querys.push(`${key}[]=${value[i]}`)
    }
  }

  function parseObj(obj) {
    // 拼接对象形式的query
    for (const key in obj) {
      const value = obj[key]
      querys.push(`${key}=${value}`)
    }
  }
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



module.exports = {
  formatTime: formatTime,
  encrypt: encypt,
  decrypt: decrypt,
  hasToLogin: hasToLogin,
  parseParams: parseParams
}