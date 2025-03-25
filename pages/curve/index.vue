<template>
  <view class="page fullPage curvePage">
    <view class="chartBox">
      <qiun-data-charts type="demotype" :loadingType="4" :chartData="chartData" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import cloudApi from '@/helpers/cloudApi'
import themeConstants from '@/themes/constants'

// 图表数据
const chartData = reactive({
  categories: [] as string[],
  series: [] as { name: string; data: string[] }[]
})

// 页面加载完成
onLoad(async () => {
  await init()
})

// 初始化
async function init() {
  const list = await cloudApi.getGrowingBaseInfoList({ pageSize: 9999 })
  const dateList: string[] = []
  const heightList: string[] = []
  const weightList: string[] = []
  list.reverse().forEach((item) => {
    dateList.push(item.date)
    heightList.push(item.height)
    weightList.push(item.weight)
  })
  chartData.categories.push(...dateList)
  chartData.series.push({
    name: '身高（cm）',
    data: heightList
  })
  chartData.series.push({
    name: '体重（kg）',
    data: weightList
  })
}
</script>

<style lang="scss" scoped>
.curvePage {
}

.chartBox {
  transform: rotate(90deg);
  width: 100%;
  height: 100%;
}
</style>
