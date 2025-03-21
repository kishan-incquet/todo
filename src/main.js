import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'
import router from './routes';
import vuetify from './plugins/vuetify'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  router: router,
  pinia,
  vuetify,
  render: h => h(App)
}).$mount('#app')
