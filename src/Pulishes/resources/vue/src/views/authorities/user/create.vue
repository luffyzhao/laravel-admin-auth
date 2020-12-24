<template>
    <IView @on-exit="onExit" @on-repeat="getData">

    </IView>
</template>

<script>
    import IView from "../../../components/layout/IView";
    import IViewMixins from "../../../mixins/iViewMixins";

    export default {
        name: "create",
        components: {IView},
        mixins: [IViewMixins]
    }
</script>

<style scoped>

</style>