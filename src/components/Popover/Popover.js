import React from 'react'
import PropTypes from 'prop-types'
import Popper from 'popper.js'
import { Transition, animated } from 'react-spring'
import { noop } from '../../utils'
import { useTheme } from '../../theme'
import { springs, RADIUS } from '../../style'
import RootPortal from '../RootPortal/RootPortal'

class PopoverBase extends React.Component {
  static propTypes = {
    opener: PropTypes.instanceOf(Element),
    placement: PropTypes.oneOf(
      // "center" is a value that doesn’t exist in Popper, but we are using it
      // to define custom Popper settings (see getPopperSettings() below).
      ['center'].concat(
        ...['auto', 'top', 'right', 'bottom', 'left'].map(position => [
          position,
          `${position}-start`,
          `${position}-end`,
        ])
      )
    ),
    zIndex: PropTypes.number,
    onClose: PropTypes.func,
    children: PropTypes.node,
    transitionStyles: PropTypes.object,
    theme: PropTypes.object,
  }

  static defaultProps = {
    opener: null,
    placement: 'center',
    onClose: noop,
    zIndex: 999,
  }

  _cardElement = React.createRef()
  _popperElement = React.createRef()
  _document = null
  _popper = null

  componentDidMount() {
    this._document = this._popperElement.current.ownerDocument
    this._document.addEventListener('keydown', this.handleEscape)
    this._cardElement.current.focus()
    this.initPopper()
  }

  componentWillUnmount() {
    this.destroyPopper()
    this._document.removeEventListener('keydown', this.handleEscape)
    delete this._document
    delete this._popper
  }

  componentDidUpdate(prevProps, prevState) {
    const { placement, children, opener } = this.props
    if (
      prevProps.placement !== placement ||
      prevProps.children !== children ||
      prevProps.opener !== opener
    ) {
      this.destroyPopper()
      this.initPopper()
    }
  }

  getPopperSettings() {
    const { placement } = this.props

    const settings = {
      placement,
      modifiers: {
        preventOverflow: {
          enabled: true,
          padding: 10,
          boundariesElement: 'window',
        },
      },
      positionFixed: false,
    }

    if (placement !== 'center') {
      return settings
    }

    return {
      ...settings,
      placement: 'top-start',
      modifiers: {
        ...settings.modifiers,
        arrow: { enabled: false },
        flip: { enabled: false },
        offset: { enabled: true, offset: '50% - 50%p, -50%p - 50%' },
      },
    }
  }

  initPopper() {
    const { opener } = this.props
    if (!this._popper) {
      this._popper = new Popper(
        opener,
        this._popperElement.current,
        this.getPopperSettings()
      )
    }
  }

  destroyPopper() {
    if (this._popper) {
      this._popper.destroy()
      this._popper = null
    }
  }

  handleEscape = ({ keyCode }) => {
    const { opener, onClose } = this.props
    if (keyCode === 27) {
      // On escape, we always move the focus back to the opener.
      opener.focus()
      onClose()
    }
  }

  handleBlur = event => {
    const { opener, onClose } = this.props
    const focusedElement = event.relatedTarget
    if (this._cardElement.current.contains(focusedElement)) {
      return
    }

    // Probably a click outside, that doesn’t focus anything else: move the
    // focus back to the opener.
    if (!focusedElement) {
      opener.focus()
    }
    onClose()
  }

  render() {
    const { zIndex, children, transitionStyles, theme, ...props } = this.props
    const { scale, opacity } = transitionStyles
    return (
      <animated.div
        css={`
          // default styles until Popper takes over
          position: absolute;
          top: 0;
          left: 0;
        `}
        ref={this._popperElement}
        style={{ zIndex }}
      >
        <animated.div
          tabIndex="0"
          onBlur={this.handleBlur}
          ref={this._cardElement}
          style={{
            opacity,
            transform: scale.interpolate(v => `scale3d(${v}, ${v}, 1)`),
          }}
          css={`
            background: ${theme.surface};
            border: 1px solid ${theme.border};
            border-radius: ${RADIUS}px;
            filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.06));
            &:focus {
              /* Having the popover visible already means that it focused. */
              outline: 0;
            }
          `}
          {...props}
        >
          {children}
        </animated.div>
      </animated.div>
    )
  }
}

function Popover({ scaleEffect, visible, ...props }) {
  const theme = useTheme()
  return (
    <RootPortal>
      <Transition
        items={visible}
        config={springs.swift}
        from={{ scale: scaleEffect ? 0.9 : 1, opacity: 0 }}
        enter={{ scale: 1, opacity: 1 }}
        leave={{ scale: scaleEffect ? 0.9 : 1, opacity: 0 }}
        native
      >
        {visible =>
          visible &&
          (transitionStyles => (
            <PopoverBase
              {...props}
              theme={theme}
              transitionStyles={transitionStyles}
            />
          ))
        }
      </Transition>
    </RootPortal>
  )
}

Popover.propTypes = {
  ...PopoverBase.propTypes,
  scaleEffect: PropTypes.bool,
  visible: PropTypes.bool,
}

Popover.defaultProps = {
  ...PopoverBase.defaultProps,
  scaleEffect: true,
  visible: true,
}

export default Popover
