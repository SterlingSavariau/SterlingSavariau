import type { Core } from '@strapi/strapi';

const populate = {
  Work: {
    populate: {
      Icon: { fields: ['url', 'alternativeText', 'width', 'height'] },
      Link: true,
      RichText: true,
    },
  },
};

export default (config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    ctx.query.populate = populate;
    strapi.log.info('In work-populate middleware.');
    await next();
  };
};
