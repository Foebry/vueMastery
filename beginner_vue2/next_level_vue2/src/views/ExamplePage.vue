<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="email"
        placeholder="What's your email"
        v-model="email"
        :class="{ error: $v.email.$error }"
        @blur="$v.email.$touch()"
      />
      <button :disabled="$v.$invalid" type="submit">Submit</button>
    </div>
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log('Form submitted:', this.email);
      }
    },
  },
};
</script>

<style></style>
