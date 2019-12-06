export const websiteUrl = window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://gatsby-portfolio-preview-poc-1812761745.gtsb.io'

export function assemblePageUrl ({slug = {}}) {
  return `${websiteUrl}/project/${slug.current}`
}

const defaults = {nonTextBehavior: 'remove'}

export function toPlainText (blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
