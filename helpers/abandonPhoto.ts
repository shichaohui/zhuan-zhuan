import cloudFile from '@/helpers/cloudFile'

/**
 * 缓存 key
 */
const STORAGE_KEY = 'abandonPhotoIdList'

/**
 * 添加准备弃用的照片
 * @param {Array<String>} ids 照片 id 列表
 */
async function add(ids: string[]) {
  if ((ids || []).length === 0) {
    return
  }
  const list: string[] = uni.getStorageSync(STORAGE_KEY) || []
  uni.setStorageSync(STORAGE_KEY, [...list, ...ids])
}

/**
 * 移除准备弃用的照片
 * @param {Array<String>} ids 照片 id 列表
 */
async function remove(ids: string[]) {
  if ((ids || []).length === 0) {
    return
  }
  const list: string[] = uni.getStorageSync(STORAGE_KEY) || []
  uni.setStorageSync(
    STORAGE_KEY,
    list.filter((item) => !ids.includes(item))
  )
}

/**
 * 提交弃用照片操作到服务器
 */
async function submit() {
  const list: string[] = uni.getStorageSync(STORAGE_KEY) || []
  if (list.length === 0) {
    return
  }
  try {
    await cloudFile.remove([...new Set(list)])
    uni.removeStorageSync(STORAGE_KEY)
  } catch (err) {
    // 报“指定 id 不存在”错误时，存在的 id 会正常删除，所以直接清理
    if (err.message === 'The specified Id does not exist.') {
      uni.removeStorageSync(STORAGE_KEY)
    }
  }
}

export default {
  add,
  remove,
  submit
}
