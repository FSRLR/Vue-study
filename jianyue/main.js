import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.apiServer = 'http://127.0.0.1:8080/api'
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
