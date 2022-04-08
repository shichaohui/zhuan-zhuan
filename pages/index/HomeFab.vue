<template>
    <uni-fab
        ref="fabRef"
        horizontal="right"
        direction="vertical"
        :pattern="fabPattern"
        :content="fabContent"
        @trigger="handleFabTrigger"
        @fabClick="handleFabClick"
    />
    <view v-if="fabExpanded" class="mask" @click="handleClickMask" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import themeConstants from '@/themes/constants'

// 菜单组件引用
const fabRef = ref()

// 菜单是否已展开
const fabExpanded = ref(false)

// 菜单样式
const fabPattern = {
    buttonColor: themeConstants.colorPrimary,
    selectedColor: themeConstants.colorPrimary,
}

// 菜单项
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

// 触发菜单项
const handleFabTrigger = ({ index }) => {
    uni.navigateTo({ url: fabContent[index].page })
    fabRef.value.close()
}

// 点击菜单按钮
const handleFabClick = () => {
    fabExpanded.value = !fabExpanded.value
}

// 点击菜单遮罩
const handleClickMask = event => {
    if (!fabExpanded.value) {
        return
    }
    // 阻止事件传递并关闭菜单
    event.stopPropagation()
    fabRef.value.close()
    fabExpanded.value = false
}
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
}
</style>
