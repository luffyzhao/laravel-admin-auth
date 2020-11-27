<template>
    <span>{{defaultValue}}</span>
</template>

<script>
    import Emitter from 'iview/src/mixins/emitter';
    import iJson from '../json'

    export default {
        name: "remoteSpan",
        mixins: [Emitter, iJson],
    }
</script>

<style scoped>

</style>
