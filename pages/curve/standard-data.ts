/**
 * 数字数组的元素之间使用平均数的方式插值，并返回新的数组
 * @param {number[]} list 待插值数组
 * @param {number} insertCount 每两个元素直接的插值数量
 * @param {number} baseValue 基础值，没有的话就从第一个元素开始
 * @return 插值后的新数组
 */
function insertValues(list: number[], insertCount: number, baseValue?: number) {
  list = baseValue ? [baseValue, ...list] : [...list]
  const res = [list[0]]
  for (let i = 1; i < list.length; i++) {
    const offset = (list[i] - list[i - 1]) / (insertCount + 1)
    for (let j = 0; j < insertCount; j++) {
      res.push(Math.round((list[i - 1] + offset * (j + 1)) * 10) / 10)
    }
    res.push(list[i])
  }
  return baseValue ? res.slice(1) : res
}

// 标准身高，0-6个月，间隔 2 个月
const StandardHeightsStep2 = [50.4, 58.7, 64.6, 68.4]
// 标准身高，9-24个月，间隔 3 个月
const StandardHeightsStep3 = [72.6, 76.5, 79.8, 82.7, 85.6, 88.5]
// 标准身高，2.5岁-18岁，间隔 6 个月
const StandardHeightsStep6 = [
  93.3, 96.8, 100.6, 104.1, 107.7, 111.3, 114.7, 117.7, 120.7, 124.0, 127.1, 130.0, 132.7, 135.4,
  137.9, 140.2, 142.6, 145.3, 148.4, 151.9, 155.6, 159.5, 163.1, 165.9, 168.2, 169.8, 171.0, 171.6,
  172.1, 172.3, 172.7
]
// 标准身高，0-18岁的每个月
const StandardHeightList = [
  ...insertValues(StandardHeightsStep2, 1),
  ...insertValues(StandardHeightsStep3, 2, StandardHeightsStep2.at(-1)),
  ...insertValues(StandardHeightsStep6, 5, StandardHeightsStep3.at(-1))
]

// 标准体重，0-6个月，间隔 2 个月
const StandardWeightsStep2 = [3.32, 5.68, 7.45, 8.41]
// 标准体重，9-24个月，间隔 3 个月
const StandardWeightsStep3 = [9.33, 10.65, 10.68, 11.29, 11.93, 12.54]
// 标准体重，2.5岁-18岁，间隔 6 个月
const StandardWeightsStep6 = [
  13.64, 14.65, 15.63, 16.64, 17.75, 18.98, 20.18, 21.26, 22.45, 24.06, 25.72, 27.33, 28.91, 30.46,
  32.09, 33.78, 35.58, 37.69, 39.98, 42.49, 45.13, 48.08, 50.85, 53.37, 55.43, 57.08, 58.49, 59.35,
  60.12, 60.68, 61.4
]
// 标准体重，0-18岁的每个月
const StandardWeightList = [
  ...insertValues(StandardWeightsStep2, 1),
  ...insertValues(StandardWeightsStep3, 2, StandardWeightsStep2.at(-1)),
  ...insertValues(StandardWeightsStep6, 5, StandardWeightsStep3.at(-1))
]

// 生日年月
const BIRTHDAY_YEAR = 2020
const BIRTHDAY_MONTH = 5

// 计算从生日到指定日期的月数
function calcMonthCount(date:string) {
  const dateObj = new Date(date)
  return (dateObj.getFullYear() - BIRTHDAY_YEAR) * 12 + dateObj.getMonth() + 1 - BIRTHDAY_MONTH
}

/**
 * 计算标准身高
 * @param {string[]} dateList 日期列表
 * @return 日期列表对应的标准身高列表
 */
export function calcStandardHeightList(dateList: string[]) {
  return dateList.map(item => StandardHeightList[calcMonthCount(item)] || 0)
}

/**
 * 计算标准体重
 * @param {string[]} dateList 日期列表
 * @return 日期列表对应的标准体重列表
 */
export function calcStandardWeightList(dateList: string[]) {
  return dateList.map(item => StandardWeightList[calcMonthCount(item)] || 0)
}
