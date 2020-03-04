/**
 *
 * @param x
 * @param y
 * @returns {boolean}
 */
const deepCompare = (x, y) => {
    return JSON.stringify(x) === JSON.stringify(y);
};

/**
 *
 * @returns {string}
 */
export const baseUrl = () => {
    const company = /\/company\/(\d)/gi.exec(window.location.pathname)[1];
    return '/api/' + company + '/';
}

/**
 *
 * @param item
 * @param name
 * @param query
 * @param params
 * @returns {boolean|*}
 */
export const existsRoute = (item, {name, query, params}) => {
    return item.name === name && deepCompare(query, item.query) && deepCompare(params, item.params);
};


/**
 * 线型转树型
 * @param list
 * @returns {*}
 */
export const listConvertTree = (list) => {
    let root = null;
    if (list && list.length) {
        root = {id: 0, parent_id: null, children: []};
        const group = {};
        for (let index = 0; index < list.length; index += 1) {
            if (list[index].parent_id !== null && list[index].parent_id !== undefined) {
                if (!group[list[index].parent_id]) {
                    group[list[index].parent_id] = [];
                }
                group[list[index].parent_id].push(list[index]);
            }
        }
        const queue = [];
        queue.push(root);
        while (queue.length) {
            const node = queue.shift();
            node.children = group[node.id] && group[node.id].length ? group[node.id] : null;
            if (node.children) {
                queue.push(...node.children);
            }
        }
    }
    return root.children || [];
}

/**
 * 树型转线型
 * @param root
 * @returns {Array}
 */
export const treeConvertList = (root) => {
    const list = [];
    if (root) {
        const Root = JSON.parse(JSON.stringify(root));
        const queue = [];
        queue.push(Root);
        while (queue.length) {
            const node = queue.shift();
            if (node.children && node.children.length) {
                queue.push(...node.children);
            }
            delete node.children;
            if (node.parentId !== null && node.parentId !== undefined) {
                list.push(node);
            }
        }
    }
    return list;
};
