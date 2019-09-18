export const home = [
    {
        path: 'index',
        name: 'home',
        meta: {
            title: '首页',
            cache: true,
            tags: true
        },
        component: () => import('../../views/index/index')
    },
    {
        path: 'profile',
        name: 'profile',
        meta: {
            title: '个人中心',
            cache: true,
            tags: true
        },
        component: () => import('../../views/profile/index')
    },
    {
        path: 'Authorities/user',
        name: 'authorities.user',
        meta: {
            title: '用户管理',
            cache: true,
            tags: true
        },
        component: () => import('../../views/authorities/user/index')
    },
    {
        path: 'Authorities/user/create',
        name: 'authorities.user.create',
        meta: {
            title: '添加用户',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/user/create')
    },
    {
        path: 'Authorities/user/update',
        name: 'authorities.user.update',
        meta: {
            title: '更新用户',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/user/update')
    },
    {
        path: 'Authorities/role',
        name: 'authorities.role',
        meta: {
            title: '部门管理',
            cache: true,
            tags: true
        },
        component: () => import('../../views/authorities/role/index')
    },{
        path: 'Authorities/role/create',
        name: 'authorities.role.create',
        meta: {
            title: '添加部门',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/role/create')
    },{
        path: 'Authorities/role/update',
        name: 'authorities.role.update',
        meta: {
            title: '添加部门',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/role/update')
    },
    {
        path: 'Authorities/menu',
        name: 'authorities.menu',
        meta: {
            title: '菜单管理',
            cache: true,
            tags: true
        },
        component: () => import('../../views/authorities/menu/index')
    },
    {
        path: 'Authorities/menu/create',
        name: 'authorities.menu.create',
        meta: {
            title: '添加菜单',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/menu/create')
    },{
        path: 'Authorities/menu/update',
        name: 'authorities.menu.update',
        meta: {
            title: '更新菜单',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/menu/update')
    },
    {
        path: 'Authorities/authority',
        name: 'authorities.authority',
        meta: {
            title: '权限管理',
            cache: true,
            tags: true
        },
        component: () => import('../../views/authorities/authority/index')
    },
    {
        path: 'Authorities/authority/create',
        name: 'authorities.authority.create',
        meta: {
            title: '添加权限',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/authority/create')
    },
    {
        path: 'Authorities/authority/update',
        name: 'authorities.authority.update',
        meta: {
            title: '更新权限',
            cache: false,
            tags: false
        },
        component: () => import('../../views/authorities/authority/update')
    }
];