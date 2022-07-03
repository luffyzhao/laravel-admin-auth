<template>
    <BodyContent v-model="component">
        <Row class="cards" :gutter="20">
            <Col :span="7">
                <Card>
                    <template #title>
                        <Dropdown @on-click="createMenu" class="dropdown-button">
                            <Button size="small">
                                添加菜单
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <template #list>
                                <DropdownMenu>
                                    <DropdownItem name="parent">添加顶级菜单</DropdownItem>
                                    <DropdownItem :disabled="!Boolean(selectNode.id)" name="children">添加子菜单
                                    </DropdownItem>
                                </DropdownMenu>
                            </template>
                        </Dropdown>
                        <Button size="small" type="error" v-if="checkNodes.length > 0" @click="remove">
                            <Icon type="ios-clipboard"/>
                            批量删除
                        </Button>
                    </template>
                    <Tree :data="data" show-checkbox @on-select-change="selectChange"
                          @on-check-change="checkChange"></Tree>
                </Card>
            </Col>
            <Col :span="17">
                <Card>
                    <template #title>{{ title }}</template>
                    <component v-if="component1.render !== null" :is="component1.render"
                               :props="component1.props"></component>
                </Card>
            </Col>
        </Row>
    </BodyContent>
</template>

<script>
import BodyContent from "@/components/layout/BodyContent";
import BodyTable from "@/components/layout/body/BodyTable";
import BodyTableSearch from "@/components/layout/body/BodyTableSearch";
import CommonMixin from "@/mixins/common";
import IUpdate from "./update"
import ICreate from "./create"
import {markRaw} from "vue";

export default {
    name: "index",
    mixins: [CommonMixin],
    components: {BodyTableSearch, BodyTable, BodyContent, IUpdate, ICreate},
    data() {
        return {
            title: '编辑菜单',
            data: [],
            selectNode: {},
            checkNodes: [],
            component1: {
                render: null,
                props: {},
            },
        }
    },
    mounted() {
        this.getLists();
    },
    methods: {
        openComponent(render, props) {
            this.component1.render = null;
            this.component1.render = markRaw(render);
            this.component1.props = props;
        },
        createMenu(name) {
            switch (name) {
                case 'parent':
                    this.openComponent('ICreate', {id: 0, title: '顶级菜单'});
                    this.title = '添加顶级菜单';
                    break;
                case 'children' :
                    this.openComponent('ICreate', this.selectNode);
                    this.title = '添加[' + this.selectNode.title + ']子菜单';
                    break;
            }
        },
        remove() {
            this.loading = true;
            let nodes = this.checkNodes.map(val => val.id);
            this.$http.delete(`authorities/menu/${nodes.join('|')}`).then((res) => {
                this.getLists();
            }).finally(() => {
                this.loading = true
            });
        },
        getLists() {
            this.loading = true;
            this.$http.get(`authorities/menu`).then((data) => {
                this.data = this.setTreeData(data);
                this.checkNodes = [];
                this.selectNode = {};
            }).finally(() => {
                this.loading = false;
            });
        },
        selectChange(nodes, node) {
            if (nodes.length === 1) {
                this.openComponent(IUpdate, nodes[0]);
                this.title = '修改[' + nodes[0].title + ']菜单';
                this.selectNode = nodes[0];
            }
        },
        checkChange(nodes, node) {
            this.checkNodes = nodes;
        },
        setTreeData(source) {
            let cloneData = JSON.parse(JSON.stringify(source))
            let tree = cloneData.filter(father => {
                father.expand = true;
                let branchArr = cloneData.filter(child => {
                    return father['id'] == child['parent_id']
                });
                if (branchArr.length > 0) {
                    father['children'] = branchArr
                }
                return father['parent_id'] == 0
            })
            return tree
        }
    }
}
</script>


<style lang="less">
.cards {
    height: 100%;
    .dropdown-button{
        margin-right: 10px;
    }
    .ivu-col {
        height: 100%;

        .ivu-card{
            height: 100%;
            .ivu-card-body{
                height: calc(100% - 53px);
            }
        }
    }
}
</style>
