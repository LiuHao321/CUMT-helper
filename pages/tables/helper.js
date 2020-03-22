const sliceTimeTables = (timeTable) => {
  const weeks = {}
  let i = 0
  for (i; i < 20; i++) {
    weeks[i + 1] = []
  }
  timeTable.forEach(lesson => {
    lesson.week_list.forEach(w => {
      weeks[w].push(lesson)
    })
  })
  return weeks
}
const getTerm = () => {
  const laterTerm = [3, 4, 5, 6, 7] // 下学期
  const currentTime = new Date()
  const month = currentTime.getMonth() + 1 // 月份
  const day = currentTime.getDay()

  return (laterTerm.find(i => i === month) ||
    (month === 2 && day > 15) ||
    (month === 8 && day < 15)) ?
    2 : 1
}

module.exports= {
  sliceTimeTables: sliceTimeTables,
  getTerm: getTerm
}