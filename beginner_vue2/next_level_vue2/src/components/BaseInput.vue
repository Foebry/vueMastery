<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      :type="type"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin';
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style></style>
