<template>
    <GrowingEditor :initForm="initForm" :submit="handleSubmitClick" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import GrowingEditor from '@/bz-components/growing-editor'
import cloudApi from '@/helpers/cloudApi'
import event from '@/helpers/event'
import toast from '@/utils/toast'

// 表单信息
const initForm = reactive({
    date: '',
    height: '',
    weight: '',
    description: '',
    photoList: [],
})

// 提交按钮点击处理
async function handleSubmitClick(form) {
    const data = {
        ...form,
        photoList: form.photoList.map(item => item.url),
    }
    await cloudApi.insertGrowing(data)
    event.addedGrowing.emit(data)
}
</script>

<style lang="scss" scoped></style>
