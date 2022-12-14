import Vue from 'vue';
import VueRouter from 'vue-router';
import EventCreate from '@/views/EventCreate';
import EventList from '@/views/EventList';
import EventShow from '@/views/EventShow';
import NProgress from 'nprogress';
import store from '@/store/index';
import NotFound from '@/views/NotFound';
import NetworkIssue from '@/views/NetworkIssue';
import ExamplePage from '@/views/ExamplePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
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
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event;
          next();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } });
          } else next({ name: 'network-issue' });
        });
    },
  },
  {
    path: '/example',
    name: '/example',
    component: ExamplePage,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
    props: true,
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
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
