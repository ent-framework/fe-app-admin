import type { AppRouteModule } from 'fe-ent-core/lib/router/types';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';

const routes: AppRouteModule = {
  path: '/example',
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
      path: 'teacher',
      name: 'TeacherManagement',
      component: () => import('/@/views/generated/teacher/teacher.list.vue'),
      meta: {
        title: '教师',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'history-score',
      name: 'HistoryScoreManagement',
      component: () => import('/@/views/generated/history-score/history-score.list.vue'),
      meta: {
        title: '考试记录',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'class-grade',
      name: 'ClassGradeManagement',
      component: () => import('/@/views/generated/class-grade/class-grade.list.vue'),
      meta: {
        title: '班级',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'student',
      name: 'StudentManagement',
      component: () => import('/@/views/generated/student/student.list.vue'),
      meta: {
        title: '学生',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default routes;
