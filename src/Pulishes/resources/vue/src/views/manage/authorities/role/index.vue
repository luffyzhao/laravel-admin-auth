<template>
    <BodyContent v-model="component">
        <BodyTable v-model="table.page" :columns="table.columns" :data="table.data" :loading="table.loading"
                   @on-refresh="handleSearch" title="部门管理" ref="bodyTable">
            <template #header-left>
                <Button type="primary" icon="md-add" @click="handleCreate">新增</Button>
                <Button type="primary" icon="md-create" @click="handleUpdate(`bodyTable`)">修改</Button>
            </template>

            <template #search>
                <BodyTableSearch title="部门名称">
                    <Input v-model="table.search.name" placeholder="部门名称" size="small"></Input>
                </BodyTableSearch>
                <ButtonGroup>
                    <Button size="small" @click="handleSearch(1)">查询</Button>
                </ButtonGroup>
            </template>

            <template #description="{ row }">
                <span>{{ row.description }}</span>
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
                        title: '部门',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        title: '部门描述',
                        slot: 'description'
                    }
                ]
            }
        }
    },
    methods: {
        handleSearch(page) {
            this.handleRefresh(`authorities/role`, page);
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
