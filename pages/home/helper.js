import {
  schedules
} from "../../utils/enum.js"
import {
  http_get
} from "../../utils/http.js"
import {
  parseParams
} from "../../utils/util.js"

// 获取今日课程
const getLessonsOfDay = (day, currentLessons) => {
  const todayLessons = []
  currentLessons["lessons"].forEach(lesson => {
    lesson.day === day &&
      todayLessons.push(lesson) &&
      (lesson.time = schedules[lesson.start - 1].begin) // 设置时间
  })
  return todayLessons
}

// 高德api https://restapi.amap.com/v3/weather/weatherInfo
// 徐州天气： appkey =	af63543d80ba0783a8d1ef2b4a408fb9 city=320300
const getWeather = () => {
  const params = {
    key: '10ad7b200068779b0d08940cfc0a1aa4',
    city: 320300
  }
  const query = parseParams(params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo' + query,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: resolve,
      fail: reject,
    })
  }).then(res => res.data.lives[0])
}
module.exports = {
  getWeather: getWeather,
  getLessonsOfDay: getLessonsOfDay
}