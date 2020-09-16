import React from 'react'
import {MdAnnouncement} from 'react-icons/lib/md'

import {DiffAnnotation} from '@sanity/field/diff'

function ColorDiff ({diff}) {
  const {fromValue, toValue, action} = diff
  console.log(diff)
  // In certain cases the diff component will be used to render the value, even
  // if there are no changes to the actual _value_. For instance, when an item
  // has been moved within the array, but the actual value did not change.
  if (!fromValue) {
    return <div
      style={{
        width: '50%',
        height: '200px',
        backgroundColor: toValue?.hex
      }} />
  }

  // If we have both a "from" and "to" value, the value changed
  // "from" and "to" can also be read as "previous" and "next"

  return (
    <DiffAnnotation diff={diff}>
      <div style={{
        display: 'flex'
      }}>
        <div
          style={{
            minWidth: '45%',
            height: '200px',
            backgroundColor: fromValue?.hex
          }} />
        <div
          style={{
            minWidth: '45%',
            height: '200px',
            backgroundColor: toValue?.hex
          }} />

      </div>
    </DiffAnnotation>
  )
}

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
      name: 'brandColor',
      type: 'color',
      diffComponent: ColorDiff
    },
    {
      name: 'illustration',
      type: 'figure',
      title: 'Illustration'
    }
  ]
}
