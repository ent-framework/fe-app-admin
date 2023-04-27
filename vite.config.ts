import { defineApplicationConfig } from 'fe-ent-build';
export default defineApplicationConfig({
  overrides: {
    build: {
      rollupOptions: {
        input: {
          index: 'index.html',
          login: 'login.html',
        },
        // output: {
        //   // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        //   entryFileNames: 'js/[name].[hash].js',
        //   // 用于命名代码拆分时创建的共享块的输出命名
        //   chunkFileNames: 'js/[name].[hash].js',
        //   // 用于输出静态资源的命名，[ext]表示文件扩展名
        //   assetFileNames: '[ext]/[name].[hash].[ext]',
        // },
      },
      minify: true,
      cssCodeSplit: true,
      target: '',
      cssTarget: 'chrome61',
    },
    // css: {
    //   modules: {
    //     scopeBehaviour: 'local',
    //     generateScopedName: (name, filename, css) => {
    //       // name -> 代表的是你此刻css文件中的类名
    //       // filename -> 是你当前css文件的绝对路径
    //       // css -> 给的就是你当前样式
    //       console.log('name', name, 'filename', filename, 'css', css); // 这一行会输出在哪？？？ 输出在node
    //       // 配置成函数以后, 返回值就决定了他最终显示的类型
    //       return `${name}_${Math.random().toString(36).substr(3, 8)}`;
    //     },
    //   },
    // },
    optimizeDeps: {
      include: ['@iconify/iconify', 'ant-design-vue'],
    },
    server: {
      port: 3100,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3100',
      //     changeOrigin: true,
      //     ws: true,
      //     // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
      //     // only https
      //     // secure: false
      //   },
      //   '/upload': {
      //     target: 'http://localhost:3300/upload',
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
      //   },
      // },
    },
  },
});
