<template>
  <div>
    <h1>Create event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>{{ getEventById(2) }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getEventById']),
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapState(['user', 'categories']),
  },
};
</script>

<style></style>
