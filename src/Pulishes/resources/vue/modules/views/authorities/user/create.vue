<template>
    <IDrawer v-model="defaultValue" :loading="loading" :width="860" title="添加用户">
        <Form :model="data" :label-width="100" :rules="ruleValidate" ref="formCreate">
            <FormItem label="姓名" prop="name">
                <Input placeholder="请输入姓名" v-model="data.name"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input placeholder="请输入邮箱" v-model="data.email"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input placeholder="手机号码" v-model="data.phone"></Input>
            </FormItem>
            <FormItem label="用户状态" prop="status">
                <i-switch :true-value="1" :false-value="0" v-model="data.status" size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </FormItem>
            <FormItem label="所属部门" prop="role_id">
                <Select v-model="data.role_id">
                    <Option v-for="(item) in roles.data" :key="item.id" :value="item.id">
                        {{item.name}}
                    </Option>
                </Select>
            </FormItem>

            <FormItem label="密码" prop="password">
                <Input placeholder="请输入密码" type="password" v-model="data.password"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="password_confirmation">
                <Input placeholder="请输入确认密码" type="password" v-model="data.password_confirmation"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" icon="ios-add" @click="submit('formCreate')">提交</Button>
            <Button type="warning" icon="md-log-out" @click="defaultValue = false">返回</Button>
        </div>
    </IDrawer>
</template>

<script>
    import User from './user'
    import contentDrawer from '../../../mixins/contentDrawer'
    import IContent from "../../../components/content/index";
    import IForm from "../../../components/content/form";
    import IDrawer from "../../../components/content/drawer";

    export default {
        name: "create",
        components: {IDrawer, IForm, IContent},
        mixins: [contentDrawer, User],
        mounted() {
            this.$http(`authorities/user/create`).then((res) => {
                this.roles.data = res;
            }).finally(() => {
                this.loading = false;
            });
        },
        methods: {
            submit(name) {
                this.validate(name).then(() => {
                    this.loading = true;
                    this.$http.post(`authorities/user`, this.data).then(() => {
                        this.$store.dispatch('layout/remove', this.$route);
                    }).finally(() => {
                        this.loading = false;
                    });
                }).catch();
            }
        }
    }
</script>

<style scoped>
</style>
