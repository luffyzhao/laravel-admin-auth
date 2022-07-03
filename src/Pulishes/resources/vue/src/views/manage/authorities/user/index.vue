<template>
    <BodyContent v-model="component">
        <BodyTable v-model="table.page" :columns="table.columns" :data="table.data" :loading="table.loading"
                   @on-refresh="handleSearch" title="部门管理" ref="bodyTable">
            <template #header-left>
                <Button type="primary" icon="md-add" @click="handleCreate">新增</Button>
                <Button type="primary" icon="md-create" @click="handleUpdate(`bodyTable`)">修改</Button>
                <Button type="primary" icon="md-create" @click="handleStatus(`bodyTable`)">更新状态</Button>
            </template>

            <template #search>
                <BodyTableSearch title="姓名">
                    <Input v-model="table.search.name" placeholder="姓名" size="small"></Input>
                </BodyTableSearch>
                <ButtonGroup>
                    <Button size="small" @click="handleSearch(1)">查询</Button>
                </ButtonGroup>
            </template>

            <template #role="{ row, index }">
                <span v-if="Boolean(row.role)">{{ row.role.name }}</span>
                <span v-else>超级管理员</span>
            </template>
            <template #status="{ row, index }">
                {{row.status === 0 ? '关闭' : '开启'}}
            </template>
        </BodyTable>
    </BodyContent>
</template>

<script>
import BodyContent from "@/components/layout/BodyContent";
import BodyTable from "@/components/layout/body/BodyTable";
import BodyTableSearch from "@/components/layout/body/BodyTableSearch";
import CommonMixin from "@/mixins/common";
import Create from "./create"
import Update from "./update"


export default {
    name: "index",
    mixins: [CommonMixin],
    components: {BodyTableSearch, BodyTable, BodyContent, Create, Update},
    data() {
        return {
            table: {
                search: {},
                columns: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '手机号码',
                        key: 'phone'
                    },
                    {
                        title: '所属部门',
                        slot: 'role'
                    },
                    {
                        title: '状态',
                        slot: 'status'
                    }
                ]
            }
        }
    },
    methods: {
        handleSearch(page) {
            this.handleRefresh(`authorities/user`, page);
        },
        handleCreate() {
            this.openComponent(Create)
        },
        handleUpdate(name) {
            this.getSelectionOne(name).then((row) => {
                this.openComponent(Update, row);
            });
        },
        handleStatus(name) {
            this.getSelectionOne(name).then((data) => {
                if(Boolean(data.role)){
                    this.confirm().then(() => {
                        this.table.loading = true;
                        this.$http.put(`authorities/user/${data.id}/status`, {status: data.status === 1 ? 0 : 1})
                            .then(() => {
                                this.handleSearch()
                            });
                    })
                }else{
                    this.$Message.error('超级管理员不能修改！');
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
