import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MenuView from '../views/MenuView.vue';
import OrderView from '../views/OrderView.vue';
import PaidOrdersListView from '@/views/PaidOrdersListView.vue';
import UnpaidOrdersListView from '@/views/UnpaidOrdersListView.vue';
import MenusListView from '@/views/MenusListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menu/:id?',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/order/:id?',
      name: 'order',
      component: OrderView
    },
    {
      path: '/menus-list',
      name: 'menusList',
      component: MenusListView
    },
    {
      path: '/paid-orders',
      name: 'paidOrders',
      component: PaidOrdersListView
    },
    {
      path: '/unpaid-orders',
      name: 'unpaidOrders',
      component: UnpaidOrdersListView
    }
  ]
});

export default router;
