export default {
  name: 'openGraph',
  title: 'OpenGraph',
  fieldset: 'meta',
  type: 'object',
  fields: [
    // Basic metadata
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string'
    },
    {
      title: 'Site name',
      name: 'siteName',
      type: 'string'
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    },

    // Image
    {
      title: 'Image URL',
      name: 'image',
      type: 'string'
    },
    {
      title: 'Image description',
      name: 'imageAlt',
      type: 'string'
    },
    {
      title: 'Image Secure URL',
      name: 'imageSecureUrl',
      type: 'url'
    },
    {
      title: 'Image type',
      name: 'imageType',
      type: 'string'
    },
    {
      title: 'Image height',
      name: 'imageHeight',
      type: 'number'
    },
    {
      title: 'Image width',
      name: 'imageWidth',
      type: 'number'
    },

    // Audio
    {
      title: 'Audio URL',
      name: 'audio',
      type: 'url'
    },
    {
      title: 'Audio Secure URL',
      name: 'audioSecureUrl',
      type: 'url'
    },
    {
      title: 'Audio type',
      name: 'audioType',
      type: 'string'
    },
    {
      title: 'Determiner',
      name: 'determiner',
      type: 'string',
      options: {
        list: ['', 'a', 'an', 'the', 'auto'].map(value => ({value, title: value}))
      }
    },
    {
      title: 'Locale',
      name: 'locale',
      type: 'string'
    },

    // Video
    {
      title: 'Video URL',
      name: 'video',
      type: 'url'
    },
    {
      title: 'Video Secure URL',
      name: 'videoSecureUrl',
      type: 'url'
    },
    {
      title: 'Video type',
      name: 'videoType',
      type: 'string'
    },
    {
      title: 'Video height',
      name: 'videoHeight',
      type: 'number'
    },
    {
      title: 'Video width',
      name: 'videoWidth',
      type: 'number'
    }
  ]
}
