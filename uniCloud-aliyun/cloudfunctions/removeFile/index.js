'use strict';

/**
 * 删除云存储的文件
 * @param data.fileList 文件 id  列表
 */
exports.main = async (data, context) => {
    const result = await uniCloud.deleteFile({
        fileList: data.fileList
    })
    return result
};
