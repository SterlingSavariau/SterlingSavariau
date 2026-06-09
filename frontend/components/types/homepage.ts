import type { RichTextData } from "@/components/types/blocks";
import type { StrapiLink } from "@/components/types/global";

interface StrapiAboutImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiAboutBlock {
  __component: "layouts.about";
  id: number;
  Title: string | null;
  Description: string | null;
  Email: string | null;
  Location: string | null;
  Image: StrapiAboutImage[];
  RichText: RichTextData[];
}

export interface StrapiProjectMedia {
  id: number;
  url: string;
  mime: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

export interface StrapiProjectContent {
  id: number;
  Title: string | null;
  Description: string | null;
  Media: StrapiProjectMedia | null;
  Link: StrapiLink | null;
}

export interface StrapiProjectBlock {
  __component: "layouts.project";
  id: number;
  Title: string | null;
  Description: string | null;
  Project: StrapiProjectContent[];
}

interface StrapiStackImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

export interface StrapiStackImageEntry {
  id: number;
  Image: StrapiStackImage[];
}

export interface StrapiStackBlock {
  __component: "layouts.stack";
  id: number;
  Title: string | null;
  Description: string | null;
  Image: StrapiStackImageEntry[];
}

export interface StrapiExperienceBlock {
  __component: "layouts.experience";
  id: number;
  Title: string | null;
  Description: string | null;
}

export interface StrapiWritingBlock {
  __component: "layouts.writing";
  id: number;
  Title: string | null;
  Description: string | null;
}

export interface StrapiEmbedEntry {
  id: number;
  Text: string | null;
}

export interface StrapiPersonalContent {
  id: number;
  Embed: StrapiEmbedEntry[];
}

export interface StrapiPersonalBlock {
  __component: "layouts.personal";
  id: number;
  Title: string | null;
  Description: string | null;
  Personal: StrapiPersonalContent[];
}

export type StrapiHomeBlock = StrapiAboutBlock | StrapiExperienceBlock | StrapiProjectBlock | StrapiStackBlock | StrapiWritingBlock | StrapiPersonalBlock;

export interface StrapiHomepage {
  id: number;
  documentId: string;
  Title: string | null;
  Description: string | null;
  Blocks: StrapiHomeBlock[];
}
