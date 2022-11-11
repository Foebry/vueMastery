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
      <template v-if="page * 3 < totalEvents">
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
import { mapState } from 'vuex';
export default {
  components: {
    EventCardVue,
  },
  created() {
    this.$store.dispatch('event/fetchEvents', { perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(['event', 'user', 'totalEvents']),
  },
};
</script>

<style></style>
