<template>
    <BodyModal title="请求数据" :width="600">
        <Table border :columns="columns" :data="props.res" :height="350">
            <template #code="{ row, index }">
                <Paragraph copyable>{{row.code}}</Paragraph>
            </template>
            <template #status="{ row, index }">
                <span>{{row.status ? "成功": "失败"}}</span>
            </template>
        </Table>
    </BodyModal>
</template>

<script>
import BodyModal from "@/components/layout/body/BodyModal";
import CommonMix from "@/mixins/common"

export default {
    name: "RequestMessage",
    components: {BodyModal},
    mixins: [CommonMix],
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            columns: [
                {
                    title: '单号',
                    slot: 'code',
                    width: 200
                },
                {
                    title: '状态',
                    slot: 'status',
                    width: 100
                },
                {
                    title: '说明',
                    key: 'message'
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
