// Register icon sprite
import 'virtual:svg-icons-register';
import App from './app.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from 'fe-ent-core/lib/logics';
import { setupErrorHandle } from 'fe-ent-core/lib/logics';
import { setupRouter, useEntRouter } from 'fe-ent-core/lib/router/base';
import { setupRouterGuard } from 'fe-ent-core/lib/router/guard';
import { setupStore } from 'fe-ent-core/lib/store';
import { setupGlobDirectives } from 'fe-ent-core/lib/directives';
import { setupI18n } from 'fe-ent-core/lib/locales/setup-i18n';
import { registerGlobComp } from 'fe-ent-core/lib/components/register-glob-comp';
import { initApplication } from '/@/init-application';
//import { LoginRoute } from 'fe-ent-login';
import { LoginRoute } from '/@/views/login/router';

import 'ant-design-vue/dist/antd.css';
import 'fe-ent-core/dist/app.css';
import 'fe-ent-login/dist/style.css';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  //初始化全局变量
  await initApplication();

  // Initialize internal system configuration
  await initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  const entRouter = useEntRouter();
  // Configure routing
  entRouter.addBasicRoutes([LoginRoute]);

  setupRouter(app);

  // router-guard
  setupRouterGuard(entRouter, false);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
