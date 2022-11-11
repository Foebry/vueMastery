<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <ul>
      <EventCardVue
        v-for="event in event.events"
        :key="event.id"
        :event="event"
      />
      <template v-if="page !== 1">
        <router-link
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          >Previous page</router-link
        >
      </template>
      <template v-if="hasNextPage">
        <router-link
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          >Next page</router-link
        >
      </template>
      <BaseIcon />
    </ul>
  </div>
</template>

<script>
import EventCardVue from '@/components/EventCard.vue';
import store from '@/store/index';
import { mapState } from 'vuex';

const getPageEvents = async (routeTo, next) => {
  const currentPage = parseInt(routeTo.query.page) || 1;
  await store.dispatch('event/fetchEvents', { page: currentPage });
  routeTo.params.page = currentPage;
  next();
};

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCardVue,
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  async beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.event.totalEvents > this.page * this.event.perPage;
    },
    ...mapState(['event', 'user']),
  },
};
</script>

<style></style>
