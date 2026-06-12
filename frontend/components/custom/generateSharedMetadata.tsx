import { Metadata } from 'next'
import { getStrapiMedia, getPublicURL } from "@/lib/strapi"

type BaseSharedMetadata = {
  title: string
  description: string
  thumbnailUrl: string
  thumbnailAlt: string
}

type HomeMetadata = BaseSharedMetadata & { type: 'home' }

type ContentMetadata = BaseSharedMetadata & {
  type: 'about' | 'blog' | 'work' | 'contact'
  slug?: string
}

type SharedMetadata = HomeMetadata | ContentMetadata

export function generateSharedMetadata(metadata: SharedMetadata): Metadata {
  const publicURL = getPublicURL()
  const { title, description, thumbnailUrl, thumbnailAlt } = metadata
  const fullImageUrl = getStrapiMedia(thumbnailUrl)

  const pageUrl =
    metadata.type === 'home'
      ? publicURL
      : `${publicURL}/${metadata.type}${'slug' in metadata && metadata.slug ? `/${metadata.slug}` : ''}`

  return {
    title,
    description,
    metadataBase: new URL(publicURL),
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Sterling Savariau',
      images: fullImageUrl
        ? [{ url: fullImageUrl, width: 1200, height: 630, alt: thumbnailAlt || title }]
        : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sterlingsavariau',
      title,
      description,
      creator: '@sterlingsavariau',
      images: fullImageUrl
        ? [{ url: fullImageUrl, width: 1200, height: 1200, alt: thumbnailAlt || title }]
        : undefined,
    },
    icons: { apple: '/apple-touch-icon.png' },
  }
}
