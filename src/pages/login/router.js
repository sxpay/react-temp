export default [
    {
        path: '/login/login',
        title: {
            title: '登录',
            headerHide: false,
            footerHide: true,
        },
        component: () => import('../../pages/login/login'),
    },
];