<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import random from "view-ui-plus/src/utils/random_str";

const defaultClass = "body-detail";
export default {
  name: "BodyDetailHeader",
  inject: ['bodyDetail'],
  props: {
    label: {
      type: [String, Function],
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentName: this.name,
      currentLabel: this.label,
      id: random(6)
    }
  },
  computed: {
    classes() {
      return [defaultClass];
    },
  },
  methods: {
    addPane() {
      const root = this.bodyDetail;
      if (!root.detailItems) root.detailItems = [];
      root.detailItems.push({
        id: this.id,
        pane: this
      });
    },
    removePane() {
      const root = this.bodyDetail;
      if (root.detailItems && root.detailItems.length) {
        const index = root.detailItems.findIndex(item => item.id === this.id);
        root.detailItems.splice(index, 1);
      }
    },
    updateNav () {
      this.bodyDetail.updateNav();
    }
  },
  mounted() {
    this.addPane();
    this.updateNav();
  },
  beforeUnmount() {
    this.removePane();
    this.updateNav();
  }
}
</script>

<style scoped lang="less">
.body-detail{
  overflow-y: auto;
  height: 100%;
}
</style>