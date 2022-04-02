/** 更新了成长记录 */
const UPDATED_GROWING = 'UPDATED_GROWING'

/**
 * 监听更新了成长记录事件的回调函数的类型
 */
type OnUpdatedGrowingCallBack = (growing: Zhuan.Growing) => void

/**
 * 发出更新了成长记录的事件
 * @param {Zhuan.Growing} 成长记录
 */
function emit(growing: Zhuan.Growing) {
    uni.$emit(UPDATED_GROWING, growing)
}

/**
 * 监听更新了成长记录事件
 * @param {OnAddedGrowingCallBack} callback 回调函数
 */
function on(callback: OnUpdatedGrowingCallBack) {
    uni.$on(UPDATED_GROWING, callback)
}

/**
 * 移除监听更新了成长记录事件
 * @param {OnAddedGrowingCallBack} callback 回调函数
 */
function off(callback?: OnUpdatedGrowingCallBack) {
    uni.$off(UPDATED_GROWING, callback)
}

export default {
    emit,
    on,
    off,
}
