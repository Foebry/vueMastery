<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EventCard from '@/components/EventCard.vue'; // @ is an alias to /src
import EventsService from '@/services/EventsService';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      events: null,
    };
  },
  created() {
    EventsService.getEvents()
      .then((response) => (this.$data.events = response.data))
      .catch((error) => console.log(error));
  },
  components: {
    EventCard,
  },
});
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
