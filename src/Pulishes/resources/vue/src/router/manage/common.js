export const common = [
    {
        path: 'home',
        name: 'home',
        meta: {name: "首页", history: true},
        component: () => import('../../views/manage/index'),
    },
    {
        path: 'profile',
        name: 'profile',
        meta: {name: "个人中心", history: true},
        component: () => import('../../views/manage/index/profile.vue'),
    },
    {
        path: 'authorities.role',
        name: 'authorities.role',
        meta: {name: "部门管理", history: true},
        component: () => import('../../views/manage/authorities/role/index.vue'),
    },
    {
        path: 'authorities.menu',
        name: 'authorities.menu',
        meta: {name: "菜单管理", history: true},
        component: () => import('../../views/manage/authorities/menu/index.vue'),
    },
    {
        path: 'authorities.authority',
        name: 'authorities.authority',
        meta: {name: "权限管理", history: true},
        component: () => import('../../views/manage/authorities/authority/index.vue'),
    },
    {
        path: 'authorities.user',
        name: 'authorities.user',
        meta: {name: "用户管理", history: true},
        component: () => import('../../views/manage/authorities/user/index.vue'),
    }
];
