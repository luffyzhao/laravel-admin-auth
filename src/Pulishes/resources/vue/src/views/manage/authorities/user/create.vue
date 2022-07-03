<template>
    <BodyModal title="添加" v-model="show" :loading="loading" :width="600">
        <Form :model="data" :rules="ruleValidate" ref="formCreate" label-position="top">
            <Row :gutter="12" style="margin: 0;">
                <Col span="12">
                    <FormItem label="姓名" prop="name">
                        <Input placeholder="请输入姓名" v-model="data.name"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="邮箱" prop="email">
                        <Input placeholder="请输入邮箱" v-model="data.email"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="用户状态" prop="status">
                        <Select v-model="data.status">
                            <Option :value="1">开启</Option>
                            <Option :value="0">关闭</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="所属部门" prop="role_id">
                        <Select v-model="data.role_id">
                            <Option v-for="(item) in roles.data" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="更新密码" prop="password">
                        <Input v-model="data.password" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="确认密码" prop="password_confirmation">
                        <Input v-model="data.password_confirmation" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="说明" prop="remark">
                        <Input v-model="data.remark" type="textarea" :autosize="{minRows: 7,maxRows: 7}"
                               placeholder="Enter something..."/>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <template #footer>
            <Button type="primary" icon="ios-add" @click="submit('formCreate')">提交</Button>
        </template>
    </BodyModal>
</template>

<script>
import BodyModal from "@/components/layout/body/BodyModal";
import IData from "./data"

export default {
    name: "create",
    mixins: [IData],
    components: {BodyModal},
    data() {
    },
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
                    this.show = false;
                }).finally(() => {
                    this.loading = false;
                });
            }).catch();
        }
    }
}
</script>

