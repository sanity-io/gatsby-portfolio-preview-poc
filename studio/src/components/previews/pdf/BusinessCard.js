/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'part:@sanity/components/loading/spinner'
import sanityClient from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import styles from './BusinessCard.css'

const fileType = 'png'
const cardServiceHost = 'https://json-to-pdf.sanity-io.now.sh'
// const cardServiceHost = 'http://localhost:3000'
const cardServiceBaseUrl = `${cardServiceHost}/api/business-card`

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

const arrayBufferToBase64 = arrbuf => {
  const u8bit = new Uint8Array(arrbuf)
  return btoa(u8bit.reduce((data, byte) => data + String.fromCharCode(byte), ''))
}

class BusinessCard extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  state = {
    businessCardImage: null,
    cardServiceUrls: null,
    isFlipped: false,
    error: null
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps, prevState) {
    const oldDoc = JSON.stringify(prevProps.document.displayed)
    const currentDoc = JSON.stringify(this.props.document.displayed)
    if (oldDoc !== currentDoc) {
      this.fetchData()
    }
  }

  assembleCardServiceUrls = () => {
    const {displayed} = this.props.document
    return sanityClient.fetch('*[_id == "siteSettings"][0]{...,logo{...,asset->}}').then(siteConfig => {
      if (siteConfig.logo) {
        const siteLogoImageUrl = urlFor(siteConfig.logo)
          .width(200).url()
        debugger
        displayed.imageUrl = siteLogoImageUrl
      }
      const stringifiedDoc = JSON.stringify(displayed)
      return {
        png: `${cardServiceBaseUrl}?fileType=png&document=${stringifiedDoc}`,
        pdf: `${cardServiceBaseUrl}?fileType=pdf&document=${stringifiedDoc}`
      }
    })
  }

  fetchData = async () => {
    const cardServiceUrls = await this.assembleCardServiceUrls()
    try {
      const response = await fetch(cardServiceUrls.png)
      const arrayBuffer = await response.arrayBuffer()
      const base64 = arrayBufferToBase64(arrayBuffer)
      this.setState({
        businessCardImage: `data:image/${fileType};base64,${base64}`,
        cardServiceUrls
      })
    } catch (error) {
      this.setState({error})
    }
  }

  handleCardFlip = () => {
    const flipped = this.state.isFlipped
    this.setState({
      isFlipped: !flipped
    })
  }

  render () {
    const {displayed} = this.props.document
    const {businessCardImage, cardServiceUrls, isFlipped, error} = this.state
    const {name} = displayed

    if (error) {
      return (
        <div>
          <p>Ooops. Got an error while fetching preview :/</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    }
    if (!businessCardImage) {
      return <Spinner center message='Fetching business card' />
    }

    return (
      <div className={styles.root}>
        <h3>{`Business card for: ${name}`}</h3>
        <div className={styles.cardScene} onClick={this.handleCardFlip}>
          <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
            <div className={styles.cardFace}>
              <img src={businessCardImage} />
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`} />
          </div>
        </div>
        <div className={styles.downloadLink}>
          <a href={cardServiceUrls.pdf}>Download PDF</a>
        </div>
      </div>
    )
  }
}

export default BusinessCard
