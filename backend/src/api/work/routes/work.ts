/**
 * work router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::work.work', {
  config: {
    find: {
      middlewares: ['api::work.work-populate'],
    },
  },
});
