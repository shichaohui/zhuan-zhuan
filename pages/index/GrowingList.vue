<template>
    <uni-list class="growingList" :border="false">
        <view
            class="growingItem"
            v-for="(growing, growingIndex) in growingList"
            :key="growing.date"
        >
            <view class="growingHeader" @click="handleViewGrowing(growingIndex)">
                <view class="date">{{ growing.date }}</view>
                <view class="baseInfo">{{ `${growing.height}cm / ${growing.weight}kg` }}</view>
                <view class="edit" @click.native.stop="handleEditGrowing(growingIndex)">
                    <uni-icons type="compose" />
                </view>
            </view>
			<view v-if="growing.photoList.length === 0" class="noPhoto">暂无照片</view>
            <uni-grid v-else class="growingPhotoList" :column="gridColumn" :showBorder="false">
                <uni-grid-item v-for="(photo, photoIndex) in growing.photoList" :key="photo">
                    <image
                        class="photo"
                        lazy-load
                        mode="aspectFill"
                        :src="thumbnailPhoto(photo)"
                        @click="previewPhoto(growingIndex, photoIndex)"
                    />
                </uni-grid-item>
            </uni-grid>
        </view>
        <uni-load-more
            v-if="growingListQuery.pageNo > 1 || loadStatus.moreType !== LoadMoreType.Idle"
            :status="loadStatus.moreType"
            @clickLoadMore="loadMore"
        />
        <uni-popup ref="descriptionPopupRef">
            <view class="description">{{ description.value }}</view>
        </uni-popup>
    </uni-list>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onShow, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import cloudApi from '@/helpers/cloudApi'
import event from '@/helpers/event'
import toast from '@/utils/toast'
import image from '@/utils/image'
import sleep from '@/utils/sleep'

/**
 * 枚举加载状态
 */
enum LoadStatusType {
    Idle = 1,
    Refresh = 2,
    LoadMore = 3,
}

/**
 * 枚举加载更多状态
 */
enum LoadMoreType {
    Idle = 'more',
    Loading = 'loading',
    NoMore = 'no-more',
}

/**
 * 照片宫格的列数
 */
const gridColumn = 3

/**
 * 列表请求参数
 */
const growingListQuery = reactive({
    pageNo: 1,
    pageSize: 12,
    dateStart: null,
    dateEnd: null,
})

/**
 * 列表数据
 */
const growingList = reactive([])

/**
 * 加载状态
 */
const loadStatus = reactive({
    type: LoadStatusType.Idle,
    moreType: LoadMoreType.Idle,
})

/**
 * 成长记录描述弹窗
 */
const descriptionPopupRef = ref()

/**
 * 展示的成长记录描述
 */
const description = reactive({
    value: '',
})

// 是否需要刷新
const needRefreshRef = ref(false)

// 监听数据变更
event.addedGrowing.on(() => (needRefreshRef.value = true))
event.updatedGrowing.on(() => (needRefreshRef.value = true))

// 通过触发下来刷新进行初始化
startPullDownRefresh()

/**
 * 页面每次展示的回调函数
 */
onShow(() => {
    needRefreshRef.value && startPullDownRefresh()
})

/**
 * 下拉刷新
 */
onPullDownRefresh(async () => {
    try {
        await refresh()
    } finally {
        needRefreshRef.value = false
        uni.stopPullDownRefresh()
    }
})

/**
 * 上拉触底
 */
onReachBottom(async () => {
    await loadMore()
})

/**
 * 触发下拉刷新
 */
function startPullDownRefresh() {
    uni.startPullDownRefresh()
}

/**
 * 刷新
 */
async function refresh() {
    if (loadStatus.type !== LoadStatusType.Idle) {
        return
    }
    try {
        loadStatus.type = LoadStatusType.Refresh
        await loadFirstPage()
    } catch (err) {
        console.error(err)
        toast.show('刷新失败')
    } finally {
        loadStatus.type = LoadStatusType.Idle
        loadStatus.moreType = LoadMoreType.Idle
    }
}

/**
 * 加载第一页数据
 */
async function loadFirstPage() {
    growingListQuery.pageNo = 1
    const list = await cloudApi.getGrowingList(growingListQuery)
    growingList.length = 0
    growingList.push(...list)
}

/**
 * 加载更多数据
 */
async function loadMore() {
    if (loadStatus.moreType === LoadMoreType.NoMore) {
        return
    }
    try {
        loadStatus.type = LoadStatusType.LoadMore
        loadStatus.moreType = LoadMoreType.Loading
        growingListQuery.pageNo += 1
        const list = await cloudApi.getGrowingList(growingListQuery)
        growingList.push(...list)
        loadStatus.moreType = list.length === 0 ? LoadMoreType.NoMore : LoadMoreType.Idle
    } catch (err) {
        console.error(err)
        toast.show('加载失败')
        loadStatus.moreType = LoadMoreType.Idle
    } finally {
        loadStatus.type = LoadStatusType.Idle
    }
}

/**
 * 筛选
 * @param {[String, String]} dateRange 日期范围
 */
function filter(dateRange: string[]) {
    growingListQuery.dateStart = dateRange[0]
    growingListQuery.dateEnd = dateRange[1]
    startPullDownRefresh()
}

/**
 * 获取照片缩略图
 * @param {String} photo 照片地址
 */
function thumbnailPhoto(photo) {
    return image.resize(photo, 300, 300, 'fill')
}

/**
 * 预览图片
 * @param {Number} growingIndex 成长记录索引
 * @param {Number} photoIndex 照片索引
 */
function previewPhoto(growingIndex, photoIndex) {
    uni.previewImage({
        current: photoIndex,
        urls: growingList[growingIndex].photoList,
    })
}

/**
 * 查看成长记录
 * @param {Number} growingIndex 成长记录索引
 */
function handleViewGrowing(growingIndex) {
    description.value = growingList[growingIndex].description || '无'
    descriptionPopupRef.value.open()
}

/**
 * 编辑成长记录
 * @param {Number} growingIndex 成长记录索引
 */
function handleEditGrowing(growingIndex) {
    const { date } = growingList[growingIndex]
    uni.navigateTo({
        url: `/pages/edit/index?date=${date}`,
    })
}

// 对外暴露接口
defineExpose({
    filter,
})
</script>

<style lang="scss" scoped>
.growingList {
}

.growingItem {
    padding: 20upx;
}

.growingHeader {
    display: flex;
    align-items: flex-end;

    .date {
        display: flex;
        align-items: center;
        font-size: 32upx;
    }

    .baseInfo {
        font-size: 24upx;
        color: $uni-base-color;
        margin-left: 20upx;
    }

    .edit {
        margin-left: 20upx;
        margin-bottom: -4upx;
    }
}

.noPhoto {
	margin-top: 10px;
	color: $uni-secondary-color;
}

.growingPhotoList {
    $photo-spacing: 10upx;

    width: calc(100% + $photo-spacing * 2);
    margin: -$photo-spacing;
    margin-top: 10upx;

    .photo {
        width: 100%;
        height: 100%;
        padding: $photo-spacing;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 10upx;
    }
}

.description {
    background: $uni-white;
    width: 80vw;
    height: 800upx;
    border-radius: 20upx;
    padding: 20upx;
    overflow: auto;
}
</style>
