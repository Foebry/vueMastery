import Vue from 'vue';
import VueRouter from 'vue-router';
import EventCreate from '@/views/EventCreate';
import EventList from '@/views/EventList';
import EventShow from '@/views/EventShow';
import NProgress from 'nprogress';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    async beforeEnter(routeTo, routeFrom, next) {
      const event = await store.dispatch('event/fetchEvent', routeTo.params.id);
      routeTo.params.event = event;
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
