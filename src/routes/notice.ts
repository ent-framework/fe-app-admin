import type { AppRouteModule } from 'fe-ent-core/lib/router/types';
import { t } from 'fe-ent-core/lib/hooks/web/use-i18n';

const user: AppRouteModule = {
  path: '/notice',
  name: 'Notice',
  component: 'LAYOUT',
  redirect: '/notice/list',
  meta: {
    orderNo: 25,
    icon: 'ion:settings-outline',
    title: '通知管理',
  },
  children: [
    {
      path: 'notice-publish',
      name: 'NoticePublish',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/account/user/index.vue'),
    },
    {
      path: 'message',
      name: 'MessageManagement',
      meta: {
        title: '我的消息',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/account/position/index.vue'),
    },
  ],
};

export default user;
