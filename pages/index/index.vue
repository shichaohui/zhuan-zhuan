<template>
  <view class="page minFullPage homePage">
    <view class="filter"><uni-datetime-picker type="daterange" @change="filter" /></view>
    <GrowingList v-if="data.growingListVisible" ref="growingListRef" class="growingList" />
    <HomeFab />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onReady, onShow } from '@dcloudio/uni-app'
import abandonPhoto from '@/helpers/abandonPhoto'
import HomeFab from './HomeFab.vue'
import GrowingList from './GrowingList.vue'

// 模板数据
const data = reactive({
  growingListVisible: false
})

// 列表组件引用
const growingListRef = ref<InstanceType<typeof GrowingList>>()

// 页面首次显示
onReady(() => {
  data.growingListVisible = true
})

// 页面展示
onShow(async () => {
  // 提交弃用照片
  abandonPhoto.submit()
})

// 筛选
function filter(dateRange: string[]) {
  growingListRef.value?.filter(dateRange)
}
</script>

<style lang="scss" scoped>
.homePage {
  position: relative;
}

.filter {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: 128upx;
  padding: 0 20upx;
  background: $uni-white;
  display: flex;
  align-items: center;
  border-bottom: 1upx solid $uni-border-1;

  .uni-date {
    width: 100%;
  }
}

.growingList {
  padding-top: 128upx;
  margin: 0 0-$page-spacing;
}
</style>
