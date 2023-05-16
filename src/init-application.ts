import { useUserStoreWithOut } from 'fe-ent-core/lib/store/modules/user';
import { useI18n } from 'fe-ent-core/lib/hooks/web';
import { initHttpBridge, initUserBridge } from 'fe-ent-core/lib/logics';
import { loginApi, getUserInfo, getPermCode, doLogout } from 'fe-ent-core/lib/logics';
import { getUserLeftMenus } from '/@/api/menu';
import { usePermission } from 'fe-ent-core/lib/hooks/web/use-permission';
import { useAppStoreWithOut } from 'fe-ent-core/lib/store';
// 为了解耦 `packages/*` 下面各模块，不再相互依赖
// 如果模块相互依赖严重，则需要对外提供解耦方式，由调用方去进行参数传递
// 各个模块需要提供 `bridge` 文件作为解耦方式
async function initPackages() {
  const _initRequest = async () => {
    const apiUrl = '';
    const { t } = useI18n();
    await initHttpBridge(() => {
      return {
        apiUrl,
        getTokenFunction: () => {
          const userStore = useUserStoreWithOut();
          return userStore.getToken;
        },
        errorFunction: null,
        noticeFunction: null,
        errorModalFunction: null,
        timeoutFunction: () => {
          const userStore = useUserStoreWithOut();
          userStore.setToken(undefined);
          userStore.logout(true);
        },
        unauthorized: (msg?: string) => {
          const userStore = useUserStoreWithOut();
          userStore.setToken(undefined);
          userStore.logout(true);
          return msg || t('sys.api.errMsg401');
        },
        handleErrorFunction: (msg, mode) => {},
      };
    });
  };

  const _initUser = async () => {
    await initUserBridge(() => {
      return {
        loginApi: loginApi,
        getUserInfo: getUserInfo,
        getPermCode: getPermCode,
        doLogout: doLogout,
        getMenuList: getUserLeftMenus,
      };
    });
  };

  await Promise.all([_initRequest(), _initUser()]);
}

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initPackages();
  // Initialize internal system configuration
  //initAppConfigStore()
  const appStore = useAppStoreWithOut();
  // appStore.setProjectConfig({
  //   multiTabsSetting: {
  //     show: false,
  //   },
  //   openKeepAlive: false,
  // });
  appStore.setPageLoading(true);
  const { changePermissionMode } = usePermission();
  await changePermissionMode('BACK');
}
