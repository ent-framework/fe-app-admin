import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';
import { t } from 'fe-ent-core/lib/hooks/web/use-i18n';

const account: AppRouteModule = {
  path: '/account',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/account',
  meta: {
    orderNo: 5,
    icon: 'ion:settings-outline',
    title: '系统用户',
  },
  children: [
    {
      path: 'user',
      name: 'AccountManagement',
      meta: {
        title: '用户管理',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/account/user/index.vue'),
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
      component: () => import('/@/views/account/user/user-detail.vue'),
    },
    {
      path: 'position',
      name: 'PositionManagement',
      meta: {
        title: '职位管理',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/account/position/index.vue'),
    },
    {
      path: 'organization',
      name: 'OrganizationManagement',
      meta: {
        title: '机构管理',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/account/org/index.vue'),
    },
  ],
};

export default account;
