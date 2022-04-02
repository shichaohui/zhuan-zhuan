<script>
export default {
    onLaunch: function() {
        console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
}
</script>

<style lang="scss">


page,
uni-page-body {
    height: 100%;
}

.page {
    font-size: $font-size-base;
    padding: $page-spacing;
    box-sizing: border-box;
}

// 高度全屏
.fullPage {
    height: 100%;
    /* #ifdef APP-PLUS */
    height: 100vh;
    /* #endif */
}

// 最小高度全屏
.minFullPage {
    min-height: 100%;
    /* #ifdef APP-PLUS */
    min-height: 100vh;
    /* #endif */
}
</style>
