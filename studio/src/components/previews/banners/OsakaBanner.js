import React from 'react'
import PropTypes from 'prop-types'

import sanityClient from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import styles from './OsakaBanner.css'

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

class OsakaBanner extends React.PureComponent {
  static propTypes = {
    tagline: PropTypes.string
  }

  static defaultProps = {
    tagline: ''
  }

  render() {
    const {tagline, illustration} = this.props.document
    const imageUrl = urlFor(illustration)
      .width(500)
      .url()

    return (
      <div className={styles.banner}>
        <div className={styles.imageWrapper}>
          <img className={styles.bannerImage} src={imageUrl} />
        </div>
        <div className={styles.taglineWrapper}>
          <span className={styles.tagline}>{tagline}</span>
        </div>
      </div>
    )
  }
}

export default OsakaBanner
