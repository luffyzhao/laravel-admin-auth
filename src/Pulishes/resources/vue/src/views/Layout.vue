<template>
    <Layout class="layout">
        <Header class="layout-header">
            <div class="layout-logo"></div>
            <div class="layout-content"></div>
            <div class="layout-avater">
                <Avatar icon="ios-person" shape="square" @click="routerPush('profile')"/>
                <Avatar icon="md-exit" shape="square" @click="exit"/>
            </div>
        </Header>

        <Layout>
            <Sider v-if="!isCollapsed">
                <LayoutMenu></LayoutMenu>
            </Sider>
            <Layout>
                <RouterList></RouterList>
                <Content>
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
        <Footer class="layout-footer">
            <LayoutFooter></LayoutFooter>
        </Footer>
    </Layout>
</template>

<script>
import RouterList from "@/components/layout/RouterList";
import LayoutMenu from "@/components/layout/Menu";
import LayoutFooter from "@/components/layout/Footer";
import {session} from "@/reactive/session";

export default {
    name: "LayoutMain",
    components: {LayoutFooter, LayoutMenu, RouterList},
    computed: {
        isCollapsed() {
            return session["$store/common/isCollapsed"];
        }
    },
    methods: {
        routerPush(name) {
            this.$router.push({name})
        },
        exit(){
            session["$store/auth/token"] = null;
            session["$store/auth/menu"] = [];
            this.$Message.loading({
                content: "跳转中...",
                duration: 5
            });
            this.$router.push({
                name: "login"
            });
        }
    }
}
</script>

<style scoped lang="less">
.layout {
    height: 100%;
}
</style>
