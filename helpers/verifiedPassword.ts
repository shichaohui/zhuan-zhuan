import { computed } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'

const KEY = 'isVerifiedPassword'

/**
 * 验证密码
 */
const verifiedPassword = {
    /** 初始化验证状态 */
    async init() {
        const value = uni.getStorageSync(KEY) || false
        store.commit('setVerifiedPassword', value)
    },
    /** 修改验证状态 */
    async verified(value: boolean) {
        store.commit('setVerifiedPassword', value)
        uni.setStorageSync(KEY, value)
    },
    /** 查询并监听验证状态 */
    useVerifiedPassword() {
        const store = useStore()
        const isVerifiedPassword = computed(() => store.state.isVerifiedPassword)
        return isVerifiedPassword
    },
}

export default verifiedPassword
