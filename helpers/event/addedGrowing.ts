/** 添加了成长记录 */
const ADDED_GROWING = 'ADD_GROWING'

/**
 * 监听添加了成长记录事件的回调函数的类型
 */
type OnAddedGrowingCallBack = (growing: Zhuan.Growing) => void

/**
 * 发出添加了成长记录的事件
 * @param {Zhuan.Growing} 成长记录
 */
function emit(growing: Zhuan.Growing) {
    uni.$emit(ADDED_GROWING, growing)
}

/**
 * 监听添加了成长记录事件
 * @param {OnAddedGrowingCallBack} callback 回调函数
 */
function on(callback: OnAddedGrowingCallBack) {
    uni.$on(ADDED_GROWING, callback)
}

/**
 * 移除监听添加了成长记录事件
 * @param {OnAddedGrowingCallBack} callback 回调函数
 */
function off(callback?: OnAddedGrowingCallBack) {
    uni.$off(ADDED_GROWING, callback)
}

export default {
    emit,
    on,
    off,
}
