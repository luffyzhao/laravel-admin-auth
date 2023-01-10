<template>
    <template v-if="autoColor">
        <Tag :color="color" type="border">{{defaultValue}}</Tag>
    </template>
    <template v-else>
        <span>{{defaultValue}}</span>
    </template>
</template>

<script>
import iJson from './index'

export default {
    name: "remote-span",
    props: {
        autoColor: {
            type: Boolean
        }
    },
    mixins: [iJson],
    data(){
        return {
            colors: ["default","primary","success","error","warning","magenta","red","volcano","orange","gold","yellow","lime","green","cyan","blue","geekblue","purple"]
        }
    },
    computed: {
        color() {
            let color = 'primary';
            if(this.autoColor){
                let index = this.lists.findIndex((v) => v.code === this.modelValue);
                if(index !== -1){
                    color = this.colors[this.lists.findIndex((v) => v.code === this.modelValue)];
                }
            }
            return color;
        }
    }
}
</script>

<style scoped>

</style>
