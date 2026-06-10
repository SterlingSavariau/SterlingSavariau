export type StrapiSocialLink = {
  id: number;
  Text: string;
  Url: string;
  isExternal: boolean;
  Icon: string | null;
};

export type StrapiConnect = {
  Email: string | null;
  Social: StrapiSocialLink[];
};
