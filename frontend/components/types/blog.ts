import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface StrapiBlogBlock {
  __component: "components.rich-text";
  id: number;
  RichText: BlocksContent;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  Title: string | null;
  Slug: string | null;
  Description: string | null;
  publishedAt: string | null;
  Blocks: StrapiBlogBlock[];
}
