export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
