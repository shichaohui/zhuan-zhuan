'use strict';

const createConfig = require('uni-config-center')
const response = require("response")

/**
 * 验证密码
 * @param data.password 加密密码
 */
exports.main = async (data, context) => {
    const permissionConfig = createConfig({
        pluginId: 'permission'
    }).config()
    if (data.password === permissionConfig.password) {
        return response.buildSuccess()
    } else {
        return response.buildError("密码错误！")
    }
};
