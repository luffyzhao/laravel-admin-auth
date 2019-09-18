<template>
    <div class="list-panel">
        <Table :columns="table.columns" :data="table.data" ref="Table" :height="tableHeight">
            <slot></slot>
        </Table>
        <Page :current="current" :total="total" :page-size="pageSize" show-total @on-change="change" size="small"/>
    </div>
</template>

<script>
    export default {
        name: "i-table",
        props: {
            current: {
                type: Number
            },
            total: {
                type: Number
            },
            pageSize: {
                type: Number,
                default: 15
            },
            table: {
                type: Object,
                default: () => {
                    return {columns: [], table: []}
                }
            }
        },
        data(){
            return {
                tableHeight: 0
            }
        },
        mounted() {
            this.tableHeight = document.getElementsByClassName('list-panel').item(0).clientHeight - 45;
            for (let i in this.$scopedSlots) {
                this.table.columns.forEach((val, key) => {
                    if (val.slot === i || val.key === i) {
                        val.slot = null;
                        val.render = (h, {row, column, index}) => {
                            return h('div', this.$scopedSlots[i]({row, column, index}))
                        };
                    }
                });
            }
        },
        methods: {
            change(v) {
                this.$emit('on-page-change', v);
            }
        }
    }
</script>

<style scoped lang="less">
    .list-panel {
        background-color: #fff;
        flex: 1;
    }

    .ivu-page {
        margin-top: 10px;
        text-align: center;
    }
</style>