<template>
  <ul>
    <EventCardVue v-for="event in events" :key="event.id" :event="event" />
    <BaseIcon />
  </ul>
</template>

<script>
import EventCardVue from '@/components/EventCard.vue';
import EventService from '@/services/EventService';
export default {
  components: {
    EventCardVue,
  },
  async created() {
    const { data, error } = await EventService.getEvents();
    if (data) {
      this.events = data;
    } else if (error) {
      console.log(error.message);
    }
  },
  data() {
    return { events: [] };
  },
};
</script>

<style></style>
