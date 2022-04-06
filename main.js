// #ifndef VUE3
import Vue from 'vue'
import store from '@/store'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
    store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'
import store from '@/store'
import App from './App.vue'
export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
    return {
        app,
    }
}
// #endif
