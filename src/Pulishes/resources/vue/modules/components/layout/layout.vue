<template>
    <Layout>
        <Sider ref="sider" hide-trigger collapsible :collapsed-width="78" :width="220" v-model="isCollapsed">
            <div class="logo">
                <slot name="logo"></slot>
            </div>
            <template>
                <slot name="menu"></slot>
            </template>
        </Sider>
        <Layout>
            <Header>
                <div class="header-menu">
                    <Icon @click.native="collapsedSider" v-if="isCollapsed"  class="menu-icon rotate-icon" type="md-menu" size="24"></Icon>
                    <Icon @click.native="collapsedSider" v-else class="menu-icon" type="md-menu" size="24"></Icon>
                </div>
                <div class="header-sider">
                    <slot name="header"></slot>
                </div>
            </Header>
            <div class="layout-router">
                <div class="layout-router-scroll">
                    <slot name="router"></slot>
                </div>
                <div class="layout-router-scroll-dropdown">
                    <Dropdown transfer @on-click="remove">
                        <Button type="warning" size="small">标签管理</Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="other">关闭其他</DropdownItem>
                            <DropdownItem name="all">关闭全部</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <Content v-if="$route.meta.cache">
                <keep-alive>
                    <router-view ></router-view>
                </keep-alive>
            </Content>
            <Content v-else>
                <router-view></router-view>
            </Content>
            <Footer></Footer>
        </Layout>
    </Layout>
</template>

<script>


    export default {
        name: "i-layout",
        data(){
            return {
                isCollapsed: false
            }
        },
        methods: {
            collapsedSider () {
                this.$refs['sider'].toggleCollapse();
            },
            remove(name){
                if(name === 'all'){
                    this.$store.dispatch('layout/removeAll');
                }else{
                    this.$store.dispatch('layout/removeOther');
                }
            }
        }
    }
</script>

<style scoped lang="less">
.ivu-layout{
    height: 100%;

    .ivu-layout-header{
        background: #1c3159;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        padding: 0 20px;
        display: flex;
        .header-menu{
            color: #fff;
            .menu-icon{
                cursor: pointer;
                transition: all .3s;
            }

            .rotate-icon{
                transform: rotate(-90deg);
            }
        }

        .header-sider{
            flex: 1;
        }


    }

    .ivu-layout-content{
        position: relative;

        .content-wrapper{
            position: absolute;
            top: 0;
            bottom:0;
            left: 0;
            right: 0;
        }
    }

    .ivu-layout-sider{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAPoCAIAAACQ1AMJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjUxNmRiNC05ZWQxLTQ0NGQtYWYxNi05NmVlMTI2NGI1N2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUEyMjg3Nzk3REExMTFFOEJEMEFFNkZDMTZFMzNGNzgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUEyMjg3Nzg3REExMTFFOEJEMEFFNkZDMTZFMzNGNzgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmY1NTM4ZGY2LTMyMDMtYWI0Ny1iZjM0LWUxNzI4YWIwM2RiNiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjE3MjczNWExLTgyNmUtNDI0Yi1hYTUzLTQ0N2M3MjVhZjE3OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgbkTr4AAADuSURBVHjaxJdLDsMgDETzsuwJeo7e/27uqmrSBpgxRlkgRYlhPoZg74/na9+27Tv4PHN+3xyNOIzYqxgSmCdsCngjcw1bKx2NI25oumQt+DkD3VtmOLj4mPuBS55h5Yw8P4UbWT9ULGfPoOVogk80crKMyxIM0/uu7wIHGvMO30PWmPVQ0Zf0mKq153IX5Xmb8JUVe3K9rrhTV3e/iP9bblr7oC3uOGfK+iUcnHuq9l6ItNYVek2c8lphVb3QuPeVvEv1pFlLWnWdiF2CP+oF3BrY62n8voufsyTOxewNbX+L+8th/5Ptkf/i3gIMAJ2EEzXU+Q1VAAAAAElFTkSuQmCC);
        .logo{
            height: 64px;
            line-height: 64px;
            background: #1c3159;
            text-align: center;
            overflow: hidden;
            img{
                height: 64px;
            }
        }
        
    }

    .layout-router {
        height: 48px;
        line-height: 46px;
        overflow: hidden;
        background: #fefefe;
        border-top: 1px solid #e8eaec;
        border-bottom: 2px solid #464c5b;
        padding-left: 10px;
        position: relative;
        box-sizing: border-box;
        padding-right: 120px;
        width: 100%;

        .layout-router-scroll-dropdown{
            position: absolute;
            right: 0;
            top: 0;
            box-sizing: border-box;
            text-align: center;
            width: 110px;
            height: 100%;
            background: #fff;
            box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
            z-index: 10;
        }
        
        .layout-router-scroll{
            overflow: visible;
            white-space: nowrap;
            transition: left 0.3s ease;
        }
    }

    .ivu-layout-footer{
        padding: 20px;
    }
}
</style>