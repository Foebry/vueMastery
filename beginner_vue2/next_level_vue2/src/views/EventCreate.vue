<template>
  <div>
    <h1>Create event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        placeholder="Title"
        class="field"
      />
      <BaseInput
        label="Description"
        v-model="event.description"
        placeholder="Add a description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        placeholder="Add a location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
      />
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import nprogress from 'nprogress';
import BaseInput from '@/components/BaseInput';
import BaseSelect from '@/components/BaseSelect';
import BaseButton from '@/components/BaseButton';

export default {
  computed: {
    ...mapGetters(['getEventById']),
    catLength() {
      return this.$store.getters.catLength;
    },
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00');
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    };
  },
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton,
  },
  methods: {
    async createEvent() {
      nprogress.start();
      try {
        const { success } = await this.$store.dispatch(
          'event/createEvent',
          this.event
        );
        if (success) {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          });
          this.event = this.createFreshEventObject();
        }
      } catch (e) {
        nprogress.done();
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      return {
        user,
        id: Math.random().toString(16).substring(2),
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
