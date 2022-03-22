import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/app-management',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: '应用权限',
  },
  children: [
    {
      path: 'app',
      name: 'AppManagement',
      component: () => import('/@/views/system/app/index.vue'),
      meta: {
        title: '应用管理',
      },
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import('/@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      component: () => import('/@/views/system/menu/index.vue'),
      meta: {
        title: '菜单管理',
      },
    },
    {
      path: 'resource',
      name: 'ResourceView',
      component: () => import('/@/views/system/resource/index.vue'),
      meta: {
        title: '资源查看',
      },
    },
  ],
};

export default permission;
