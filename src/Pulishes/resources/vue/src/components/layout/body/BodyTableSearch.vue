<template>
    <div class="body-table-search" :style="styles">
        <Row>
            <Col :span="8" class="title"><slot name="title">{{ title }}</slot></Col>
            <Col :span="16">
                <slot></slot>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: "BodyTableSearch",
    props: {
        title: String,
        width: {
            type: Number,
            default: 250
        }
    },
    computed: {
        styles(){
            return {
                width: this.width + 'px'
            }
        }
    }
}
</script>

<style scoped lang="less">
.body-table-search {
    width: 250px;
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;

    .title {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        background-color: #f8f8f9;
        line-height: 24px;
        text-align: center;
    }
}
</style>
