import React from 'react'
import IrlPreview from './IrlPreview'
import MagazineFrontpage from './MagazineFrontpage'

const nmatrix = [0.2053413415315498, -0.25022278767261186, 0, 0.08804155698037881, 0.32323456568867975, 0.2448218237136603, 0, -0.11091486043788865, 0, 0, 1, 0, 0.2151702201763478, -0.035756195881284814, 0, 1.0000002156205965]

const NewyorkPreview = props => {
  if (!props.document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adHeight={200} adWidth={400} bgSrc='https://cdn.sanity.io/images/uj2a9mdf/production/509e159dbd7ea243a82f2ec42a84fb563f99099a-4310x2952.jpg?w=1000&h=1000&fit=max'>
      <MagazineFrontpage document={props.document.displayed} />
    </IrlPreview>
  )
}

export default NewyorkPreview
