import Vue from 'vue'
import App from './App'
import { mixins } from '@/mixins'
import Tips from './utils/Tips'
import Http from '@/service/http'
import store from './store'


Vue.mixin(mixins);
Vue.use(Http);

Vue.prototype.$tips = Tips;
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
