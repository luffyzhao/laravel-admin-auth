<template>
    <div v-on:click="handleClick" ref="content"><slot></slot></div>
</template>

<script>
export default {
    name: "VCell",
    methods: {
        handleClick(){
            this.$Copy({
                text: this.$refs['content'].innerText
            });
        }
    }
}
</script>

<style scoped>

</style>
