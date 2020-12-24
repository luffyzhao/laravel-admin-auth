import ISubmitMixins from './iSubmitMixins'
import IComponentMixins from "./iComponentMixins";

export default {
    mixins: [ISubmitMixins, IComponentMixins],
    name: 'IDrawerMixins',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        props: {
            default: null
        }
    }, computed: {
        defaultValue: {
            get() {
                return this.value;
            }, set(v) {
                return this.$emit('input', v);
            }
        }
    },
    methods: {
        getData() {}
    }, watch: {
        value(v) {
            if (v) {
                this.getData();
            }
        }
    }
}
