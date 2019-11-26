import React from 'react'
import PropTypes from 'prop-types'
import DefaultSelect from 'part:@sanity/components/selects/default'
import DefaultButton from 'part:@sanity/components/buttons/default'
import {blocksToText} from '../../utils'
import styles from './TextToSpeechPreview.css'

const utterableFields = ['title', 'excerpt', 'body']
const speechOptions = {rate: 0.9, pitch: 1, lang: 'en-US'}

let speechSynth = null

if ('speechSynthesis' in window) {
  speechSynth = window.speechSynthesis
}

// eslint-disable-next-line react/require-optimization
class TextToSpeechPreview extends React.Component {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  state = {
    activeField: null
  }

  // Only offer to speak fields which have any data
  fieldsAvailableForUtterance = () => {
    const {displayed} = this.props.document
    return utterableFields.filter(field => !!displayed[field])
  }

  textToSpeak() {
    const {activeField} = this.state
    const {displayed} = this.props.document

    if (typeof displayed[activeField] === 'string') {
      return displayed[activeField]
    }
    // we're in Portable Text now, digging into blocks
    return blocksToText(displayed[activeField])
  }

  handleFieldChange = field => {
    speechSynth.cancel()
    this.setState({activeField: field.title})
  }

  handleStartSpeaking = () => {
    const {pitch, rate, lang} = speechOptions
    // eslint-disable-next-line no-undef
    const utterance = new SpeechSynthesisUtterance(this.textToSpeak())
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.lang = lang
    speechSynth.speak(utterance)
  }

  handleStopSpeaking = () => {
    speechSynth.cancel()
  }

  componentWillMount = () => {
    this.setState({activeField: this.fieldsAvailableForUtterance()[0]})
  }

  componentDidUpdate() {
    if (speechSynth.speaking) {
      this.handleStopSpeaking()
      this.handleStartSpeaking()
    }
  }

  componentWillUnmount() {
    this.handleStopSpeaking()
  }

  render() {
    if (!speechSynth) {
      return (
        <div className={styles.wrapper}>
          Unfortunately your browser does not support the Web Speech API.
        </div>
      )
    }

    const {activeField} = this.state
    const fieldObjects = this.fieldsAvailableForUtterance().map(field => ({title: field}))

    if (fieldObjects) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.selectionWrapper}>
            <DefaultSelect
              items={fieldObjects}
              value={{title: activeField}}
              onChange={this.handleFieldChange}
            />
            <DefaultButton color={'primary'} onClick={() => this.handleStartSpeaking()}>
              Play
            </DefaultButton>
            <DefaultButton color={'danger'} onClick={() => this.handleStopSpeaking()}>
              Stop
            </DefaultButton>
          </div>
          <h3 className={styles.transcriptHeading}>Transcript</h3>
          <p className={styles.transcriptBody}>{this.textToSpeak()}</p>
        </div>
      )
    }

    return (
      <div className={styles.wrapper}>
        The <code>options</code> constant defines which fields can be uttered. Make sure the current
        document has a value for these fields.
      </div>
    )
  }
}

export default TextToSpeechPreview
