import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {FormBuilderInput, PatchEvent, patches} from 'part:@sanity/form-builder'
import InInputButton from 'part:@sanity/components/buttons/in-input'
import inInputStyles from 'part:@sanity/components/buttons/in-input-style'
import TextInput from 'part:@sanity/components/textinputs/default'
import FormField from 'part:@sanity/components/formfields/default'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import client from 'part:@sanity/base/client'
import fieldsetStyles from './fieldsetStyles.css'

const metaFieldNames = ['meta', 'openGraph']
const count = obj => Object.keys(obj || {}).length
const {set, unset} = patches

class UrlMetadataInput extends PureComponent {
  hasEdited = false
  state = {loading: false}

  handleUrlChange = evt => {
    this.hasEdited = true

    const {onChange, type} = this.props
    const value = evt.target.value

    if (!value) {
      onChange(PatchEvent.from(unset()))
      return
    }

    onChange(PatchEvent.from(unset(), set({_type: type.name, url: value.trim()})))
  }

  setFirstField = el => {
    this._firstField = el
  }

  focus() {
    if (this._firstField) {
      this._firstField.focus()
    }
  }

  handleFocus = () => {
    this.hasEdited = false
  }

  handleBlur = () => {
    if (!this.hasEdited || !this.props.value.url) {
      return
    }

    this.fetchMetadata(this.props.value.url)
  }

  fetchMetadata(url) {
    this.setState({loading: true})

    if (this.request) {
      this.request.unsubscribe()
    }

    const options = {
      url: '/addons/crown/resolve',
      query: {url},
      json: true
    }

    this.request = client.observable
      .request(options)
      .subscribe(res => this.handleReceiveMetadata(res, url), this.handleFetchError)
  }

  handleUrlKeyUp = evt => {
    if (evt.key === 'Enter') {
      this.fetchMetadata(evt.target.value)
    }
  }

  handleRefresh = () => {
    if (!this.props.value || !this.props.value.url) {
      return
    }

    this.fetchMetadata(this.props.value.url)
  }

  handleReceiveMetadata(body, url) {
    this.setState({loading: false})

    const {onChange, type} = this.props
    const {statusCode, resolvedUrl} = body

    if (!statusCode || statusCode !== 200) {
      // @todo Show some sort of error dialog
      return
    }

    const initial = {
      _type: type.name,
      crawledAt: new Date().toISOString(),
      url,
      resolvedUrl
    }

    // Reduce the returned fields to only schema-defined fields,
    // ensure that numbers are actual numbers (not strings)
    const doc = metaFieldNames.reduce((data, fieldName) => {
      const metaField = type.fields.find(item => item.name === fieldName)
      const metaValue = body[fieldName]

      if (!metaValue) {
        return data
      }

      data[fieldName] = metaField.type.fields.reduce((obj, field) => {
        let fieldValue = metaValue[field.name]
        if (!fieldValue) {
          return obj
        }

        if (field.type.jsonType === 'number') {
          fieldValue = Number(fieldValue)
        }

        obj[field.name] = fieldValue
        return obj
      }, {})

      return data
    }, initial)

    onChange(PatchEvent.from(set(doc)))
  }

  // @todo Provide fetch error as validation error?
  handleFetchError(err) {
    // eslint-disable-next-line
    console.log('Error fetching metadata: ', err)
  }

  handleFieldChange = (field, patchEvent) => {
    const {onChange} = this.props
    onChange(patchEvent.prefixAll(field.name))
  }

  render() {
    const {loading} = this.state
    const {value, type, level, onFocus, onBlur, focusPath, markers} = this.props
    const resolvedUrl = value && value.resolvedUrl

    const metaFields = type.fields.filter(field => metaFieldNames.includes(field.name))
    const legends =
      resolvedUrl &&
      metaFieldNames.reduce((target, fieldName) => {
        const numItems = count(value[fieldName])
        const base = metaFields.find(field => field.name === fieldName).type.title
        const items = numItems > 1 ? 'items' : 'item'
        target[fieldName] = `${base} (${numItems} ${items})`
        return target
      }, {})

    return (
      <FormField label={type.title} description={type.description}>
        <div className={inInputStyles.wrapper}>
          <TextInput
            ref={this.setFirstField}
            type="url"
            value={value === undefined ? '' : value.url}
            onKeyUp={this.handleUrlKeyUp}
            onChange={this.handleUrlChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <div className={inInputStyles.container}>
            <InInputButton onClick={this.handleRefresh} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </InInputButton>
          </div>
        </div>

        {resolvedUrl &&
          metaFields.map(field => (
            <Fieldset
              key={field.name}
              legend={legends[field.name]}
              style={fieldsetStyles}
              isCollapsible
            >
              <FormBuilderInput
                value={value && value[field.name]}
                type={field.type}
                onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
                path={[field.name]}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={field.type.readOnly}
                focusPath={focusPath}
                markers={markers.filter(marker => marker.path[0] === field.name)}
                level={level}
                ref={this.setInput}
              />
            </Fieldset>
          ))}
      </FormField>
    )
  }
}

UrlMetadataInput.defaultProps = {
  value: undefined,
  markers: []
}

UrlMetadataInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  type: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  value: PropTypes.shape({
    url: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    openGraph: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    })
  }),
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  focusPath: PropTypes.array,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired
    })
  )
}

module.exports = UrlMetadataInput
