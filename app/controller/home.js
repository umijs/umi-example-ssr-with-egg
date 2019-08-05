

const { Controller } = require('egg');
const { join } = require('path');
const ssrPolyfill = require('ssr-polyfill');
const { Helmet } = require('react-helmet');
const restaurants = require('../data/restaurants.json');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.umiServerPath = join(__dirname, '..', 'public', 'umi.server.js');
    this.umiManifest = join(__dirname, '..', 'public', 'ssr-client-mainifest.json');
  }

  // eslint-disable-next-line class-methods-use-this
  nodePolyfill(win) {
    global.window = win;
    global.self = global.window;
    global.document = global.window.document;
    global.location = global.window.loaction;
    global.navigator = global.window.navigator;
    global.Image = global.window.Image;
  }

  async index() {
    const { ctx } = this;
    const { env } = ctx.app.config;
    const originGlobal = global;
    if (env === 'local') {
      delete require.cache[require.resolve(this.umiServerPath)];
    }

    const serverHost = `${ctx.request.protocol}://${ctx.request.host}`;

    const win = ssrPolyfill({
      url: `${serverHost}${ctx.request.url}`,
    });
    this.nodePolyfill(win);

    // eslint-disable-next-line
    const serverRender = require(`${this.umiServerPath}`);
    // eslint-disable-next-line
    const manifest = require(`${this.umiManifest}`);
    const { ReactDOMServer } = serverRender;
    const { rootContainer, matchPath, g_initialData } = await serverRender.default({
      req: {
        url: ctx.request.url,
      }
    });
    const { js, css } = manifest[matchPath] || { js: [], css: [] };

    const ssrContent = ReactDOMServer.renderToString(rootContainer);

    let htmlExtra = {};
    try {
      const helmet = Helmet.renderStatic();
      htmlExtra = {
        title: helmet.title.toString(),
      }
    } catch (e) {}


    // for reset global window, avoid oom
    this.nodePolyfill(originGlobal.window);

    await ctx.render('index.html', {
      ssrContent,
      jsChunks: js.slice(1),
      cssChunks: css,
      g_initialData: encodeURIComponent(JSON.stringify(g_initialData)),
      ...htmlExtra,
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
