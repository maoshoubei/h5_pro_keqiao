import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  proxy:{
    "/ServiceEngine/rest/services/CustomServer" :{
      target: 'http://192.168.10.245:6088/proxy6086',
      changeOrigin: true,
      pathRewrite: { '^/ServiceEngine/rest/services/CustomServe': '/ServiceEngine/rest/services/CustomServe' },
    }
  }
});
