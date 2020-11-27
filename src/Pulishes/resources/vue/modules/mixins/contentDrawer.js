import fromSubmit from './fromSubmit'
import component from "./component";

export default {
    mixins: [fromSubmit, component],
    name: 'contentDrawer',
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
