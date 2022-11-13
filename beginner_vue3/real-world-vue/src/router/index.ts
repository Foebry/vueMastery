import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EventList from '@/views/EventList.vue';
import AboutView from '@/views/AboutView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
