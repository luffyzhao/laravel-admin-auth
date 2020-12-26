<template>
    <Layout class="layout">
        <Header>
            <div class="layout-logo"></div>
            <Menu mode="horizontal" theme="dark" :active-name="topActiveName.name" class="layout-menu"
                  @on-select="topSelect">
                <MenuItem v-for="(item, index) in allMenus" :name="item.name" :key="index">
                    <Icon :type="item.icon" :size="20"/>
                    {{item.title}}
                </MenuItem>
            </Menu>

            <div class="layout-header-right">
                <Badge :count="1000" overflow-count="2" class="badge">
                    <Avatar icon="ios-person" shape="square" :size="30" />
                </Badge>
            </div>
        </Header>
        <Layout>
            <transition name="left">
                <Sider ref="side" v-show="leftMenus.length > 0" :width="150">
                    <div class="menu-title">
                        <Icon :type="topSelectMenu.icon" :size="20" style="margin-right: 10px;"/>
                        {{topSelectMenu.title}}
                    </div>
                    <Menu :active-name="$route.name" theme="dark" width="150" @on-select="push">
                        <template v-for="(item, index) in leftMenus">
                            <Submenu v-if="item.children && item.children.length > 0" :name="item.name" >
                                <template slot="title">
                                    <Icon :type="item.icon" :size="18"/>
                                    {{item.title}}
                                </template>
                                <MenuItem v-for="(value, key) in item.children"
                                          :key="`${key}-${index}`"
                                          :to="{name: value.name}"
                                          :name="value.name">
                                    <span>{{value.title}}</span>
                                </MenuItem>
                            </Submenu>
                            <MenuItem v-else :name="item.name" class="ivu-menu-item-left">
                                <Icon :type="item.icon" :size="18"/>
                                <span>{{item.title}}</span>
                            </MenuItem>
                        </template>
                    </Menu>
                </Sider>
            </transition>
            <Layout>
                <Layout class="content-layout">
                    <Layout>
                        <Content class="content-body">
                            <div class="router-content-body">
                                <transition name="slot-transition">
                                    <router-view></router-view>
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
                                <div v-if="index === 0" class="sider-router-tag sider-router-tag-active"
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
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                leftMenus: [],
                topSelectMenu: {}
            }
        },
        computed: {
            ...mapState({
                menus: state => state.common.menus,
                usedRouter: state => state.common.usedRouter
            }),
            allMenus() {
                return this.menus.filter(val => val.parent_id === 0);
            },
            topActiveName() {
                let name = this.$route.name;
                return this.getPater(name);
            }
        },
        mounted() {
            this.setLeftMenus(this.getPeer(this.$route.name));
            this.topSelectMenu = this.topActiveName;
        },
        methods: {
            topSelect(name) {
                let topSelectMenu = this.getForName(name);
                let leftMenus = this.setTreeData(topSelectMenu.id);
                this.setLeftMenus(leftMenus);
                this.topSelectMenu = topSelectMenu;
                if (leftMenus.length === 0) {
                    this.push(topSelectMenu.name);
                }
            },
            push(name) {
                if (this.$route.name !== name) this.$router.push({name: name});
            },
            getForName(name) {
                return this.menus.find(val => val.name === name);
            },
            getPater(name) {
                let topSelectMenu = this.getForName(name);
                if (topSelectMenu.parent_id !== 0) {
                    let _topSelectMenu = this.menus.find((val) => val.id === topSelectMenu.parent_id);
                    return this.getPater(_topSelectMenu.name);
                } else {
                    return topSelectMenu;
                }
            },
            getPeer(name) {
                let topSelectMenu = this.getForName(name);
                return topSelectMenu.parent_id !== 0 ? this.setTreeData(topSelectMenu.parent_id) : [];
            },
            setTreeData(parent_id) {
                let cloneData = JSON.parse(JSON.stringify(this.menus))
                return cloneData.filter(father => {
                    let branchArr = cloneData.filter(child => {
                        return father['id'] === child['parent_id']
                    });
                    if (branchArr.length > 0) {
                        father['children'] = branchArr
                    }
                    return father['parent_id'] === parent_id
                });
            },
            setLeftMenus(arr) {
                this.leftMenus = arr;
            }
        },
        watch: {
            "$route"(val) {
                this.setLeftMenus(this.getPeer(val.name));
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

    .menu-title{
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
        left: -40px;
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
</style>
