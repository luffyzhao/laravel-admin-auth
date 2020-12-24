export default {
    name: 'ISubmitMixins',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        validate(name) {
            return new Promise((resolve, reject) => {
                this.$refs[name].validate((valid) => {
                    valid ? resolve() : reject();
                });
            });
        }
    }
}
