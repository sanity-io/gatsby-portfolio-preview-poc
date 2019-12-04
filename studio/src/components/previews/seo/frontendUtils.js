export const websiteUrl = 'https://preview-nextjs-landing-pages.netlify.com'

export function assemblePageUrl(route) {
  return `${websiteUrl}/${route.slug.current}`
}
