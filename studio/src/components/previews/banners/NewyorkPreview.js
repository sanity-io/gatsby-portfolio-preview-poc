import React from 'react'
import IrlPreview from './IrlPreview'
import NewyorkBanner from './NewyorkBanner'

const nmatrix = [0.4537803868659941,0.054970678194849784,0,0.14983119474393147,-0.004189674182450833,0.22750620023381607,0,-0.09699401181274303,0,0,1,0,-0.00010425672320324794,-0.2516019261255319,0,1.0000005448288898]

const NewyorkPreview = props => {
  if (!props.document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adHeight={200} adWidth={400} bgSrc="/static/newyork.png">
      <NewyorkBanner document={props.document.displayed} />
    </IrlPreview>
  )
}

export default NewyorkPreview
