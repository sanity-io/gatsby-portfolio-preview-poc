import {MdAnnouncement} from 'react-icons/lib/md'

export default {
  name: 'ad',
  type: 'document',
  title: 'Ad',
  icon: MdAnnouncement,
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'tagline',
      type: 'text',
      title: 'Tagline'
    },
    {
      name: 'illustration',
      type: 'figure',
      title: 'Illustration'
    }
  ]
}
