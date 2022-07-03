const unit = {
    /**
     * 无限级分类
     * @param menus
     * @param parent_id
     * @returns {*}
     */
    treeData: (menus, parent_id) => {
        let cloneData = JSON.parse(JSON.stringify(menus))
        return cloneData.filter(father => {
            let branchArr = cloneData.filter(child => {
                return father['id'] === child['parent_id']
            });
            if (branchArr.length > 0) {
                father['children'] = branchArr
            } else {
                father['children'] = [];
            }
            return father['parent_id'] === parent_id
        });
    }
};


export default {
    install(Vue) {
        Vue.config.globalProperties.$unit = unit;
    }
}


export const $unit = unit;