import * as importCrypto from '@/node_modules/crypto-js/crypto-js'

/*
 * uni 的坑：开发环境 H5 无法直接 import。
 * 解决：这里使用 window.CryptoJS 兼容开发环境 H5。
 * 备注：如果 window.CryptoJS 为 undefined，则需要在 crypto-js 文件中修改 root.CryptoJS 为 (root || window).CryptoJS。
 */
let crypto = importCrypto.default || window.CryptoJS

export default crypto
