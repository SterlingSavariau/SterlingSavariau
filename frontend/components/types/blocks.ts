import { type BlocksContent } from "@strapi/blocks-react-renderer";

export interface RichTextData {
  id?: number;
  documentId?: string;
  RichText: BlocksContent;
}
