<template>
    <i-content :spinShow="loading" class="menu-content-wrapper">
        <Tree :data="data" :render="renderContent" class="tree"></Tree>

        <component v-if="componentProps.value" :is="componentProps.view" v-model="componentProps.value" :props="componentProps.props"
                   @input="getLists(page.current)"></component>
    </i-content>
</template>

<script>
    import IContent from "../../../components/content/index";
    import contentListPage from "../../../mixins/contentListPage";
    import render from './render'
    import ICreate from './create'
    import IUpdate from './update'

    export default {
        name: "index",
        mixins: [contentListPage],
        components: {IContent, render, ICreate, IUpdate},
        data() {
            return {
                data: [{
                    id: 0,
                    name: '顶级菜单',
                    expand: true,
                    children: []
                }]
            }
        },
        methods: {
            getLists() {
                this.loading = true;
                this.$http.get(`authorities/menu`).then((data) => {
                    this.data[0].children = this.setTreeData(data);
                }).finally(()=> {this.loading = false;});
            },
            renderContent(h, {root, node, data}) {
                return h(render, {
                    props: {
                        root, node, data, parent: data.id === 0
                    },
                    on: {
                        'on-append': this.append,
                        'on-remove': this.remove,
                    }
                });
            },
            append(data, com = 'create') {
                if(com === 'create'){
                    this.openComponent('ICreate', data)
                }else{
                    this.openComponent('IUpdate', data)
                }
            },
            remove(data) {
                this.loading = true;
                this.$http.delete(`authorities/menu/${data.id}`)
                .then((res) =>{
                    this.getLists();
                });
            },
            setTreeData(source) {
                let cloneData = JSON.parse(JSON.stringify(source))
                let tree = cloneData.filter(father => {
                    let branchArr = cloneData.filter(child => {
                        return father['id'] == child['parent_id']
                    });
                    if (branchArr.length > 0) {
                        father['children'] = branchArr
                    }
                    return father['parent_id'] == 0
                })
                return tree
            }
        }
    }
</script>

<style scoped>
.tree{
    width: 100%;
    padding: 18px;
}
.menu-content-wrapper{
    background-color: #fff;
}
</style>
