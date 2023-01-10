<template>
    <Table :columns="columns" :data="data" size="small">
        <template #user="{ row, index }">
            <span>{{row.user.name}}</span>
        </template>
    </Table>
</template>

<script>
export default {
    name: "Log",
    props: {
        data: {
            type: Array
        }
    },
    data () {
        return {
            columns: [
                {
                    title: '用户',
                    slot: 'user',
                    width: 150
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title: '时间',
                    key: 'created_at',
                    width: 150
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
