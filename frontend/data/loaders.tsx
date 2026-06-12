import { getStrapiURL } from "@/lib/strapi";
import type { StrapiGlobal } from "@/components/types/global";
import type { StrapiHomepage } from "@/components/types/homepage";
import type { StrapiWork } from "@/components/types/work";
import type { StrapiAbout } from "@/components/types/about";
import type { StrapiBlogPost } from "@/components/types/blog";
import type { StrapiConnect } from "@/components/types/connect";

const baseUrl = getStrapiURL();

async function fetchData(url: string, tags?: string[]) {
  try {
    const options: RequestInit = { cache: 'no-store', ...(tags ? { next: { tags } } : {}) };
    const response = await fetch(url, options);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function getGlobal(): Promise<StrapiGlobal | null> {
  const url = new URL("/api/global", baseUrl);
  const data = await fetchData(url.href, ["global"]);
  return (data?.data ?? null) as StrapiGlobal | null;
}

export async function getHomepage(): Promise<StrapiHomepage | null> {
  const url = new URL("/api/homepage", baseUrl);
  const data = await fetchData(url.href, ["homepage"]);
  return (data?.data ?? null) as StrapiHomepage | null;
}

export async function getWork(): Promise<StrapiWork | null> {
  const url = new URL("/api/work", baseUrl);
  const data = await fetchData(url.href, ["work"]);
  return (data?.data ?? null) as StrapiWork | null;
}

export async function getAbout(): Promise<StrapiAbout | null> {
  const url = new URL("/api/about?populate=*", baseUrl);
  const data = await fetchData(url.href, ["about"]);
  return (data?.data ?? null) as StrapiAbout | null;
}

export async function getBlogPosts(limit?: number): Promise<StrapiBlogPost[]> {
  const params = limit
    ? `sort[0]=createdAt:desc&pagination[limit]=${limit}`
    : "sort[0]=createdAt:desc";
  const url = new URL(`/api/blogs?${params}`, baseUrl);
  const data = await fetchData(url.href, ["blogs"]);
  return (data?.data ?? []) as StrapiBlogPost[];
}

export async function getBlogPost(slug: string): Promise<StrapiBlogPost | null> {
  const url = new URL(
    `/api/blogs?filters[Slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    baseUrl
  );
  const data = await fetchData(url.href, ["blogs"]);
  const posts = data?.data ?? [];
  return (posts[0] ?? null) as StrapiBlogPost | null;
}

export async function getGlobalMetadata(): Promise<StrapiGlobal | null> {
  const url = new URL("/api/global?populate[Icon]=true&populate[Logo]=true", baseUrl);
  const data = await fetchData(url.href, ["global"]);
  return (data?.data ?? null) as StrapiGlobal | null;
}

export async function getConnect(): Promise<StrapiConnect | null> {
  const url = new URL("/api/connect?populate=Social", baseUrl);
  const data = await fetchData(url.href, ["connect"]);
  return (data?.data ?? null) as StrapiConnect | null;
}
