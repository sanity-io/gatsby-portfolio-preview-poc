import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

import IframePreview from './components/previews/iframe/IframePreview'
import ColorblindPreview from './components/previews/a11y/colorblind-filter/ColorblindPreview'
import TextToSpeechPreview from './components/previews/a11y/text-to-speech/TextToSpeechPreview'

import NewyorkPreview from './components/previews/banners/NewyorkPreview'
import OsakaPreview from './components/previews/banners/OsakaPreview'
import BusinessCard from './components/previews/pdf/BusinessCard'
import SeoPreview from './components/previews/seo/SeoPreviews'

const hiddenDocTypes = listItem =>
  !['category', 'person', 'sampleProject', 'siteSettings', 'ad'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Projects')
        .schemaType('sampleProject')
        .child(
          S.documentTypeList('sampleProject')
            .title('Projects')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('sampleProject')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(IframePreview)
                    .icon(EyeIcon)
                    .title('Web Preview'),
                  S.view
                    .component(ColorblindPreview)
                    .icon(EyeIcon)
                    .title('Colorblind'),
                  S.view
                    .component(TextToSpeechPreview)
                    .icon(EyeIcon)
                    .title('Text to speech'),
                  S.view
                    .component(SeoPreview)
                    .icon(EyeIcon)
                    .title('SEO Preview')
                ])

            )
        ),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(
          S.documentTypeList('person')
            .title('People')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('person')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(BusinessCard)
                    .icon(EyeIcon)
                    .title('Business Card')
                ])
            )
        ),
      S.listItem()
        .title('Ads')
        .schemaType('ad')
        .child(
          S.documentTypeList('ad')
            .title('Ads')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('ad')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(NewyorkPreview)
                    .icon(EyeIcon)
                    .id('newyork')
                    .title('New York'),
                  S.view
                    .component(OsakaPreview)
                    .icon(EyeIcon)
                    .id('osaka')
                    .title('Osaka')
                ])
            )
        ),
      /* S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')), */
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
