<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" :type="type" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
  inheritAttrs: false,
};
</script>

<style></style>
