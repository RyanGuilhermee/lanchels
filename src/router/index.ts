import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MenuView from '../views/MenuView.vue';
import OrderView from '../views/OrderView.vue';

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
      component: MenuView
    },
    {
      path: '/new-order',
      name: 'order',
      component: OrderView
    }
  ]
});

export default router;
