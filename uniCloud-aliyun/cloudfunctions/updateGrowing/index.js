'use strict';

const response = require('response')
const datetime = require('datetime')

/**
 * 更新成长记录
 * @param data.date 日期  
 * @param data.height 身高
 * @param data.weight 体重
 * @param data.description 描述
 * @param data.photoList 照片列表
 */
exports.main = async (data, context) => {
    try {
        const collection = uniCloud.database().collection('growing')
        const existCount = await collection
            .where({
                date: data.date
            })
            .count()
        if (existCount.total === 0) {
            return response.buildError("不存在该日期的数据！")
        }
        await collection
            .where({
                date: data.date
            })
            .update({
                ...data,
                ...datetime.generateUpdatedTime()
            })
        const res = await collection
            .where({
                date: data.date
            })
            .get()
        return response.buildSuccess(res.data[0])
    } catch (err) {
        console.error(err);
        return response.buildError(err.message)
    }
};
