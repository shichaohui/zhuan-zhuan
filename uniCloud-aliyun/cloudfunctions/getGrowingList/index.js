'use strict';

const response = require("response")

/**
 * 查询成长记录列表
 * @data.dateStart 开始日期，不传该参数标识不限制开始日期
 * @data.dateEnd 结束日期，不传该参数标识不限制结束日期
 * @data.pageSize 每页数据量，默认 20
 * @data.pageNo 页码，默认 1
 */
exports.main = async (data, context) => {
    try {
        const {
            dateStart = "0000-01-01", dateEnd = "9999-01-01", pageSize = 20, pageNo = 1
        } = data
        const db = uniCloud.database()
        const dbCmd = db.command
        const collection = db.collection('growing')
        const res = await collection
            .where({
                date: dbCmd.gte(dateStart).and(dbCmd.lte(dateEnd))
            })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .get()
        return response.buildSuccess(res.data)
    } catch (err) {
        console.error(err);
        return response.buildError(err.message)
    }
};
