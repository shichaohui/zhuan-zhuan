/**
 * 从云存储中删除文件
 * @param {Array<String>} fileIdList 要删除的文件 ID 组成的数组
 */
function remove(fileIdList: string[]) {
  return uniCloud.callFunction({
    name: 'removeFile',
    data: {
      fileList: fileIdList
    }
  })
}

export default {
  remove
}
