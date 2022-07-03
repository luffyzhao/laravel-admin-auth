<template>
  <div class="layout-router">
    <div class="layout-router-scroll">
      <template v-for="(item, index) in usedRouter" :key="index">
        <Tag color="success" v-if="$route.name === item.name">{{ item.meta.name }}</Tag>
        <Tag v-else-if="item.name === 'home'" @click="go(item)">{{ item.meta.name }}</Tag>
        <Tag closable v-else @click="go(item)" @on-close="close(index)">{{ item.meta.name }}</Tag>
      </template>
    </div>
    <div class="layout-router-scroll-dropdown">
      <Dropdown transfer @on-click="remove">
        <Button type="warning" size="small">标签管理</Button>
        <template #list>
          <DropdownMenu>
            <DropdownItem name="other">关闭其他</DropdownItem>
            <DropdownItem name="all">关闭全部</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import {session} from "@/reactive/session";

export default {
  name: "RouterList",
  computed: {
    usedRouter() {
      return session["$store/common/router"];
    }
  },
  methods: {
    remove(name) {
      this.usedRouter.splice(0, this.usedRouter.length);
      switch (name) {
        case "other":
          this.$router.push({
            name: this.$route.name
          });
          break;
        case "all":
          this.$router.push({
            name: 'home'
          });
          break;
      }
    },
    go(item) {
      this.$router.push({
        name: item.name
      });
    },
    close(index) {
      this.usedRouter.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>