const path = require('path');

const devServerPort = 9527;
const mockServerPort = 9528;
const name = 'Vue Typescript Admin';

module.exports = {
  chainWebpack(confit){
    // TODO
  },
  devServer: {
    // https: true
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: devServerPort,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
        target: `http://localhost:${mockServerPort}/mock-api/v1`,
        ws: true,   // proxy websockets
      }
    },
  },
  lintOnSave: process.env.NODE_ENV === 'develop',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
        path.resolve(__dirname, 'src/styles/_variables.scss'),
      ]
    }
  },
  productionSourceMap: true,
  //publishPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  /* TODO 
  pwa: {
    name,
    workboxPluginMode: 'InjectManifest',
  }*/
};
