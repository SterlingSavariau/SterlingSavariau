"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { RichTextData } from "@/components/types/blocks";
import { strapiRenderers, strapiModifiers } from "@/components/custom/rich-text-renderers";

export function RichTextBlock({ data }: { readonly data: RichTextData }) {
  if (!Array.isArray(data?.RichText) || data.RichText.length === 0) return null;
  return (
    <article className="richtext">
      <BlocksRenderer
        content={data.RichText}
        blocks={strapiRenderers}
        modifiers={strapiModifiers}
      />
    </article>
  );
}
