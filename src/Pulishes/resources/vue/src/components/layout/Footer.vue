<template>
  <div class="ivu-left">
    <Icon type="ios-arrow-back" v-if="!isCollapsed" @click="show" title="收起菜单"/>
    <Icon type="ios-arrow-forward" v-else  @click="hide" title="打开菜单"/>
  </div>
  <div class="ivu-right">
    Copyright 2019-{{ copyright }} 长沙伊佳网络科技有限公司 All rights reserved.
  </div>
</template>

<script>
import {session} from "@/reactive/session";

export default {
  name: "LayoutFooter",
  computed: {
    copyright() {
      let date = new Date;
      return date.getFullYear();
    },
    isCollapsed(){
      return session["$store/common/isCollapsed"];
    }
  },
  methods: {
    show(){
      session["$store/common/isCollapsed"] = true;
    },
    hide(){
      session["$store/common/isCollapsed"] = false;
    }
  }
}
</script>

<style scoped>

</style>