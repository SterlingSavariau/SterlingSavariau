import type { Core } from '@strapi/strapi';

const populate = {
  Blocks: {
    on: {
      'layouts.about': {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'width', 'height'],
          },
          RichText: true,
        },
      },
      'layouts.experience': {
        populate: '*',
      },
      'layouts.project': {
        populate: {
          Project: {
            populate: {
              Media: {
                fields: ['url', 'mime', 'alternativeText', 'width', 'height'],
              },
              Link: true,
            },
          },
        },
      },
      'layouts.stack': {
        populate: {
          Image: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'width', 'height'],
              },
            },
          },
        },
      },
      'layouts.writing': {
        populate: '*',
      },
      'layouts.personal': {
        populate: {
          Personal: {
            populate: {
              Embed: { populate: '*' },
            },
          },
        },
      },
    },
  },
};

export default (config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    ctx.query.populate = populate;
    strapi.log.info('In homepage-populate middleware.');
    await next();
  };
};
