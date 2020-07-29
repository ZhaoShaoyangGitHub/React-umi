import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/Basiclayout',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/list', component: '@/pages/list/index' },
        { path: '/cart', component: '@/pages/cart/index' },
        { path: '/user', component: '@/pages/user/index' },
        { path: '/login', component: '@/pages/login/index' },
      ],
    },
  ],
});
