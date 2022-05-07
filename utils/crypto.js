// #ifdef APP-PLUS
import crypto from "@/node_modules/crypto-js/crypto-js"

export default crypto
// #endif

// #ifdef H5
import "@/node_modules/crypto-js/crypto-js"

export default window.CryptoJS
// #endif
