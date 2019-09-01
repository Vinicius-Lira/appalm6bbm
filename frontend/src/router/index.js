import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          { name: 'Dashboard' }
        ]
      }
    }
  ]
});
