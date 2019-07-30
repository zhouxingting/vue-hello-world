<template>
  <svg :width="width" :height="height" :class="svgClass">
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
    className: {
      type: String,
      default: '',
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
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
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
