<template>
    <BodyContent v-model="component">
        <BodyTable v-model="table.page" :columns="table.columns" :data="table.data" :loading="table.loading"
                   @on-refresh="handleSearch" title="部门管理" ref="bodyTable">
            <template #header-left>
                <Button type="primary" icon="md-add" @click="handleCreate">新增</Button>
                <Button type="primary" icon="md-create" @click="handleUpdate(`bodyTable`)">修改</Button>
                <Button type="error" icon="ios-archive" @click="handleRemove(`bodyTable`)">删除</Button>
            </template>

            <template #search>
                <BodyTableSearch title="部门名称">
                    <Input v-model="table.search.name" placeholder="部门名称" size="small"></Input>
                </BodyTableSearch>
                <ButtonGroup>
                    <Button size="small" @click="handleSearch(1)">查询</Button>
                </ButtonGroup>
            </template>

            <template #name="{ row, index }">
                <span>{{ row.name }}</span>
            </template>
            <template #uri="{ row, index }">
                <span>{{ row.uri }}</span>
            </template>
            <template #description="{ row, index }">
                <span>{{ row.description }}</span>
            </template>
            <template #action="{ row, index }">
                <ButtonGroup>
                    <Button type="error" size="small" @click="submitForRemove(row)">删除</Button>
                </ButtonGroup>
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
                        title: '权限名称',
                        slot: 'name'
                    },
                    {
                        title: 'URI',
                        slot: 'uri'
                    },
                    {
                        title: '请求描述',
                        slot: 'description'
                    }
                ]
            }
        }
    },
    methods: {
        handleSearch(page) {
            this.handleRefresh(`authorities/authority`, page);
        },
        submitForRemove(data) {
            this.confirm().then((res) => {
               this.table.loading = true;
                this.$http.delete(`authorities/authority/${data.id}`).finally(() => {
                    this.table.loading = false
                })
            });
        },
        handleRemove(name) {
            this.getSelectionOne(name).then((row) => {
                this.submitForRemove(row);
            });
        },
        handleCreate() {
            this.openComponent(Create)
        },
        handleUpdate(name) {
            this.getSelectionOne(name).then((row) => {
                this.openComponent(Update, row);
            });
        }
    }
}
</script>

<style scoped>

</style>
