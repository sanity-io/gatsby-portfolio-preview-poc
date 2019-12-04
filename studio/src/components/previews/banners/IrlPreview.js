/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import Moveable from 'react-moveable'
import RadioButtons from 'part:@sanity/components/selects/radio'
import styles from './IrlPreview.css'

const EDIT_MODES = [
  {title: 'Resize', name: 'resizable'},
  {title: 'Scale', name: 'scalable'},
  {title: 'Warp', name: 'warpable'}
]

const IMG_FILTERS = [
  {title: 'Aden', name: 'aden'},
  {title: 'Brooklyn', name: 'brooklyn'},
  {title: 'Amaro', name: 'amaro'},
  {title: 'Gingham', name: 'gingham'}
]

class IrlPreview extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bannerTarget: null,
      editMode: EDIT_MODES[0],
      imgFilter: IMG_FILTERS[0],
      isEditMode: false,
      cssOutput: {}
    }
    this.previewBanner = React.createRef()
    this.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    this.scale = [1, 1]
    this.rotate = 0
  }

  static propTypes = {
    initialStyles: PropTypes.object,
    backgroundImage: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    document: null,
    initialStyles: {}
  }

  handleEditModeChange = item => {
    this.setState({
      editMode: item
    })
  }

  handleImgFilterChange = item => {
    this.setState({
      imgFilter: item
    })
  }

  handleShowEditMode = () => {
    this.setState({
      isEditMode: true
    })
  }

  handleHideEditMode = () => {
    this.setState({
      isEditMode: false
    })
  }

  handlePrintStyles = style => {
    const css = {
      transform: style.transform,
      top: style.top,
      left: style.left,
      width: style.width,
      height: style.height
    }
    this.setState({
      cssOutput: css
    })
  }

  componentDidMount() {
    this.setState({
      bannerTarget: this.previewBanner.current,
      cssOutput: this.props.initialStyles
    })
  }

  render() {
    const {backgroundImage, children, initialStyles} = this.props
    const {bannerTarget, editMode, isEditMode, imgFilter, cssOutput} = this.state
    return (
      <div className={styles.componentWrapper}>
        {/* UNCOMMENT TO ENABLE FILTER SELECTION */}
        {/* <div className={styles.radioWrapper}>
          <label>Filter</label>
          <RadioButtons
            value={imgFilter}
            items={IMG_FILTERS}
            onChange={this.handleImgFilterChange}
          />
        </div> */}
        <div className={styles.radioWrapper}>
          <label>Edit mode</label>
          <RadioButtons value={editMode} items={EDIT_MODES} onChange={this.handleEditModeChange} />
        </div>
        <div
          className={`${styles.previewWrapper} ${styles.filter} ${styles[imgFilter.name]}`}
          onMouseEnter={this.handleShowEditMode}
          onMouseLeave={this.handleHideEditMode}
        >
          <img className={styles.backgroundImage} src={backgroundImage} />
          {bannerTarget && isEditMode && (
            <Moveable
              target={bannerTarget}
              draggable
              rotatable
              resizable={editMode.name === 'resizable'}
              warpable={editMode.name === 'warpable'}
              scalable={editMode.name === 'scalable'}
              keepRatio
              onDrag={({target, left, top, beforeDelta}) => {
                target.style.left = `${left}px`
                target.style.top = `${top}px`
                this.handlePrintStyles(target.style)
              }}
              onRotate={({target, beforeDelta, delta}) => {
                this.rotate += delta
                target.style.transform = `rotate(${this.rotate}deg) scale(${this.scale[0]},${
                  this.scale[1]
                }) matrix3d(${this.matrix.join(',')})`
                this.handlePrintStyles(target.style)
              }}
              onResize={({target, width, height, dist}) => {
                target.style.width = `${width}px`
                target.style.height = `${height}px`
                this.handlePrintStyles(target.style)
              }}
              onWarp={({target, multiply, delta}) => {
                this.matrix = multiply(this.matrix, delta)
                target.style.transform = `rotate(${this.rotate}deg) scale(${this.scale[0]},${
                  this.scale[1]
                }) matrix3d(${this.matrix.join(',')})`
                this.handlePrintStyles(target.style)
              }}
              onScale={({target, delta}) => {
                const scale = this.scale
                scale[0] *= delta[0]
                scale[1] *= delta[1]
                target.style.transform = `rotate(${this.rotate}deg) scale(${scale[0]}, ${
                  scale[1]
                }) matrix3d(${this.matrix.join(',')})`
                this.handlePrintStyles(target.style)
              }}
            />
          )}
          <div ref={this.previewBanner} className={styles.banner} style={initialStyles}>
            {children}
          </div>
          <div>
            <pre>{JSON.stringify(cssOutput, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
  }
}

export default IrlPreview
