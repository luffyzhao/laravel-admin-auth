export default {
    name: 'IComponentMixins',
    data() {
        return {
            componentProps: {
                view: null,
                props: {},
                value: false
            }
        }
    },
    methods: {
        openComponent(view, props = null) {
            this.componentProps.view = view;
            this.componentProps.props = props;
            this.componentProps.value = true;
        },
        closeComponent() {
            this.componentProps.view = null;
            this.componentProps.props = null;
        }
    }
}
