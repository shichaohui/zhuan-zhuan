/**
 * 显示成功状态的 Toast
 * @param {String} title 提示信息
 */
function showSuccess(title: string) {
  uni.showToast({
    icon: 'success',
    title
  })
}

/**
 * 显示错误状态的 Toast
 * @param {String} title 提示信息
 */
function showError(title: string) {
  uni.showToast({
    icon: 'error',
    title
  })
}

/**
 * 显示无状态的 Toast
 * @param {String} title 提示信息
 */
function show(title: string) {
  uni.showToast({
    icon: 'none',
    title
  })
}

/**
 * 隐藏 Toast
 */
function hide() {
  uni.hideToast()
}

/**
 * 显示加载状态的 Toast
 * @param {String} title 提示信息
 */
function showLoading(title: string) {
  uni.showLoading({
    title
  })
}

/**
 * 隐藏加载状态的 Toast
 */
function hideLoading() {
  uni.hideLoading()
}

export default {
  showSuccess,
  showError,
  show,
  hide,
  showLoading,
  hideLoading
}
