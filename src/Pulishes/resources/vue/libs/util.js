/**
 * 浮点数运算
 * @returns {{add: (function(*=, *=): *), subtract: (function(*=, *=): *), divide: (function(*=, *=): *), multiply: (function(*=, *=): *)}}
 */
export const floatObj = () => {
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }

    function toInteger(floatNum) {
        let ret = {times: 1, num: 0};
        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret
        }
        let strfi = floatNum + '';
        let dotPos = strfi.indexOf('.');
        let len = strfi.substr(dotPos + 1).length;
        let times = Math.pow(10, len);
        let intNum = parseInt(floatNum * times + 0.5, 10);
        ret.times = times;
        ret.num = intNum;
        return ret
    }
    function operation(a, b, op) {
        let o1 = toInteger(a);
        let o2 = toInteger(b);
        let n1 = o1.num;
        let n2 = o2.num;
        let t1 = o1.times;
        let t2 = o2.times;
        let max = t1 > t2 ? t1 : t2;
        let result = null;
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max;
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                return result;
            case 'divide':
                result = (n1 / n2) * (t2 / t1);
                return result
        }
    }
    function add(a, b) {
        return operation(a, b, 'add')
    }

    function subtract(a, b) {
        return operation(a, b, 'subtract')
    }

    function multiply(a, b) {
        return operation(a, b, 'multiply')
    }

    function divide(a, b) {
        return operation(a, b, 'divide')
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
};

export const uuid = () => {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
};

/**
 *
 * @param filename
 * @param ext
 * @returns {string}
 */
export const getType = (filename, ext) => {
    let index1=filename.lastIndexOf(".");
    let index2=filename.length;alert(index2);
    let type=filename.substring(index1,index2);
    return type ? type : ext;
}
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
    return '/api/';
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
