import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface StrapiAboutBlock {
  __component: "components.rich-text";
  id: number;
  RichText: BlocksContent;
}

export interface StrapiAbout {
  id: number;
  documentId: string;
  Title: string | null;
  Description: string | null;
  Blocks: StrapiAboutBlock[];
}
