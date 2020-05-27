<template>
    <ILayout>
        <template slot="menu"><side-menu :data="data"></side-menu></template>

        <template slot="router">
            <Tag type="dot" closable
                 v-for="(tag, index) in tagLists" :key="index" :color="existsRoute(tag, active) ? 'warning' : ''"
                 :name="index"
                 @click.native="openTag(tag)"
                 @on-close="closeTag"
            >{{tag.meta.title}}</Tag>
        </template>

        <template slot="header">
            <div class="avatar" >
                <span @click="logout" >
                    <Avatar icon="md-exit" size="small" class="avatar-hand"></Avatar>
                </span>
            </div>
        </template>
    </ILayout>
</template>

<script>
    import SideMenu from '../components/layout/components/side-menu/side-menu.vue'
    import { mapGetters } from 'vuex'
    import {existsRoute} from "../../libs/util";
    import ILayout from "../components/layout/layout";
    export default {
        name: "Index",
        components: {ILayout, SideMenu},
        computed: {
            ...mapGetters({
                tagLists: 'layout/inactives',
                active: 'layout/active',
                data: 'auth/menus'
            })
        },
        methods: {
            openTag(tag){
                this.$router.push(tag)
            },
            closeTag($event, index){
                this.$store.dispatch('layout/remove', this.tagLists[index]);
            },
            existsRoute(x, y){
                return existsRoute(x, y);
            },
            logout(){
                this.$store.dispatch('auth/afterLogout');
            }
        }
    }
</script>

<style scoped lang="less">
.avatar{
    text-align: right;
}
.avatar .avatar-hand{
    cursor: pointer;
    background-color: #5cadff
}
</style>