import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';

const dashboard: AppRouteModule = {
  path: '/basic',
  name: 'BaseData',
  component: LAYOUT,
  redirect: '/basic/config',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '基础数据',
    orderNo: 20,
  },
  children: [
    {
      path: 'config',
      name: 'ConfigManagement',
      component: () => import('/@/views/basic/config/index.vue'),
      meta: {
        title: '系统配置',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'dict',
      name: 'DictManagement',
      component: () => import('/@/views/basic/dict/index.vue'),
      meta: {
        title: '字典管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'language',
      name: 'LanguageManagement',
      component: () => import('/@/views/basic/i18n/index.vue'),
      meta: {
        title: '多语言配置',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
