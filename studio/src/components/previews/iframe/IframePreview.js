/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './IframePreview.css'

const gatsbyUrl = window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://gatsby-portfolio-preview-poc-1812761745.gtsb.io'

export const assembleProjectUrl = doc => {
  return `${gatsbyUrl}/project/${doc.slug.current}`
}

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    document: null
  }

  render () {
    const {displayed} = this.props.document
    if (!displayed) {
      return <div>there is no document to preview</div>
    }

    const url = assembleProjectUrl(displayed)

    if (!url) {
      return <div>Hmm. Having problems constructing the web front-end URL</div>
    }

    return (
      <div className={styles.componentWrapper}>
        <div className={styles.iframeContainer}>
          <iframe src={url} frameBorder={'0'} />
        </div>
      </div>
    )
  }
}

export default IframePreview
