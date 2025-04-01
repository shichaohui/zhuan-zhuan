<template>
  <view class="page fullPage curvePage">
    <qiun-data-charts type="line" :loadingType="4" :opts="options" :chartData="chartData" />
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import cloudApi from '@/helpers/cloudApi'
import themeConstants from '@/themes/constants'
import { calcStandardHeightList, calcStandardWeightList } from './standard-data'

// 图标配置
const options = {
  padding: [10, 10, 10, 10],
  rotate: true, // 旋转 90deg
  legend: {
    position: 'top' // 图例放在上面
  },
  xAxis: {
    rotateLabel: true, // x轴标签文字倾斜
    labelCount: 12 // x轴显示标签个数
  },
  dataLabel: false, // 是否显示数据
  dataPointShape: false // 是否显示圆点
}

// 图表数据
const chartData = reactive({
  categories: [] as string[],
  series: [] as { name: string; data: string[]; color: string }[]
})

// 初始化
async function initChart() {
  const list = await cloudApi.getGrowingBaseInfoList({ pageSize: 9999 })
  const dateList: string[] = []
  const heightList: string[] = []
  const weightList: string[] = []
  list.reverse().forEach((item) => {
    dateList.push(item.date.slice(0, 7))
    heightList.push(item.height)
    weightList.push(item.weight)
  })
  chartData.categories.push(...dateList)
  chartData.series.push({
    name: '身高(cm)',
    data: heightList,
    color: '#ffaa30'
  })
  chartData.series.push({
    name: '标准身高(cm)',
    data: calcStandardHeightList(dateList).map(String),
    color: '#ffebc8'  
  })
  chartData.series.push({
    name: '体重(kg)',
    data: weightList,
    color: '#ff1924'
  })
  chartData.series.push({
    name: '标准体重(kg)',
    data: calcStandardWeightList(dateList).map(String),
    color: '#ffc5c6'
  })
}

// 页面加载完成
onLoad(async () => {
  await initChart()
})
</script>

<style lang="scss" scoped>
.curvePage {
  width: 100%;
  height: 100%;
}
</style>
