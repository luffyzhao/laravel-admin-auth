<template>
    <Poptip transfer title="确认" :width="300">
        <Button :type="type" :size="size">{{title}}</Button>
        <template slot="content">
            <Form :model="data" :label-width="0" :rules="ruleValidate" ref="formCreate">
                <FormItem prop="value">
                    <Input type="textarea" v-model="data.value" :rows="2"/>
                </FormItem>
                <FormItem>
                    <Button type="info" long @click="submit">{{title}}</Button>
                </FormItem>
            </Form>
        </template>
    </Poptip>
</template>

<script>
    import FromSubmit from "../../mixins/fromSubmit"

    export default {
        name: "poptipRemark",
        mixins: [FromSubmit],
        props: {
            title: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'error'
            },
            size: {
                type: String,
                default: 'default'
            }
        },
        data() {
            return {
                data: {
                    value: ''
                },
                ruleValidate: {
                    value: {required: true, message: "必须填写"}
                }
            }
        },
        methods: {
            submit(){
                this.validate('formCreate').then(() => {
                    this.$emit('on-submit', this.data.value);
                    this.data.value = '';
                })
            }
        }
    }
</script>

<style scoped>

</style>