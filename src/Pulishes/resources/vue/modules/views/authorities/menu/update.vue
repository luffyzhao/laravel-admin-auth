<template>
    <i-form :width="720" :spin-show="loading">
        <Form ref="formUpdate" :model="data" :label-width="100" :rules="ruleValidate">
            <FormItem label="上级菜单">
                <Input v-model="data.parent.name" disabled></Input>
            </FormItem>
            <FormItem label="菜单名称" prop="name">
                <Input v-model="data.name"></Input>
            </FormItem>
            <FormItem label="菜单url" prop="url">
                <Input v-model="data.url"></Input>
            </FormItem>
            <FormItem label="菜单描述" prop="description">
                <Input v-model="data.description" type="textarea"></Input>
            </FormItem>
            <FormItem label="排序" prop="sort">
                <Input v-model="data.sort" number></Input>
            </FormItem>
            <FormItem label="分配权限">
                <Transfer
                        :titles="['可分配权限', '已有权限']"
                        :list-style="{width: '200px',height: '500px'}"
                        :data="authorities.data"
                        :target-keys="data.authorities"
                        @on-change="handleChange"></Transfer>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" icon="ios-add" @click="submit('formUpdate')">提交</Button>
            <Button type="warning" icon="md-log-out" @click="$router.go(-1)">返回</Button>
        </div>
    </i-form>
</template>

<script>
    import contentDrawer from '../../../mixins/contentDrawer'
    import Menu from './menu';
    import IForm from "../../../components/content/form";


    export default {
        name: "update",
        mixins: [contentDrawer, Menu],
        components: {IForm},
        mounted(){
            this.$http.get(`authorities/menu/${this.$route.query.id}/edit`).then((res) => {
                res.row.parent = res.row.parent || {name: '顶级菜单'};
                this.data = res.row
                this.authorities.data = res.authorities
            }).finally(() => this.loading = false);
        },
        methods: {
            submit(name) {
                this.validate(name).then(() => {
                    this.loading = true;
                    this.$http.put(`authorities/menu/${this.$route.query.id}`, this.data).then(() => {
                        this.$Message.success('更新成功')
                    }).finally(() => {
                        this.loading = false;
                    });
                }).catch(() => {

                });
            },
            handleChange(newTargetKeys) {
                this.data.authorities = newTargetKeys
            }
        }
    }
</script>

<style scoped>

</style>