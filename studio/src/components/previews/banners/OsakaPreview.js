import React from 'react'
import IrlPreview from './IrlPreview'
import OsakaBanner from './OsakaBanner'

const osakaStyles = {
  width: '187px',
  height: '384px',
  left: '285px',
  top: '25px',
  transform:
    'scale(1, 1) matrix3d(0.684027, 0.101256, 0, 0.000730198, 0.010567, 0.835693, 0, -0.000350746, 0, 0, 1, 0, -28.4262, -23.8987, 0, 1)'
}

const OsakaPreview = props => {
  if (!props.document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview initialStyles={osakaStyles} backgroundImage="/static/osaka.png">
      <OsakaBanner document={props.document.displayed} />
    </IrlPreview>
  )
}

export default OsakaPreview
