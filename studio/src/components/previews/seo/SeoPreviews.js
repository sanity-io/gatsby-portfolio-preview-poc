/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import sanityClient from 'part:@sanity/base/client'
import Spinner from 'part:@sanity/components/loading/spinner'
import GoogleSearchResult from './GoogleSearchResult'
import TwitterCard from './TwitterCard'
import FacebookShare from './FacebookShare'

class SeoPreviews extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  state = {
    matchingPage: null,
    isLoading: true
  }

  fetchPage(documentId) {
    sanityClient
      .fetch(`*[_id == $documentId][0]`, {
        documentId
      })
      .then(matchingPage => this.setState({matchingPage, isLoading: false}))
      .catch(error => this.setState({error, isLoading: false}))
  }

  componentDidMount() {
    const {displayed} = this.props.document
    this.fetchPage(displayed.page._ref)
  }

  render() {
    const route = this.props.document.displayed
    const {matchingPage, isLoading, error} = this.state

    if (error) {
      return (
        <div>
          <p>Ooops. Got an error while fetching preview :/</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    }

    if (isLoading || !matchingPage) {
      return <Spinner center message="Loading..." />
    }

    return (
      <>
        <TwitterCard document={matchingPage} route={route} />
        <FacebookShare document={matchingPage} />
        <GoogleSearchResult document={matchingPage} route={route} />
      </>
    )
  }
}

export default SeoPreviews
