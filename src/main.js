import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from './routes';
import { auth } from './firebase.config';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next("/login");
      }
    });
  }
  else {
    next();
  }
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
