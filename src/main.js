import Vue from 'vue'
import i18n from '@/locales'
import iView from 'iview';

import 'iview/dist/styles/iview.css';

import App from './App.vue'

Vue.use(iView);

new Vue({
  i18n,
  el: '#app',
  render: h => h(App)
})
