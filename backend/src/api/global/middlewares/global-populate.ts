import type { Core } from '@strapi/strapi';

const populate = {
  NavBar: {
    populate: {
      LogoText: {
        populate: {
          Logo: {
            fields: ['url', 'alternativeText'],
          },
          DarkLogo: {
            fields: ['url', 'alternativeText'],
          },
          Title: true,
        },
      },
      Navigation: {
        populate: {
          Link: {
            populate: {
              MenuLink: true,
            },
          },
        },
      },
    },
  },
  Footer: {
    populate: {
      LogoText: {
        populate: {
          Logo: {
            fields: ['url', 'alternativeText'],
          },
          DarkLogo: {
            fields: ['url', 'alternativeText'],
          },
          Title: true,
        },
      },
      Social: {
        populate: {
          SocialLink: true,
        },
      },
      Menu: {
        populate: {
          Link: true,
        },
      },
    },
  },
  Icon: {
    fields: ['url', 'alternativeText'],
  },
  Logo: {
    fields: ['url', 'alternativeText'],
  },
};

export default (config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    ctx.query.populate = populate;
    strapi.log.info('In global-populate middleware.');
    await next();
  };
};
