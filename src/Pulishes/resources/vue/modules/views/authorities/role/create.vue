<template>
    <i-form :spin-show="loading" width="1200">
        <Form :model="data" :label-width="100" :rules="ruleValidate" ref="formCreate">
            <Row>
                <Col span="10">
                    <FormItem label="部门名称" prop="name">
                        <Input v-model="data.name"></Input>
                    </FormItem>
                    <FormItem label="部门描述" prop="description">
                        <Input v-model="data.description" type="textarea" :rows="2"></Input>
                    </FormItem>
                </Col>
            </Row>


            <Row>
                <Col span="6">
                    <FormItem label="分配菜单">
                        <div class="menu-box">
                            <div class="box-body">
                                <Tree :data="menus.data" show-checkbox multiple @on-check-change="change"></Tree>
                            </div>
                        </div>
                    </FormItem>
                </Col>
                <Col span="18">
                    <FormItem label="分配权限">
                        <div class="menu-box">
                            <div class="box-body">
                                <CheckboxGroup v-model="data.authorities">
                                    <div v-for="(item, index) in authorities.data" :key="index">
                                        <h4 v-if="item.authorities.length > 0" class="authority-header">
                                            {{item.title}}
                                        </h4>
                                        <Checkbox v-for="(val, key) in item.authorities" :key="key" :label="val.id">{{val.name}}</Checkbox>
                                    </div>
                                </CheckboxGroup>
                            </div>
                        </div>
                    </FormItem>
                </Col>
            </Row>

        </Form>
        <div slot="footer">
            <Button type="primary" icon="ios-add" @click="submit('formCreate')">提交</Button>
            <Button type="warning" icon="md-log-out" @click="$router.go(-1)">返回</Button>
        </div>
    </i-form>
</template>

<script>
    import contentDrawer from '../../../mixins/contentDrawer'
    import Role from './role';
    import IForm from "../../../components/content/form";

    export default {
        name: "create",
        components: {IForm},
        mixins: [contentDrawer, Role],
        mounted() {
            this.$http.get(`authorities/role/create`).then((res) => {
                this.menus.data = this.setTreeData(res)
            }).finally(() => {
                this.loading = false
            });
        },
        computed: {
            checkedMenus() {
                return this.toChecked(JSON.parse(JSON.stringify(this.menus.data)))
            }
        },
        methods: {

            submit(name) {
                this.validate(name).then(() => {
                    this.loading = true;
                    this.$http.post(`authorities/role`, this.data).then(() => {
                        this.$store.dispatch('layout/remove', this.$route);
                    }).finally(() => {
                        this.loading = false;
                    });
                }).catch();
            },
            setTreeData(source) {
                let cloneData = JSON.parse(JSON.stringify(source))
                let tree = cloneData.filter(father => {
                    let branchArr = cloneData.filter(child => {
                        return father['id'] == child['parent_id']
                    });
                    if (branchArr.length > 0) {
                        father['children'] = branchArr
                    }
                    return father['parent_id'] == 0
                })
                return tree.map((item) => {
                    return Object.assign(item, {expand: true});
                })
            },
            toChecked(data) {
                let arr = [];
                data.forEach((item) => {
                    if (item.indeterminate === true || item.checked === true) {
                        arr.push(item.id)
                        if (item.children && item.children.length > 0) {
                            arr = arr.concat(this.toChecked(item.children));
                        }
                    }
                });
                return arr
            }
        },
        watch: {
            checkedMenus(val) {
                this.data.menus = val
            }
        }
    }
</script>

<style lang="less">
    .ivu-steps {
        margin-bottom: 15px;
    }

    .menu-box {
        border: 1px solid #dcdee2;
        border-radius: 5px;

        .box-body {
            height: 500px;
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