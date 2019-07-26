<template>
  <svg :width="width" :height="height">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      default: 'sad',
    },
    width: {
      default: 50,
    },
    height: {
      default: 50,
    },
  },
  computed: {
    iconName() {
      return `#${this.$props.type}`;
    },
  },
};
</script>

<style scoped>
svg {
  fill: currentColor;
  overflow: hidden;
}
</style>
