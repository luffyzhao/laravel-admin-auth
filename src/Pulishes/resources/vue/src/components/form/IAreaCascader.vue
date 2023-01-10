<template>
    <Cascader :data="data" @on-change="handleChange" :model-value="defaultValue" :load-data="loadData" transfer/>
</template>

<script>

import { pca, pcaa } from 'area-data';
import util from "../util";
import Emitter from 'view-ui-plus/src/mixins/emitter';

const levelShow = (level, code) => {
    if (level === 2) {
        return Object.keys(pca[86]).indexOf(code) > -1;
    } else if (level === 3) {
        return true;
    }
};

export default {
    name: "IAreaCascader",
    mixins: [Emitter],
    props: {
        modelValue: {
            type: Array,
            default: []
        }, level: {
            type: [Number, String],
            default: 3
        },
        dataType: {
            type: String,
            default: 'name'
        }
    },
    computed: {
        defaultValue: {
            get() {
                let i = 0;
                let index = '';
                let select = [];
                while (this.modelValue[i] && i <= this.showLevel) {
                    if (i === 0) {
                        index = util.getIndex(pca[86], this.modelValue[0]);
                    } else {
                        index = util.getIndex(pcaa[index], this.modelValue[i]);
                    }
                    select.push(index);
                    i++;
                }
                return select;
            },
            set(value) {
                const _value = this.procesValue(value);
                console.log(_value, value)
                this.$emit('update:modelValue', _value);
                this.dispatch('FormItem', 'on-form-change', _value);
            }
        },
        showLevel () {
            return parseInt(this.level);
        }
    },
    data(){
        return {
            data: []
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        handleChange(value, selectedData){
            const _value = this.procesValue(value);
            //console.log(_value, value)
            this.$emit('update:modelValue', _value);
            this.dispatch('FormItem', 'on-form-change', _value);
        },
        init () {
            let proData = [];
            for (const p in pca[86]) {
                let proitem = {
                    value: p,
                    label: pca[86][p],
                    children: []
                };
                if (this.showLevel > 0 && pca[p]) {
                    proitem.loading = false;
                }
                proData.push(proitem);
            }
            this.data = proData;
        },
        loadData(item, callback){
            item.loading = true;
            for (const p in pcaa[item.value]) {
                let childitem = {
                    value: p,
                    label: pcaa[item.value][p],
                    children: []
                };
                if (pcaa[childitem.value] && levelShow(this.showLevel, p)) {
                    childitem.loading = false;
                }
                item.children.push(childitem);
            }
            item.loading = false;
            callback();
        },procesValue (arr) {
            let i = 0;
            let res = [];
            while (arr[i]) {
                let name = '';
                if (i === 0) {
                    name = pca[86][arr[i]];
                } else {
                    name = pcaa[arr[i - 1]][arr[i]];
                }
                let item;
                if (this.dataType === 'all') {
                    item = {
                        code: arr[i],
                        name: name
                    };
                } else if (this.dataType === 'name') {
                    item = name;
                } else {
                    item = arr[i];
                }
                res.push(item);
                i++;
            }
            return res;
        }
    }
}
</script>

<style scoped>

</style>
