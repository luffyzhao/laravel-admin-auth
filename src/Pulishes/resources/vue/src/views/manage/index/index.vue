<template>
  <BodyContent v-model="component">

  </BodyContent>
</template>

<script>
import BodyContent from "@/components/layout/BodyContent";
import CommonMixin from "@/mixins/common";
export default {
  name: "index",
  mixins: [CommonMixin],
  components: {BodyContent},
}
</script>

<style scoped>

</style>
