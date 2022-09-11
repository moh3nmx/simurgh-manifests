import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import BaseLabel from '@/components/Base/Label.vue'
import '@/assets/app.scss'
import './plugins/axios'
import Toasted from 'vue-toasted';
 
Vue.config.productionTip = false

Vue.component('BaseLabel', BaseLabel)
Vue.use(Toasted, {
  position: 'bottom-left',
  duration: 5000,
  action : {
    text : 'Close',
    onClick : (e, toastObject) => {
        toastObject.goAway(100);
    }
},
})

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});


new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
