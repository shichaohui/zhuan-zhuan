/**
 * 开启 Promise 化的定时器
 * @param {Number} timeout 定时时间，单位：毫秒
 */
async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default sleep
