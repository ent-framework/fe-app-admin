import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';
import { t } from 'fe-ent-core/lib/hooks/web/use-i18n';

const dashboard: AppRouteModule = {
  path: '/base-data',
  name: 'BaseData',
  component: LAYOUT,
  redirect: '/base-data/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '基础数据',
    orderNo: 20,
  },
  children: [
    {
      path: 'config',
      name: 'Config',
      component: () => import('/@/views/system/config/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
