<template>
    <uni-fab
        ref="fabRef"
        horizontal="right"
        direction="vertical"
        :pattern="fabPattern"
        :content="fabContent"
        @trigger="handleFabTrigger"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import themeConstants from '@/themes/constants'

/**
 * 菜单组件引用
 */

const fabRef = ref()

/**
 * 菜单样式
 */
const fabPattern = {
    buttonColor: themeConstants.colorPrimary,
    selectedColor: themeConstants.colorPrimary,
}

/**
 * 菜单项
 */
const fabContent = [
    {
        text: '上传',
        iconPath: '/static/icons/upload_normal.png',
        selectedIconPath: '/static/icons/upload_selected.png',
        page: '/pages/upload/index',
    },
    {
        text: '编辑',
        iconPath: '/static/icons/edit_normal.png',
        selectedIconPath: '/static/icons/edit_selected.png',
        page: '/pages/edit/index',
    },
    {
        text: '曲线',
        iconPath: '/static/icons/chart_normal.png',
        selectedIconPath: '/static/icons/chart_selected.png',
        page: '/pages/curve/index',
    },
]

/**
 * 触发菜单项
 */
const handleFabTrigger = ({ index }) => {
    uni.navigateTo({ url: fabContent[index].page })
    fabRef.value.close()
}
</script>

<style lang="scss" scoped></style>
