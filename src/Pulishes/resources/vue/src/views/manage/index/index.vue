<template>
    <IContent v-model="componentProps">
1111
    </IContent>
</template>

<script>
    import IContent from "../../../components/layout/IContent";
    import IContentMixins from "../../../mixins/iContentMixins"

    export default {
        components: {
			IContent
        },
        mixins: [IContentMixins],
        data() {
            return {
            }
        }
    }
</script>

<style>
</style>
