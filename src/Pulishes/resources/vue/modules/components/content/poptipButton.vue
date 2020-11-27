<template>
    <Poptip transfer confirm @on-ok="confirmOk">
        <div slot="title">{{content}}</div>
        <Button :type="type" :size="size"><slot>{{title}}</slot></Button>
    </Poptip>
</template>

<script>
    export default {
        name: "poptipButton",
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: '请确认'
            },
            type: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: 'default'
            }
        },
        methods: {
            confirmOk(){
                this.$emit('on-ok');
            }
        }
    }
</script>

<style scoped>

</style>