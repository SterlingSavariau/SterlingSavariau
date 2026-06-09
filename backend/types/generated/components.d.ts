import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsColumnMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_column_menus';
  info: {
    displayName: 'ColumnMenu';
  };
  attributes: {
    Link: Schema.Attribute.Component<'components.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface ComponentsImage extends Struct.ComponentSchema {
  collectionName: 'components_components_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images', true>;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    Description: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface ComponentsLinkButton extends Struct.ComponentSchema {
  collectionName: 'components_components_link_buttons';
  info: {
    displayName: 'LinkButton';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
    Variant: Schema.Attribute.Enumeration<
      ['Primary', 'Secondary', 'Outline', 'Ghost']
    >;
  };
}

export interface ComponentsLogoText extends Struct.ComponentSchema {
  collectionName: 'components_components_logo_texts';
  info: {
    displayName: 'LogoText';
  };
  attributes: {
    DarkLogo: Schema.Attribute.Media<'images' | 'files'>;
    Logo: Schema.Attribute.Media<'images'>;
    Title: Schema.Attribute.Component<'components.link', false>;
  };
}

export interface ComponentsMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_menus';
  info: {
    displayName: 'Menu';
  };
  attributes: {
    isDropdown: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    MenuLink: Schema.Attribute.Component<'components.menu-link', true>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface ComponentsMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_components_menu_links';
  info: {
    displayName: 'MenuLink';
  };
  attributes: {
    Description: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface ComponentsNavigation extends Struct.ComponentSchema {
  collectionName: 'components_components_navigations';
  info: {
    description: '';
    displayName: 'Navigation';
  };
  attributes: {
    Link: Schema.Attribute.Component<'components.menu', true>;
  };
}

export interface ComponentsRichText extends Struct.ComponentSchema {
  collectionName: 'components_components_rich_texts';
  info: {
    displayName: 'RichText';
    icon: 'pencil';
  };
  attributes: {
    RichText: Schema.Attribute.Blocks;
  };
}

export interface ComponentsShortText extends Struct.ComponentSchema {
  collectionName: 'components_components_short_texts';
  info: {
    displayName: 'ShortText';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

export interface ComponentsSocial extends Struct.ComponentSchema {
  collectionName: 'components_components_socials';
  info: {
    description: '';
    displayName: 'Social';
  };
  attributes: {
    SocialLink: Schema.Attribute.Component<'components.social-link', true>;
  };
}

export interface ComponentsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_components_social_links';
  info: {
    description: '';
    displayName: 'SocialLink';
  };
  attributes: {
    Icon: Schema.Attribute.Enumeration<
      [
        'DISCORD_ICON',
        'FACEBOOK_ICON',
        'GITHUB_ICON',
        'INSTAGRAM_ICON',
        'MEDIUM_ICON',
        'TELEGRAM_ICON',
        'X_ICON',
      ]
    >;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface ContentsPersonalContent extends Struct.ComponentSchema {
  collectionName: 'components_contents_personal_contents';
  info: {
    displayName: 'PersonalContent';
  };
  attributes: {
    Embed: Schema.Attribute.Component<'components.short-text', true>;
  };
}

export interface ContentsProjectContent extends Struct.ComponentSchema {
  collectionName: 'components_contents_project_contents';
  info: {
    displayName: 'ProjectContent';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Link: Schema.Attribute.Component<'components.link', false>;
    Media: Schema.Attribute.Media<'images' | 'videos'>;
    Title: Schema.Attribute.String;
  };
}

export interface ContentsWorkContent extends Struct.ComponentSchema {
  collectionName: 'components_contents_work_contents';
  info: {
    displayName: 'WorkContent';
  };
  attributes: {
    Description: Schema.Attribute.String;
    EndDate: Schema.Attribute.Date;
    Featured: Schema.Attribute.Boolean;
    Icon: Schema.Attribute.Media<'images'>;
    Link: Schema.Attribute.Component<'components.link', false>;
    Position: Schema.Attribute.Enumeration<
      ['FullTime', 'PartTime', 'Contract', 'Internship']
    >;
    RichText: Schema.Attribute.Component<'components.rich-text', true>;
    StartDate: Schema.Attribute.Date;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsAbout extends Struct.ComponentSchema {
  collectionName: 'components_layouts_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Email: Schema.Attribute.Email;
    Image: Schema.Attribute.Media<'images', true>;
    Location: Schema.Attribute.String;
    RichText: Schema.Attribute.Component<'components.rich-text', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsExperience extends Struct.ComponentSchema {
  collectionName: 'components_layouts_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsFooter extends Struct.ComponentSchema {
  collectionName: 'components_layouts_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    LogoText: Schema.Attribute.Component<'components.logo-text', false>;
    Menu: Schema.Attribute.Component<'components.column-menu', true>;
    Social: Schema.Attribute.Component<'components.social', false>;
  };
}

export interface LayoutsNavBar extends Struct.ComponentSchema {
  collectionName: 'components_layouts_nav_bars';
  info: {
    displayName: 'NavBar';
  };
  attributes: {
    LogoText: Schema.Attribute.Component<'components.logo-text', false>;
    Navigation: Schema.Attribute.Component<'components.navigation', false>;
  };
}

export interface LayoutsPersonal extends Struct.ComponentSchema {
  collectionName: 'components_layouts_personals';
  info: {
    displayName: 'Personal';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Personal: Schema.Attribute.Component<'contents.personal-content', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsProject extends Struct.ComponentSchema {
  collectionName: 'components_layouts_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Project: Schema.Attribute.Component<'contents.project-content', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsStack extends Struct.ComponentSchema {
  collectionName: 'components_layouts_stacks';
  info: {
    displayName: 'Stack';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Image: Schema.Attribute.Component<'components.image', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsWriting extends Struct.ComponentSchema {
  collectionName: 'components_layouts_writings';
  info: {
    displayName: 'Writing';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.column-menu': ComponentsColumnMenu;
      'components.image': ComponentsImage;
      'components.link': ComponentsLink;
      'components.link-button': ComponentsLinkButton;
      'components.logo-text': ComponentsLogoText;
      'components.menu': ComponentsMenu;
      'components.menu-link': ComponentsMenuLink;
      'components.navigation': ComponentsNavigation;
      'components.rich-text': ComponentsRichText;
      'components.short-text': ComponentsShortText;
      'components.social': ComponentsSocial;
      'components.social-link': ComponentsSocialLink;
      'contents.personal-content': ContentsPersonalContent;
      'contents.project-content': ContentsProjectContent;
      'contents.work-content': ContentsWorkContent;
      'layouts.about': LayoutsAbout;
      'layouts.experience': LayoutsExperience;
      'layouts.footer': LayoutsFooter;
      'layouts.nav-bar': LayoutsNavBar;
      'layouts.personal': LayoutsPersonal;
      'layouts.project': LayoutsProject;
      'layouts.stack': LayoutsStack;
      'layouts.writing': LayoutsWriting;
    }
  }
}
