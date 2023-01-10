<template>
    <BodyModal title="打印组件" :loading="loading" :width="width">
        <div :id="uuid">
            <slot></slot>
        </div>
        <template #footer>
            <Button type="error" icon="ios-print" v-print="printObj">打印</Button>
        </template>
    </BodyModal>
</template>

<script>
import BodyModal from "@/components/layout/body/BodyModal";
import print from 'vue3-print-nb'
import CommonMix from "@/mixins/common";

function randomstring(L) {
    let s = '';
    let randomchar = function () {
        let n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < L) s += randomchar();
    return s;
}

const uuid = "PRINT_" + randomstring(10);

export default {
    name: "Print",
    mixins: [CommonMix],
    directives: {
        print
    },
    components: {BodyModal},
    props: {
        loading: Boolean,
        width: {
            type: Number,
            default: 800
        },
        title: {
            type: String,
            default: "打印"
        }
    },
    data() {
        return {
            uuid: uuid,
        }
    },
    computed: {
        printObj(){
            return {
                id: uuid,
                popTitle: this.title
            }
        }
    }
}
</script>

<style scoped>

</style>
