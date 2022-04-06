import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        // 是否已验证密码
        isVerifiedPassword: false,
    },
    mutations: {
        setVerifiedPassword(state, value) {
            state.isVerifiedPassword = value
        },
    },
})

export default store
