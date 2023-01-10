<template>
    <DatePicker v-model="defaultModelValue" transfer @on-change="handleChange" :type="type" style="width: 100%;" :options="options" ref="datePicker" :small="small"></DatePicker>
</template>

<script>
export default {
    name: "IDatePicker",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        type:{
            type: String,
            default: 'date'
        },
        small:{
            type: String,
            default: 'default'
        },
        options:{
            type: Object,
            default: () => {}
        }
    },
    computed: {
        defaultModelValue: {
            get() {
                return this.modelValue;
            },
            set(v) {
                this.$emit('update:modelValue', this.$refs['datePicker'].publicStringValue);
            },
        }
    },
    methods: {
        handleChange(v, date){
            //this.$emit("update:modelValue", v);
        }
    }
}
</script>

<style scoped>

</style>
