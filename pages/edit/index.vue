<template>
    <GrowingEditor v-if="showEditor" :initForm="initForm" :submit="handleSubmitClick" />
    <view v-else>
        <view class="dateTips">请选择要编辑的日期</view>
        <uni-calendar :insert="true" @change="handleSelectDate" />
    </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import GrowingEditor from '@/bz-components/growing-editor'
import cloudApi from '@/helpers/cloudApi'
import event from '@/helpers/event'
import toast from '@/utils/toast'

// 显示编辑器
const showEditor = ref(false)

// 表单信息
const initForm = reactive({
    date: '',
    height: '',
    weight: '',
    description: '',
    photoList: [],
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

        showEditor.value = true
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
