<template>
    <Table :columns="columns" :data="value">
        <template slot-scope="{ row, index }" slot="name">
            {{row.foreign === 'LAuth\\Models\\User' ? '管理员' : '客户'}}:{{row.user.name}}
        </template>
    </Table>
</template>

<script>
    export default {
        name: "logs",
        props: {
            value: {
                type: Array,
                default: () => []
            }
        },
        data(){
            return {
                columns: [{
                    title: '序号',
                    width: 80,
                    render: (h, {row, column, index}) => {
                        return h('div', index + 1);
                    }
                }, {
                    title: '操作人',
                    slot: 'name'
                }, {
                    title: '操作备注',
                    key: 'remark'
                }, {
                    title: '操作时间',
                    key: 'created_at'
                }]
            }
        }
    }
</script>

<style scoped>

</style>