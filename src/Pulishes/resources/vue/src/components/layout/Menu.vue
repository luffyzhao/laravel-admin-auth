<template>
  <div style="flex: 1; overflow-y: auto;">
    <Menu :active-name="active.name" theme="dark" width="auto" @on-select="routerPush">
      <template v-for="(menu, index) in data" :key="index">
        <Submenu v-if="menu.children && menu.children.length > 0" :name="menu.name" :type="menu.icon">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <template v-for="(item, key) in menu.children">
            <Submenu v-if="item.children  && item.children.length > 0"
                     :key="`${index}-${key}`" :name="item.name">
              <template #title>
                <Icon :type="item.icon"/>
                <span>{{ item.title }}</span>
              </template>
              <MenuItem v-for="(val, i) in item.children" :name="val.name" :key="`${index}-${key}-${i}`">
                <div class="ivu-menu-submenu-title">
                  <Icon :type="val.icon"/>
                  <span>{{ val.title }}</span>
                </div>
              </MenuItem>
            </Submenu>
            <MenuItem v-else :name="item.name" :key="`${index}-${key}`">
              <div class="ivu-menu-submenu-title">
                <Icon :type="item.icon"/>
                <span>{{ item.title }}</span>
              </div>
            </MenuItem>
          </template>
        </Submenu>
        <MenuItem v-else :name="menu.name">
          <div class="ivu-menu-submenu-title">
            <Icon :type="menu.icon"/>
            <span>{{ menu.title }}</span>
          </div>
        </MenuItem>
      </template>
    </Menu>
  </div>
</template>

<script>
import {session} from "@/reactive/session";

export default {
  name: 'LayoutMenu',
  components: {},
  data() {
    return {
      data: this.$unit.treeData(session["$store/auth/menu"], 0),
    }
  },
  computed: {
    active() {
      return this.$route;
    }
  },
  methods: {
    routerPush(name) {
      this.$router.push({
        name
      });
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-menu-submenu,
.ivu-menu-item {
  white-space: nowrap;
}

</style>

<style lang="less">
.collapsed-item {
  text-align: center;
  line-height: 49px;
  cursor: pointer;
  display: block;
  overflow: visible;

  .ivu-icon {
    color: #fff;
  }

  .ivu-tooltip-rel {
    display: block;
  }
}

.ivu-menu-dark {
  background-color: transparent;
  padding: 10px;

  > li {
    margin-bottom: 10px;

    > .ivu-menu-submenu-title {
      background-color: #0d82f6 !important;
      padding: 0 9px !important;
      border-radius: 3px;
    }

    > .ivu-menu {
      width: 182px;
      margin: 0 auto;
      background-color: transparent;
      border-top: 3px solid rgb(22, 66, 101);

      .ivu-menu-submenu-title, .ivu-menu-item-group-title {
        padding: 0 10px !important;
        min-width: 180px !important;
        background-color: hsla(0, 0%, 100%, .1) !important;
        box-sizing: border-box;
      }

      .ivu-menu {
        .ivu-menu-submenu-title, .ivu-menu-item-group-title {
          padding: 0 20px !important;
          min-width: 180px !important;
          background-color: hsla(0, 0%, 100%, .1) !important;
          box-sizing: border-box;
        }
      }
    }
  }
}

.ivu-menu-submenu-title, .ivu-menu-item-group-title {
  height: 36px !important;
  line-height: 36px !important;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background-color: transparent;
}

.ivu-menu-vertical .ivu-menu-submenu-title-icon {
  right: 10px;
  font-size: 16px;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: rgb(247, 213, 115) !important;
}

.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 0px !important;
}

</style>

