export default {
  '/HostUrl': {
    target: 'http://192.168.10.245:6088/proxy6086/',
    changeOrigin: true,
    pathRewrite: { '^/HostUrl': '' },
  },
};
