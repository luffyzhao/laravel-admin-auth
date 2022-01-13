<template>
  <Layout class="layout">
    <Header>
      <div class="layout-logo"></div>
      <Menu mode="horizontal" theme="dark" class="layout-menu" :active-name="topSelect.id"
            @on-select="topChange">
        <MenuItem v-for="(item, index) in treeData" :name="item.name" :key="item.id" v-if="item.children.length === 0">
          <Icon :type="item.icon" :size="20"/>
          {{item.title}}
        </MenuItem>
        <Submenu :name="item.name" :key="`sub${index}`" v-else>
          <template slot="title">
            <Icon type="ios-stats" />
            {{item.title}}
          </template>
          <MenuItem v-for="(val, key) in item.children" :name="val.name" :key="`MenuItem${val.id}`" v-if="val.children.length === 0">{{val.title}}</MenuItem>
          <MenuGroup :title="val.title" v-else>
            <MenuItem v-for="(value, k) in val.children" :name="value.name" :key="`MenuItem${value.id}`">{{value.title}}</MenuItem>
          </MenuGroup>
        </Submenu>
      </Menu>

      <div class="layout-header-right">
        <Badge :count="1000" overflow-count="2" dot class="badge">
          <Avatar icon="ios-person" shape="square" :size="30"/>
        </Badge>
        <span @click="exit">
                    <Avatar class="exit" icon="md-exit" shape="square" :size="30"/>
                </span>
      </div>
    </Header>
    <Layout class="ivu-layout-has-sider">

      <Layout>
        <Layout class="content-layout">
          <Layout>
            <Content class="content-body">
              <div class="router-content-body">
                <transition name="slot-transition">
                  <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                </transition>
              </div>
            </Content>
          </Layout>
          <Sider class="sider-right" :width="100">
            <div class="sider-router">
              <div class="sider-router-title">
                常用菜单
              </div>
              <template v-for="(item, index) in usedRouter">
                <div v-if="item.name === $route.name" class="sider-router-tag sider-router-tag-active"
                     @click="push(item.name)">
                  <span class="ivu-tag-text ivu-tag-color-white">{{item.meta.name}}</span>
                </div>
                <div v-else class="sider-router-tag" @click="push(item.name)">
                  <span class="ivu-tag-text ivu-tag-color-white">{{item.meta.name}}</span>
                </div>
              </template>
            </div>
          </Sider>
        </Layout>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>

    </Layout>
  </Layout>
</template>
<script>
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      topSelect: {}
    }
  },
  computed: {
    ...mapState({
      menus: state => state.common.menus,
      usedRouter: state => state.common.usedRouter
    }),
    treeData() {
      return this.setTreeData(0);
    }
  },
  methods: {
    ...mapMutations({
      logout: 'common/logout'
    }),
    topChange(name) {
      if (this.$route.name !== name) this.$router.push({name: name});
    },
    exit() {
      this.logout();
    },
    push(name){
      this.$router.push({name});
    },
    setTreeData(parent_id) {
      let cloneData = JSON.parse(JSON.stringify(this.menus))
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
          return father['id'] === child['parent_id']
        });
        if (branchArr.length > 0) {
          father['children'] = branchArr
        }else{
          father['children'] = [];
        }
        return father['parent_id'] === parent_id
      });
    }
  }
}
</script>

<style lang="less">
.badge {
  position: relative;
  /*top: 14px;*/
  height: 30px;
  line-height: 30px;
}

.menu-title {
  height: 40px;
  border-bottom: 1px solid #5b6270;
  border-top: 1px solid #5b6270;
  padding-left: 15px;
  line-height: 40px;
  color: #fff0f6;
}

.layout-logo {
  width: 120px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: -10px;
}

.ivu-layout-header {
  padding: 0 20px;
}

.layout-footer-center {
  text-align: center;
}

.layout-header-right {
  height: 64px;
  float: right;
}

.layout-menu {
  float: left;
  position: relative;
  left: 70px;
  height: 64px;
}

.layout {
  height: 100vh;
  min-width: 1280px;
}

.content-layout {
  padding: 12px 12px 0 12px;
}

.content-body {
  padding: 24px 0 24px 24px;
  background: #fff;
  border-radius: 5px;
}

.router-content-body {
  overflow: hidden;
  height: calc(100vh - 193px);
}

.sider-right {
  background: #fff;
  border-left: #e8eaec 1px solid;
}

.sider-router {
  text-align: right;

  .ivu-tag {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
}

.sider-router-title {
  border-top: 2px solid #3399ff;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.collapsed-sider {
  float: left;
  position: relative;
  left: 65px;
}

.sider-router-tag {
  border-bottom-left-radius: 10px;
  background-color: #515a6e;
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
}

.sider-router-tag-active {
  background-color: #19be6b;
}

.exit {
  margin-left: 10px;
  background-color: #515a6e;
  cursor: pointer;
}
</style>
