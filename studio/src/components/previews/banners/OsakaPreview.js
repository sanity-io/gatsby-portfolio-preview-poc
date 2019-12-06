import React from 'react'
import IrlPreview from './IrlPreview'
import OsakaBanner from './OsakaBanner'

const nmatrix = [0.21278815803918513,0.03707614625073324,0,0.1390291432274443,-0.0051873293761617485,0.7028355807086992,0,-0.16589889985043424,0,0,1,0,0.04907515670120042,-0.07191344491612205,0,1.0000005838975257]

const OsakaPreview = props => {
  if (!props.document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adWidth={100} adHeight={250} bgSrc="/static/osaka.png">
      <OsakaBanner document={props.document.displayed} />
    </IrlPreview>
  )
}

export default OsakaPreview
