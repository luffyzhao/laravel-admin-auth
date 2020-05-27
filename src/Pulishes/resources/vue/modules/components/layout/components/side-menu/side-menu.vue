<template>
    <div>
        <Menu :active-name="active.name" theme="dark" width="auto" v-if="!isCollapsed" @on-select="routerPush">
            <template v-for="(menu, index) in data">
                <Submenu v-if="menu.children && menu.children.length > 0" :name="menu.link" :key="index">
                    <template slot="title">
                        <Icon :type="menu.icon"/>
                        <span>{{menu.name}}</span>
                    </template>
                    <template v-for="(item, key) in menu.children">
                        <Submenu v-if="item.children  && item.children.length > 0"
                                 :key="`${index}-${key}`" :name="item.link">
                            <template slot="title">
                                <Icon :type="item.icon"/>
                                <span>{{item.name}}</span>
                            </template>
                            <MenuItem v-for="(val, i) in item.children" :name="val.link" :key="`${index}-${key}-${i}`">
                                <div class="ivu-menu-submenu-title">
                                    <Icon :type="val.icon"/>
                                    <span>{{val.name}}</span>
                                </div>
                            </MenuItem>
                        </Submenu>
                        <MenuItem v-else :name="item.link" :key="`${index}-${key}`">
                            <div class="ivu-menu-submenu-title">
                                <Icon :type="item.icon"/>
                                <span>{{item.name}}</span>
                            </div>
                        </MenuItem>
                    </template>
                </Submenu>
                <MenuItem v-else :name="menu.link" :key="index">
                    <div class="ivu-menu-submenu-title">
                        <Icon :type="menu.icon"/>
                        <span>{{menu.name}}</span>
                    </div>
                </MenuItem>
            </template>
        </Menu>
        <template v-else>
            <template v-for="(menu, index) in data">

                <DropdownMenuSide v-if="menu.children && menu.children.length > 0" :key="index" :menu=menu
                                  @on-select="routerPush"></DropdownMenuSide>
                <Tooltip v-else :key="index" :content="menu.name" class="collapsed-item" placement="right">
                    <div @click="routerPush(menu.link)">
                        <Icon :type="menu.icon" size="20"/>
                    </div>
                </Tooltip>

            </template>
        </template>
    </div>
</template>

<script>
    import DropdownMenuSide from "./dropdown-menu-side";
    import {mapGetters} from 'vuex'


    export default {
        name: 'SideMenu',
        components: {DropdownMenuSide},
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            isCollapsed() {
                return this.$parent.value;
            },
            ...mapGetters({
                active: 'layout/active'
            })
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
                border-top: 3px solid rgb(22,66,101);

                .ivu-menu-submenu-title, .ivu-menu-item-group-title {
                    padding: 0 10px !important;
                    min-width: 180px !important;
                    background-color: hsla(0, 0%, 100%, .1) !important;
                    box-sizing: border-box;
                }

                .ivu-menu{
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

    .ivu-menu-vertical .ivu-menu-submenu-title-icon{
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

