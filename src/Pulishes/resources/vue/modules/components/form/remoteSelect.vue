<template>
    <div @keydown.enter="handleEnter">
        <Select :disabled="disabled" ref="select" v-model="defaultValue" transfer filterable clearable :size="size"
                :loading="loading"  @on-change="change">
            <Option v-for="item in lists" :value="item.code" :key="item.code"><template v-if="showCode">{{item.showCode ? item.showCode: item.code}} - </template>{{ item.name }}</Option>
        </Select>
    </div>
</template>

<script>
    import Emitter from 'iview/src/mixins/emitter';
    import iJson from '../json'

    export default {
        name: "remote-select",
        mixins: [Emitter, iJson],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            }
        },
        data() {
            return {
                loading: true
            }
        },
        computed: {
            defaultValue: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                    this.dispatch('FormItem', 'on-form-change', value);
                }
            }
        },
        methods: {
            change(value) {
                let item = this.lists.find((res) => res.code === value || res.showCode === value);
                this.$emit('on-change', item)
            },
            handleEnter(e) {
                e.preventDefault();
                if(this.$refs['select'].flatOptions.length === 1){
                    const optionComponent = this.$refs['select'].flatOptions[0];
                    if (optionComponent) {
                        const option = this.$refs['select'].getOptionData(optionComponent.componentOptions.propsData.value);
                        this.$refs['select'].onOptionClick(option);
                    } else {
                        this.$refs['select'].hideMenu();
                    }
                    e.stopPropagation();
                }else{
                    e.stopPropagation();
                }
            },
            focus(){
                this.$refs['select'].toggleHeaderFocus({type: 'focus'});
            }
        },
        watch: {
            value(value) {
                this.change(value)
            },
            loading(val) {
                if (val === false) {
                    this.$emit('on-ready')
                }
            }
        }
    }
</script>

<style scoped>

</style>
