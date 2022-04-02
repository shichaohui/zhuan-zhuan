/**
 * 生成创建时间和最近更新时间
 */
function generateCreatedAndUpdatedTime() {
    const date = new Date()
    return {
        createdTime: date,
        updatedTime: date
    }
}

/**
 * 生成最近更新时间
 */
function generateUpdatedTime() {
    return {
        updatedTime: new Date()
    }
}

module.exports = {
    generateCreatedAndUpdatedTime,
    generateUpdatedTime
}
