/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import DefaultSelect from 'part:@sanity/components/selects/default'
import filters from './filters.svg'
import styles from './ColorblindPreview.css'

const FILTER_ITEMS = [
  {title: 'Protanopia', value: 'protanopia'},
  {title: 'Deuteranopia', value: 'deuteranopia'},
  {title: 'Tritanopia', value: 'tritanopia'},
  {title: 'Achromatopsia', value: 'achromatopsia'},
  {title: 'Protanomaly', value: 'protanomaly'},
  {title: 'Deuteranomaly', value: 'deuteranomaly'},
  {title: 'Tritanomaly', value: 'tritanomaly'},
  {title: 'Achromatomaly', value: 'achromatomaly'},
  {title: 'No filter', value: null}
]

const gatsbyUrl = window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://gatsby-portfolio-preview-poc-4165823465.gtsb.io'

export const assembleProjectUrl = doc => {
  return `${gatsbyUrl}/project/${doc.slug.current}`
}

class ColorblindPreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    document: null
  }

  state = {
    activeFilter: FILTER_ITEMS[0]
  }

  handleFilterChange = filter => {
    this.setState({activeFilter: filter})
  }

  render () {
    const {displayed} = this.props.document
    if (!displayed) {
      return <div>there is no document to preview</div>
    }

    const {activeFilter} = this.state
    const filterStyle = {
      filter: activeFilter.value ? `url('${filters}#${activeFilter.value}')` : 'none'
    }

    const url = assembleProjectUrl(displayed)

    if (!url) {
      return <div>Hmm. Having problems constructing the web front-end URL</div>
    }

    return (
      <div className={styles.componentWrapper}>
        <div className={styles.filterDropdown}>
          <label className={styles.dropdownLabel} htmlFor={'select-filter'}>
            Select a filter:
          </label>
          <DefaultSelect
            items={FILTER_ITEMS}
            value={activeFilter}
            onChange={value => this.handleFilterChange(value)}
          />
        </div>
        <div className={styles.iframeContainer} style={filterStyle}>
          <iframe src={url} frameBorder={'0'} />
        </div>
      </div>
    )
  }
}

export default ColorblindPreview
