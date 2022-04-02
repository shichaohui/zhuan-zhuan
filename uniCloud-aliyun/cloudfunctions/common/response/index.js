const CODE_SUCCESS = 20000
const CODE_ERROR = 40000

/**
 * 构建响应内容
 * @param {number} code 状态码
 * @param {string} message 状态信息
 * @param {Object} data 数据
 */
function buildResponse(code, message, data) {
    return {
        code,
        message,
        data
    }
}

/**
 * 构建成功响应内容
 * @param {Object} data 数据
 */
function buildSuccess(data) {
    return buildResponse(CODE_SUCCESS, "", data)
}

/**
 * 构建异常响应内容
 * @param {string} message 错误信息
 * @param {number} code 错误码，默认 {CODE_ERROR}
 * @param {Object} data 数据，默认 null
 */
function buildError(message, code = CODE_ERROR, data = null) {
    return buildResponse(code, message, data)
}

module.exports = {
    buildSuccess,
    buildError

}
