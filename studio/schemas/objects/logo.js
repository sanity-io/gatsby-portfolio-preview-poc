export default {
  title: 'Brand logo',
  description:
    'Best choice is to use an SVG where the color are set with currentColor',
  name: 'logo',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    }
  ]
}
