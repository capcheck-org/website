import type { StrapiApp } from '@strapi/strapi/admin';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    locales: [],
    head: {
      favicon: favicon,
    },
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to CapCheck',
        'Auth.form.welcome.subtitle': 'Log in to your account',
        'app.components.LeftMenu.navbrand.title': 'CapCheck',
        'app.components.LeftMenu.navbrand.workplace': 'Admin',
      },
    },
  },
  bootstrap(app: StrapiApp) {},
};
