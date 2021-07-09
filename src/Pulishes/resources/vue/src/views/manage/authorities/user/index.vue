<template>
    <IContent v-model="componentProps">

        <ISearch v-model="search">
            <FormItem label="姓名">
                <Input v-model="search.name" placeholder="姓名" size="small"></Input>
            </FormItem>
            <FormItem :label-width="1">
                <ButtonGroup>
                    <Button type="primary" icon="ios-search" size="small" @click="getLists(1)">搜索</Button>
                    <Button type="success" icon="ios-add" size="small" @click="openComponent(`ICreate`)">添加</Button>
                </ButtonGroup>
            </FormItem>
        </ISearch>

        <ITable :current="page.current" :table="table" :total="page.total" @on-page-change="pageChange">
            <template slot-scope="{ row, index }" slot="name">
                <span>{{ row.name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="email">
                <span>{{ row.email }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="phone">
                <span>{{ row.phone }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="role">
                <span v-if="Boolean(row.role)">{{ row.role.name }}</span>
                <span v-else>超级管理员</span>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                <Poptip v-if="Boolean(row.role)"
                        transfer
                        confirm
                        title="你确定要更改这个用户的状态吗？"
                        @on-ok="status(row)">
                    <Button :type="row.status === 0 ? 'error' : 'success'" size="small">
                        {{row.status === 0 ? '关闭' : '开启'}}
                    </Button>
                </Poptip>
                <Tag v-else>开启</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button v-if="Boolean(row.role)" type="warning" size="small" @click="openComponent('IUpdate', {id: row.id})">编辑</Button>
            </template>
        </ITable>

		<component slot="component" v-if="componentProps.value" :is="componentProps.view" v-model="componentProps.value"
				   :props="componentProps.props"
				   @input="getLists(page.current)"></component>
    </IContent>
</template>

<script>
    import IContent from "../../../../components/layout/IContent";
    import ISearch from "../../../../components/layout/ISearch";
    import ITable from "../../../../components/layout/ITable";
    import IContentMixins from "../../../../mixins/iContentMixins"

    export default {
        components: {
            ICreate: () => import('./create'),
            IUpdate: () => import('./update'),
			ITable, ISearch, IContent
        },
        mixins: [IContentMixins],
        data() {
            return {
                search: {},
                table: {
                    columns: [
                        {
                            title: '姓名',
                            slot: 'name'
                        },
                        {
                            title: '邮箱',
                            slot: 'email'
                        },
                        {
                            title: '手机号码',
                            slot: 'phone'
                        },
                        {
                            title: '所属部门',
                            slot: 'role'
                        },
                        {
                            title: '状态',
                            slot: 'status'
                        },
                        {
                            title: '操作',
                            slot: 'action'
                        }
                    ]
                },
                loading: true
            }
        },
        methods: {
            getLists(page = 1) {
                this.loading = true;
                this.$http.get(`authorities/user`, {
                    params: Object.assign({}, this.search, {page: page})
                }).then((data) => {
                    this.table.data = data.data
                    this.page.total = data.total
                    this.page.current = data.current_page
                }).finally(() => {
                    this.loading = false;
                });
            },
            status(data) {
                this.loading = true;
                this.$http.put(`authorities/user/${data.id}/status`, {status: data.status === 1 ? 0 : 1})
                    .then(() => {
                        this.getLists(this.page.current)
                    });
            }
        }
    }
</script>

<style>
</style>
