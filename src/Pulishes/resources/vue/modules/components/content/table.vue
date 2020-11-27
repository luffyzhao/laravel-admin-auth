<template>
    <div class="list-panel" :id="uuid">
        <Table :columns="columns" :data="table.data" ref="Table" border stripe :height="tableHeight" @on-selection-change="selectionChange">
            <slot></slot>
        </Table>
        <Page :current="current" :total="total" :page-size="pageSize" show-total @on-change="change" size="small"/>
    </div>
</template>

<script>
    import {uuid} from "../../../libs/util";
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
        computed: {
            columns(){
                return [{
                    title: '序号',
                    type: 'index',
                    width: 60
                },].concat(this.table.columns);
            }
        },
        data() {
            return {
                tableHeight: 0,
                uuid: uuid()
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
            change(v) {
                this.$emit('on-page-change', v);
            },
            selectionChange(v){
                this.$emit('on-selection-change', v);
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
