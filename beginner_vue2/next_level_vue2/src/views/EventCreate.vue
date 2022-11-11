<template>
  <div>
    <h1>Create event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        placeholder="Title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <BaseInput
        label="Description"
        v-model="event.description"
        placeholder="Add a description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      /><template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        placeholder="Add a location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
      /><template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p>
      </template>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>
      <BaseButton
        :disabled="$v.anyError"
        type="submit"
        buttonClass="-fill-gradient"
        >Submit</BaseButton
      >
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
import { required } from 'vuelidate/lib/validators';

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    async createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
