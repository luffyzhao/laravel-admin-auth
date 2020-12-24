<template>
    <div :id="uuid" class="list-panel">
        <Table :columns="table.columns" size="small" :data="table.data" ref="Table" :height="tableHeight">
            <slot></slot>
        </Table>
        <Page :current="current" :total="total" :page-size="pageSize"
              show-total @on-change="change" size="small"
              show-elevator show-sizer @on-page-size-change="pageSizeChange"
              :page-size-opts="[15, 50, 100, 200, 300]"
        />
    </div>
</template>

<script>
    import {getRandomStr} from "view-design/src/components/table/util";

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
        computed: {
            uuid(){
                return getRandomStr(12);
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.tableHeight = document.getElementById(this.uuid).clientHeight - 45;
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
            });
        },
        methods: {
            change(page) {
                this.$emit('on-page-change', {
                    page: page,
                    per_page: this.pageSize
                });
            },
            pageSizeChange(pageSize){
                this.$emit('on-page-change', {
                    page: this.current,
                    per_page: pageSize
                });
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
