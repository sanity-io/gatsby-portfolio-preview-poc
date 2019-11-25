/* eslint-disable import/prefer-default-export */
const defaultBehaviors = {nonTextBehavior: 'remove'}

export const netlifyUrl = 'https://gatsby-portfolio-preview-poc.netlify.com/'
export const gatsbyUrl = 'https://gatsby-portfolio-preview-poc-1812761745.gtsb.io'

export const assemblePageUrl = route => {
  return `${netlifyUrl}/${route.slug.current}`
}

// export function assemblePostUrl(doc) {
//   const [year, month] = doc.publishedAt.split('T')[0].split('-')
//   return `${netlifyUrl}/blog/${year}/${month}/${doc.slug.current}`
// }

export const assembleProjectUrl = doc => {
  return `${gatsbyUrl}/project/${doc.slug.current}`
}

export const blocksToText = (blocks, opts = {}) => {
  const options = Object.assign({}, defaultBehaviors, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
