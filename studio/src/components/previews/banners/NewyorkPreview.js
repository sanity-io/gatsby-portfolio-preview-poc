import React from 'react'
import IrlPreview from './IrlPreview'
import NewyorkBanner from './NewyorkBanner'

const newyorkStyles = {
  transform:
    'rotate(0deg) scale(1) matrix3d(0.99079, 0.265395, 0, 0.000544644, -0.0248899, 0.819525, 0, -0.000298636, 0, 0, 1, 0, 6.92207, 34.4549, 0, 1)',
  top: '92px',
  left: '214px',
  width: '369px',
  height: '248px'
}
const NewyorkPreview = props => {
  if (!props.document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview initialStyles={newyorkStyles} backgroundImage="/static/newyork.png">
      <NewyorkBanner document={props.document.displayed} />
    </IrlPreview>
  )
}

export default NewyorkPreview
