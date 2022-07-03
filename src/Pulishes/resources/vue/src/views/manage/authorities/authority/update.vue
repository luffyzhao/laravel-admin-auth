<template>
    <BodyModal title="添加" v-model="show" :loading="loading" :width="600">
        <Form ref="formCreate" :model="data" label-position="top" :rules="ruleValidate">
            <Row :gutter="10" style="margin: 0px;">
                <Col :span="12">
                    <FormItem label="权限名称" prop="name">
                        <Input v-model="data.name"></Input>
                    </FormItem>
                </Col>
                <Col :span="12">
                    <FormItem label="请求URI" prop="uri">
                        <Input v-model="data.uri"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="请求描述" prop="description">
                <Input v-model="data.description" type="textarea" :rows="3"></Input>
            </FormItem>
            <FormItem label="分配菜单">
                <div class="menu-box">
                    <div class="box-body">
                        <Tree :data="menus.data" show-checkbox multiple></Tree>
                    </div>
                </div>
            </FormItem>
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
    mounted() {
        this.$http.get(`authorities/authority/${this.props.id}/edit`).then((res) => {
            this.data = res.row
            this.menus.data = res.menus
            let data = [];
            JSON.parse(JSON.stringify(this.menus.data)).forEach((item) => {
                data.push({
                    id: item.id,
                    parent_id: item.parent_id,
                    title: item.title,
                    expand: true,
                    indeterminate: this.indeterminate(item),
                    checked: this.checked(item)
                })
            });
            this.menus.data = this.setTreeData(data)
        }).finally(() => {
            this.loading = false
        })
    }, methods: {
        submit(name) {
            this.validate(name).then(() => {
                this.loading = true;
                this.$http.put(`authorities/authority/${this.props.id}`,
                    Object.assign({}, this.data, {menus: this.checkedMenus})
                ).then(() => {
                    this.show = false;
                }).finally(() => {
                    this.loading = false;
                });
            }).catch(() => {
            });
        }
    }
}
</script>

<style lang="less" scoped>
.menu-box {
    border: 1px solid #dcdee2;
    border-radius: 5px;

    .box-body {
        height: 300px;
        margin: 10px;
        overflow: auto;

        .ivu-tree ul li {
            margin: 0;
        }

        .authority-header {
            border-bottom: 1px solid #dcdee2;
        }
    }
}
</style>
