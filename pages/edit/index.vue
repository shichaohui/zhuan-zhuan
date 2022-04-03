<template>
    <view v-if="show.calendar">
        <view class="dateTips">请选择要编辑的日期</view>
        <uni-calendar :insert="true" @change="handleSelectDate" />
    </view>
    <GrowingEditor v-if="show.editor" :initForm="initForm" :submit="handleSubmitClick" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import GrowingEditor from '@/bz-components/growing-editor'
import cloudApi from '@/helpers/cloudApi'
import event from '@/helpers/event'
import toast from '@/utils/toast'

// 组件可见性
const show = reactive({
    calendar: false,
    editor: false,
})

// 表单信息
const initForm = reactive({
    date: '',
    height: '',
    weight: '',
    description: '',
    photoList: [],
})

// 页面加载成功
onLoad(options => {
    const { date } = options
    if (!!date) {
        handleSelectDate({ fulldate: date })
    } else {
        show.calendar = true
    }
})

// 选择日期
async function handleSelectDate(date) {
    try {
        toast.showLoading('请求中...')
        const res = await cloudApi.getGrowing(date.fulldate)
        initForm.date = res.date
        initForm.height = res.height
        initForm.weight = res.weight
        initForm.description = res.description
        initForm.photoList = res.photoList.map(item => ({
            url: item,
            fileID: item,
        }))
        show.editor = true
        show.calendar = false
    } catch (err) {
        console.log(err)
        toast.showError(err.message)
    } finally {
        toast.hideLoading()
    }
}

// 提交按钮点击处理
async function handleSubmitClick(form) {
    const data = {
        ...form,
        photoList: form.photoList.map(item => item.url),
    }
    await cloudApi.updateGrowing(data)
    event.updatedGrowing.emit(data)
}
</script>

<style lang="scss" scoped>
.dateTips {
    padding: $page-spacing;
    text-align: center;
    border-bottom: 1upx solid $uni-border-4;
}
</style>
