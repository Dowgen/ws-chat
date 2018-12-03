import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
