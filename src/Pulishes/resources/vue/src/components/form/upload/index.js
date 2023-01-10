import url, {pathToFileURL} from "url";
import {session} from "@/reactive/session";
import {openfile} from "@/units/array";

export default {
    props: {
        url: {
            type: String,
            required: true
        },
        modelValue: {
            type: [String, Array],
            default: ''
        },
        format: {
            type: Array,
            default: () => []
        },
        maxSize: {
            type: Number,
            default: 4096
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        action() {
            return url.resolve(this.$http.defaults.baseURL, this.url);
        },
        headers() {
            return {
                authorization: 'bearer ' + session["$store/auth/token"],
                Accept: 'application/json'
            }
        },
        defaultModelValue: {
            get() {
                return this.modelValue;
            },
            set(v) {
                this.$emit('update:modelValue', v);
            },
        }
    },
    methods: {
        handleError() {
            this.$Message.error("文件格式不正确");
            this.loading = false;
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件  ' + file.name + ' 太大了, 不能超过' + this.maxSize + "KB"
            });
        },
        handleProgress() {
            this.loading = true;
        },
        open(value) {
            if (value === '') {
                this.$Message.error('还没有上传文件，请先上传文件！！');
            } else {
                openfile(value)
            }
        },
        beforeUpload() {

        }
    }
}
