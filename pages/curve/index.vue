<template>
  <view class="page fullPage curvePage">
    <qiun-data-charts type="area" :loadingType="4" :opts="options" :chartData="chartData" />
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import cloudApi from '@/helpers/cloudApi'
import themeConstants from '@/themes/constants'

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
  dataPointShape: false, // 是否显示圆点
  extra: {
    area: {
      gradient: true // 开启渐变色
    }
  }
}

// 图表数据
const chartData = reactive({
  categories: [] as string[],
  series: [] as { name: string; data: string[] }[]
})

// 初始化
async function init() {
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
    data: heightList
  })
  chartData.series.push({
    name: '体重(kg)',
    data: weightList
  })
}

// 页面加载完成
onLoad(async () => {
  await init()
})
</script>

<style lang="scss" scoped>
.curvePage {
  width: 100%;
  height: 100%;
}
</style>
