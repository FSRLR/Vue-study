import Vue from 'vue'
import App from './App'
// #ifdef H5
// #endif
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
