<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { Event } from '@/store/modules/EventModule';
import store from '@/store';

export default {
  props: {
    id: { type: Number, required: true },
  },
  setup(props) {
    const event = ref<Event>();

    onMounted(async () => {
      event.value = await store.dispatch('event/getEventById', {
        id: props.id,
      });
    });

    return { event };
  },
};
</script>

<style></style>
