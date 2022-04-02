declare namespace Zhuan {
    /** 成长记录基础信息 */
    export interface GrowingBaseInfo {
        date: string
        height: number
        weight: number
    }

    /** 成长记录 */
    export interface Growing extends GrowingBaseInfo {
        photoList: string[]
    }
}
