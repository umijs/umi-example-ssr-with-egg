

const { Controller } = require('egg');
const { join } = require('path');
const server = require('umi-server');
const { Helmet } = require('react-helmet');
const restaurants = require('../data/restaurants.json');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    const { url: host, publicPath } = ctx.app.config.assets;
    this.publicPath = publicPath;
    console.log('ctx.app.config.assets', ctx.app.config.assets);
    this.root = join(__dirname, '..', 'public');
    this.umiServerPath = join(this.root, 'umi.server.js');
    this.render = server({
      root: join(__dirname, '..', 'public'),
      host,
      publicPath,
      polyfill: {
        host: 'http://localhost:7001'
      },
   })
  }

  async index() {
    const { ctx } = this;
    const { env } = ctx.app.config;

    if (env === 'local') {
      delete require.cache[require.resolve(this.umiServerPath)];
    }

    const { ssrHtml } = await this.render({
      req: {
        url: ctx.request.url,
      }
    });

    ctx.body = await ctx.renderString(ssrHtml, {
      publicPath: this.publicPath,
    });
  }

  async api() {
    const { ctx } = this;
    if (ctx.path.indexOf('restaurants') > -1) {
      ctx.status = 200;
      ctx.body = restaurants;
      return false;
    }

    const url = `https://h5.ele.me${ctx.path.replace(/^\/api/, '')}?${ctx.querystring}`;

    console.log(url);
    const res = await this.ctx.curl(url, {
      method: this.ctx.method,
    });
    ctx.body = res.data;
    ctx.status = res.status;
  }
}

module.exports = HomeController;
