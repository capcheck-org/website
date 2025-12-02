/**
 * cla-submission router
 *
 * Public routes for CLA submissions. These routes are configured with auth: false
 * to allow unauthenticated access, but you must ALSO enable the permissions in the
 * Strapi Admin Panel: Settings → Users & Permissions Plugin → Roles → Public
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cla-submission.cla-submission', {
  config: {
    create: {
      auth: false,
    },
    find: {
      auth: false,
    },
  },
});
