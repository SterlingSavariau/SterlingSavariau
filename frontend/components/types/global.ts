export interface StrapiMedia {
  url: string;
  alternativeText: string | null;
}

export interface StrapiLink {
  id: number;
  Text: string | null;
  Description: string | null;
  Url: string | null;
  isExternal: boolean;
}

interface StrapiMenuLink {
  id: number;
  Text: string | null;
  Url: string | null;
  Description: string | null;
  isExternal: boolean;
}

interface StrapiMenu {
  id: number;
  Text: string | null;
  Url: string | null;
  isDropdown: boolean;
  isExternal: boolean;
  MenuLink: StrapiMenuLink[];
}

interface StrapiNavigation {
  id: number;
  Link: StrapiMenu[];
}

interface StrapiLogoText {
  id: number;
  Logo: StrapiMedia | null;
  DarkLogo: StrapiMedia | null;
  Title: StrapiLink | null;
}

interface StrapiNavBar {
  id: number;
  LogoText: StrapiLogoText | null;
  Navigation: StrapiNavigation | null;
}

interface StrapiSocialLink {
  id: number;
  Text: string | null;
  Url: string | null;
  isExternal: boolean;
  Icon: string | null;
}

interface StrapiSocial {
  id: number;
  SocialLink: StrapiSocialLink[];
}

interface StrapiColumnMenu {
  id: number;
  Title: string | null;
  Link: StrapiLink[];
}

interface StrapiFooter {
  id: number;
  LogoText: StrapiLogoText | null;
  Social: StrapiSocial | null;
  Menu: StrapiColumnMenu[];
}

export interface StrapiGlobal {
  id: number;
  documentId: string;
  Title: string | null;
  Description: string | null;
  Icon: StrapiMedia | null;
  Logo: StrapiMedia | null;
  NavBar: StrapiNavBar | null;
  Footer: StrapiFooter | null;
}
