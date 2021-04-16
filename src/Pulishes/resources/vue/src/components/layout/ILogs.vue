<template>
    <Table :columns="columns" :data="value">
        <template slot-scope="{ row, index }" slot="name">
            {{row.user === null ? '系统自动' : row.user.name}}
        </template>
        <template slot-scope="{ row, index }" slot="foreign">
            <RemoteSpan url="common/select/dictionary/LOGS_USER_TYPE" :value="row.foreign"></RemoteSpan>
        </template>
    </Table>
</template>

<script>
    import RemoteSpan from "./RemoteSpan";
    export default {
        name: "ILogs",
        components: {RemoteSpan},
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
                    title: '操作人类型',
                    slot: 'foreign'
                },{
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
