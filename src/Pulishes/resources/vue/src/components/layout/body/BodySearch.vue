<template>
  <div class="body-search">
    <Form ref="formSearch" :model="modelValue" inline :label-width="80">
      <slot></slot>
    </Form>
  </div>
</template>

<script>
export default {
  name: "BodySearch",
  props:{
    modelValue: {
      type: Object,
      default: null
    }
  },
  emits:['update:modelValue'],
}
</script>

<style scoped>
.body-search {
  padding: 5px;
}
</style>