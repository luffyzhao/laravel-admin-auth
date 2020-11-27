<template>
    <IDrawer v-model="defaultValue" :loading="loading" :width="860" title="创建菜单">
        <Form ref="formCreate" :model="data" :label-width="100" :rules="ruleValidate">
            <FormItem label="上级菜单">
                <Input :value="props.name" disabled></Input>
            </FormItem>
            <FormItem label="菜单名称" prop="name">
                <Input v-model="data.name"></Input>
            </FormItem>
            <FormItem label="菜单url" prop="url">
                <Input v-model="data.url"></Input>
            </FormItem>
            <FormItem label="菜单描述" prop="description">
                <Input v-model="data.description" type="textarea" :rows="4"></Input>
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
            <Button type="primary" icon="ios-add" @click="submit('formCreate')">提交</Button>
            <Button type="warning" icon="md-log-out" @click="defaultValue = false">返回</Button>
        </div>
    </IDrawer>
</template>

<script>
    import contentDrawer from '../../../mixins/contentDrawer'
    import Menu from './menu';
    import IForm from "../../../components/content/form";
    import IDrawer from "../../../components/content/drawer";

    export default {
        name: "create",
        components: {IDrawer, IForm},
        mixins: [contentDrawer, Menu],
        mounted(){
            this.$http.get(`authorities/menu/create`).then((res) => {
                this.authorities.data = res
            }).finally(() => {
                this.loading = false
            });
        },
        methods: {
            submit(name) {
                this.validate(name).then(() => {
                    this.loading = true;
                    this.$http.post(`authorities/menu`, this.data).then(() => {
                        this.defaultValue = false;
                    }).finally(() => {
                        this.loading = false;
                    });
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>

</style>
