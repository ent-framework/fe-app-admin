import { defineApplicationConfig } from 'fe-ent-build';

export default defineApplicationConfig({
  overrides: {
    build: {
      rollupOptions: {
        input: {
          index: 'index.html',
          login: 'login.html',
        },
      },
    },
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      port: 3100,
      proxy: {
        '/api': {
          target: 'http://localhost:8088',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },
  },
});
