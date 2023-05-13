import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewMenuView from '../views/NewMenuView.vue';
import NewOrderView from '../views/NewOrderView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new-menu',
      name: 'menu',
      component: NewMenuView
    },
    {
      path: '/new-order',
      name: 'order',
      component: NewOrderView
    }
  ]
});

export default router;
