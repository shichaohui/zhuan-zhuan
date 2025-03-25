const CODE_SUCCESS = 20000
const CODE_ERROR = 40000

/**
 * 格式化请求参数
 * @param {Object} data 请求参数
 */
function formatRequestData(data?: any) {
  if (data === null || data === undefined) {
    return undefined
  }
  const newData: { [key: string]: any } = {}
  for (let entry of Object.entries(data)) {
    if (entry[1] !== null && entry[1] !== undefined) {
      newData[entry[0]] = entry[1]
    }
  }
  return newData
}

/**
 * 发起云函数请求
 * @param {String} name 云函数名
 * @param {Object} data 传递给云函数的参数
 */
async function request<T>(name: string, data?: any) {
  try {
    const res = await uniCloud.callFunction({
      name,
      data: formatRequestData(data)
    })
    const { code, message, data: resData } = res.result
    if (code === CODE_SUCCESS) {
      return resData as T
    }
    if (code === CODE_ERROR) {
      throw Error(message)
    }
    throw Error(message)
  } catch (err) {
    throw Error(err.message)
  }
}

/**
 * 添加一条成长记录
 * @param {Zhuan.Growing} growing 成长记录
 */
function insertGrowing(growing: Zhuan.Growing) {
  return request('insertGrowing', growing)
}

/**
 * 查询成长记录
 * @param {String} date 日期
 * @return {Zhuan.Growing} 成长记录
 */
function getGrowing(date: string): Promise<Zhuan.Growing> {
  return request<Zhuan.Growing>('getGrowing', { date })
}

/**
 * 编辑成长记录
 * @param {Zhuan.Growing} growing 成长记录
 */
function updateGrowing(growing: Zhuan.Growing): Promise<Zhuan.Growing> {
  return request<Zhuan.Growing>('updateGrowing', growing)
}

/**
 * 查询成长记录列表
 * @param {String} query.dateStart 开始日期
 * @param {String} query.dateEnd 结束日期
 * @param {Number} query.pageSize 每页数据量
 * @param {Number} query.pageNo 页码
 * @return {Zhuan.Growing[]} 成长记录列表
 */
function getGrowingList(query: {
  dateStart?: string
  dateEnd?: string
  pageSize?: number
  pageNo?: number
}): Promise<Zhuan.Growing[]> {
  return request<Zhuan.Growing[]>('getGrowingList', query)
}

/**
 * 查询成长记录基础信息列表
 * @param {String} query.dateStart 开始日期
 * @param {String} query.dateEnd 结束日期
 * @param {Number} query.pageSize 每页数据量
 * @param {Number} query.pageNo 页码
 * @return {Zhuan.GrowingBaseInfo[]} 成长记录列表
 */
function getGrowingBaseInfoList(query: {
  dateStart?: string
  dateEnd?: string
  pageSize?: number
  pageNo?: number
}): Promise<Zhuan.GrowingBaseInfo[]> {
  return request<Zhuan.GrowingBaseInfo[]>('getGrowingBaseInfoList', query)
}

/**
 * 验证密码
 * @param {String} password 密码
 */
function verifyPassword(password: string): Promise<boolean> {
  return request<boolean>('verifyPassword', { password })
}

export default {
  insertGrowing,
  getGrowing,
  updateGrowing,
  getGrowingList,
  getGrowingBaseInfoList,
  verifyPassword
}
