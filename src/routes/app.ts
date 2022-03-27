import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';

const permission: AppRouteModule = {
  path: '/app',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/app/app-list',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: '应用权限',
  },
  children: [
    {
      path: 'app-list',
      name: 'AppManagement',
      component: () => import('/@/views/app/app/index.vue'),
      meta: {
        title: '应用管理',
      },
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      component: () => import('/@/views/app/menu/index.vue'),
      meta: {
        title: '菜单管理',
      },
    },
    {
      path: 'resource',
      name: 'ResourceView',
      component: () => import('/@/views/app/resource/index.vue'),
      meta: {
        title: '资源查看',
      },
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import('/@/views/app/role/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
  ],
};

export default permission;
