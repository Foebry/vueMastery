<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      v-bind="$attrs"
      @change="updateValue"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin';

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style></style>
