'use strict';

const { Controller } = require('egg');
const { join } = require('path');
const  restaurants = require('../data/restaurants.json');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.umiServerPath = join(__dirname, '..', 'public', 'umi.server.js');
  }

  async index() {
    const { ctx } = this;
    const { env } = ctx.app.config;
    if (env === 'local') {
      delete require.cache[require.resolve(this.umiServerPath)];
    }
    global.window = {};
    global.SERVER_HOST = `${ctx.request.protocol}://${ctx.request.host}`;

    // eslint-disable-next-line
    const serverRender = require(`${this.umiServerPath}`);
    const { ReactDOMServer } = serverRender;

    const { rootContainer } = await serverRender.default(ctx);

    const ssrContent = ReactDOMServer.renderToString(rootContainer);

    await ctx.render('index.html', {
      ssrContent,
    });
  }

  async api() {
    const ctx = this.ctx;
    if (ctx.path.indexOf('restaurants') > -1 ) {
      ctx.status = 200;
      ctx.body = restaurants;
      return false;
    }

    const url = 'https://h5.ele.me' + ctx.path.replace(/^\/api/, '') + '?' + ctx.querystring;

    console.log(url);
    const res = await this.ctx.curl(url, {
      method: this.ctx.method,
    });
    ctx.body = res.data;
    ctx.status = res.status;
  }
}

module.exports = HomeController;
