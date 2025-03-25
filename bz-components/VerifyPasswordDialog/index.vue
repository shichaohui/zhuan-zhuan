<template>
  <uni-popup ref="popupRef" type="dialog" :mask-click="false">
    <uni-popup-dialog
      mode="input"
      title="验证密码"
      value=""
      placeholder="请输入密码"
      :beforeClose="true"
      @close="handleClose"
      @confirm="handleConfirm"
    />
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import verifiedPassword from '@/helpers/verifiedPassword'
import cloudApi from '@/helpers/cloudApi'
import toast from '@/utils/toast'
import sleep from '@/utils/sleep'
import crypto from '@/utils/crypto'

// 是否已验证密码
const isVerifiedPassword = verifiedPassword.useVerifiedPassword()

// 弹窗引用
const popupRef = ref()

// 监听弹窗引用变化，弹窗加载成功后，若未验证密码，则显示弹窗
watch(popupRef, () => {
  !isVerifiedPassword.value && popupRef.value && popupRef.value.open()
})

// 监听密码验证状态，若已验证密码，则关闭弹窗
watch(isVerifiedPassword, () => {
  isVerifiedPassword.value && popupRef.value && popupRef.value.close()
})

// 关闭弹窗，返回上一页
async function handleClose() {
  popupRef.value.close()
  await sleep(300)
  uni.navigateBack({})
}

// 确认验证密码
async function handleConfirm(password: string) {
  if (!password) {
    toast.show('请输入密码！')
    return
  }
  try {
    const encodePassword = crypto.SHA256(crypto.MD5(password).toString()).toString()
    await cloudApi.verifyPassword(encodePassword)
    verifiedPassword.verified(true)
  } catch (err) {
    console.error(err)
    toast.showError(err.message)
  }
}
</script>

<style lang="scss" scoped></style>
