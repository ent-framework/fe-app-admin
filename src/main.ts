import 'uno.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './app.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from 'fe-ent-core/lib/logics';
import { setupErrorHandle } from 'fe-ent-core/lib/logics';
import { entRouter } from 'fe-ent-core/lib/router/base';
import { setupRouterGuard } from 'fe-ent-core/lib/router/guard';
import { setupStore } from 'fe-ent-core/lib/store';
import { setupGlobDirectives } from 'fe-ent-core/lib/directives';
import { setupI18n } from 'fe-ent-core/lib/locales/setup-i18n';
import { registerGlobComp } from 'fe-ent-core/lib/components/register-glob-comp';
import { initApplication } from '/@/init-application';
import { initRouteAndLayout, getBasicRoutes } from 'fe-ent-page';

import 'ant-design-vue/dist/antd.css';
import 'fe-ent-core/dist/app.css';
import 'fe-ent-page/dist/style.css';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);
  //初始化全局变量
  await initApplication();
  // Initialize internal system configuration
  await initAppConfigStore();
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Register global components
  registerGlobComp(app);

  initRouteAndLayout(app);

  // Configure routing
  entRouter.addBasicRoutes(getBasicRoutes());
  entRouter.addBizRoutes(import.meta.globEager(`/src/routes/*.ts`));

  app.use(entRouter);

  // router-guard
  setupRouterGuard(entRouter, true);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}
bootstrap();
