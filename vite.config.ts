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
      cssCodeSplit: true,
      minify: false,
    },
    esbuild: {
      keepNames: true,
    },
    optimizeDeps: {
      include: ['@iconify/iconify', 'ant-design-vue'],
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
