'use strict';

const response = require("response")

/**
 * 查询成长记录
 * @data.date 指定日期
 */
exports.main = async (data, context) => {
    try {
        if (!data.date) {
            return response.buildError("缺少 date 参数！")
        }
        const res = await uniCloud.database().collection('growing')
            .where({
                date: data.date
            })
            .get()
        if (res.data.length === 0) {
            return response.buildError("无相关数据！")
        }
        return response.buildSuccess(res.data[0])
    } catch (err) {
        console.error(err);
        return response.buildError(err.message)
    }
};
