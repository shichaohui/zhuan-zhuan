<script lang="ts" setup>
import { onLaunch } from '@dcloudio/uni-app'
import verifiedPassword from '@/helpers/verifiedPassword'

onLaunch(() => {
  init()
})

function init() {
  verifiedPassword.init()
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
