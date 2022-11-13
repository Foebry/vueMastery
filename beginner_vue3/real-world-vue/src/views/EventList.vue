<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import EventCard from '@/components/EventCard.vue'; // @ is an alias to /src
import store from '@/store';
import { Event } from '@/store/modules/EventModule';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const events = ref<Event[]>([]);

    onMounted(async () => {
      events.value = await store.dispatch('event/getEvents', {});
    });

    return { events };
  },
  components: { EventCard },
});
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
