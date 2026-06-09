import type { RichTextData } from "@/components/types/blocks";
import type { StrapiLink } from "@/components/types/global";

interface StrapiWorkMedia {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiWorkContent {
  id: number;
  Title: string | null;
  Description: string | null;
  StartDate: string | null;
  EndDate: string | null;
  Position: "FullTime" | "PartTime" | "Contract" | "Internship" | null;
  Featured: boolean | null;
  Icon: StrapiWorkMedia | null;
  Link: StrapiLink | null;
  RichText: RichTextData[];
}

export interface StrapiWork {
  id: number;
  documentId: string;
  Title: string | null;
  Description: string | null;
  Work: StrapiWorkContent[];
}
