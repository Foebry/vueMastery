<template>
  <ul>
    <EventCardVue v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Previous page</router-link
      >
    </template>
    <template v-if="page < lastPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next page</router-link
      >
    </template>
    <BaseIcon />
  </ul>
</template>

<script>
import EventCardVue from '@/components/EventCard.vue';
import { mapState } from 'vuex';
export default {
  components: {
    EventCardVue,
  },
  created() {
    this.$store.dispatch('fetchEvents', { perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    lastPage() {
      return Math.ceil(this.$store.getters.getTotalEvents / 3);
    },
    ...mapState(['events']),
  },
};
</script>

<style></style>
