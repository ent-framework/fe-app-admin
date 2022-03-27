import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';

const user: AppRouteModule = {
  path: '/system',
  name: 'AppLog',
  component: LAYOUT,
  redirect: '/system/op-list',
  meta: {
    orderNo: 35,
    icon: 'ion:settings-outline',
    title: '系统功能',
  },
  children: [
    {
      path: 'logs',
      name: 'Logs',
      meta: {
        title: '操作日志',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/logs/index.vue'),
    },
    {
      path: 'login-logs',
      name: 'LoginLogs',
      meta: {
        title: '登录日志',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/login-log/index.vue'),
    },
    {
      path: 'online-user',
      name: 'OnlineUser',
      meta: {
        title: '在线用户',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/onlineuser/index.vue'),
    },
  ],
};

export default user;
