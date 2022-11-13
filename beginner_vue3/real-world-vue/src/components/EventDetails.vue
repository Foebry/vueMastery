<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script lang="ts">
import EventsService from '@/services/EventsService';
export default {
  props: ['id'],
  data() {
    return { event: null };
  },
  created() {
    EventsService.getEventById(this.$props.id)
      .then((response) => (this.$data.event = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
