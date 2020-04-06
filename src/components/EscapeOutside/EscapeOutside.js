import React from 'react'
import PropTypes from 'prop-types'
import { noop, KEY_ESC } from '../../utils'

class EscapeOutside extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onEscapeOutside: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onEscapeOutside: noop,
  }

  _element = React.createRef()
  _document = null

  componentDidMount() {
    this._document = this._element.ownerDocument
    this._document.addEventListener('keydown', this.handleEscape)
    this._document.addEventListener('click', this.handleClick)
    this._document.addEventListener('touchend', this.handleClick)
  }

  componentWillUnmount() {
    this._document.removeEventListener('keydown', this.handleEscape)
    this._document.removeEventListener('click', this.handleClick)
    this._document.removeEventListener('touchend', this.handleClick)
  }

  handleClick = e => {
    const { onEscapeOutside } = this.props
    if (!this._element.contains(e.target)) {
      onEscapeOutside()
    }
  }

  handleEscape = e => {
    const { onEscapeOutside } = this.props
    if (e.keyCode === KEY_ESC) {
      onEscapeOutside()
    }
  }

  render() {
    const { children, onEscapeOutside, ...rest } = this.props

    return (
      <div {...rest} ref={n => (this._element = n)}>
        {children}
      </div>
    )
  }
}

export default EscapeOutside
