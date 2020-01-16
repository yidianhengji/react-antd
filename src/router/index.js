const router = [
    {
        name: '首页',
        icon: 'home',
        path: '/home/test'
    },
    {
        name: '系统管理',
        icon: 'mail',
        path: '',
        children: [
            {
                name: '用户管理',
                icon: 'home',
                path: '/home/user',
            },
            {
                name: '角色管理',
                icon: 'home',
                path: '/home/roles',
            }
        ]
    },
    {
        name: '列表',
        icon: 'mail',
        path: '/home/list',
        children: [
            {
                name: '新闻',
                icon: 'home',
                path: '/home/test2',
            },
            {
                name: '商家',
                icon: 'home',
                path: '/home/test3',
            }
        ]
    }
]

export default router;
