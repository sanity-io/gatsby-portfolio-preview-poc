export default {
  name: 'urlWithMetadata',
  title: 'URL with metadata',
  type: 'object',
  inputComponent: require('./UrlMetadataInput'),
  fieldsets: [
    {
      name: 'meta',
      title: 'Link metadata',
      options: {collapsable: true}
    }
  ],
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    },
    {
      title: 'Resolved URL',
      name: 'resolvedUrl',
      type: 'url'
    },
    {
      title: 'Crawled at',
      name: 'crawledAt',
      type: 'datetime'
    },

    {
      name: 'meta',
      title: 'Metadata',
      fieldset: 'meta',
      type: 'meta'
    },
    {
      name: 'openGraph',
      title: 'OpenGraph',
      fieldset: 'meta',
      type: 'openGraph'
    }
  ]
}
