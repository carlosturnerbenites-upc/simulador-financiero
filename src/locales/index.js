import Vue from 'vue'
import VueI18n from 'vue-i18n'

import es from './i18n/es_CO'

Vue.use(VueI18n)

const messages = {
  es
}

const i18n = new VueI18n({
  messages,
  locale: 'es'
})

export default i18n
