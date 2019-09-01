import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Vuetify from 'vuetify';
// import Vuetify from './plugins/vuetify';

import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify)
export default new Vuetify({ })

import { setupComponents } from './config/setup-components';

setupComponents(Vue);

Vue.config.productionTip = false

new Vue({
    vuetify: new Vuetify(),
    router,
    render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>',
//   data: {
//     themeColor: '#d33c30',
//     userEmail: 'admin@yopmail.com',
//     userPassword: '123456'
//   }
// });
