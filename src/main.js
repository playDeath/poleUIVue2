import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Message  from './components/Message/message.js'
import "./directives"
Vue.config.productionTip = false
Vue.prototype.$Message = Message
Vue.use(ViewUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
