import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';
import { t } from 'fe-ent-core/lib/hooks/web/use-i18n';

const user: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 5,
    icon: 'ion:settings-outline',
    title: '系统用户',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/user/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('/@/view/system/user/user-detail.vue'),
    },
    {
      path: 'position',
      name: 'PositionManagement',
      meta: {
        title: '职位管理',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/position/index.vue'),
    },
    {
      path: 'organization',
      name: 'OrganizationManagement',
      meta: {
        title: '机构管理',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/org/index.vue'),
    },
  ],
};

export default user;
