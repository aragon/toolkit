import React from 'react'
import PropTypes from 'prop-types'
import { Transition, animated } from 'react-spring'
import { Viewport } from '../../providers/Viewport'
import { noop } from '../../utils'
import { springs, GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'
import EscapeOutside from '../EscapeOutside/EscapeOutside'
import RootPortal from '../RootPortal/RootPortal'

const cssPx = value => (typeof value === 'number' ? value + 'px' : value)

const Modal = ({ children, onClose, padding, visible, width }) => {
  const theme = useTheme()

  return (
    <RootPortal>
      <Viewport>
        {viewport => (
          <Transition
            native
            items={visible}
            from={{ opacity: 0, scale: 0.98 }}
            enter={{ opacity: 1, scale: 1 }}
            leave={{ opacity: 0, scale: 0.98 }}
            config={springs.smooth}
          >
            {show =>
              show &&
              /* eslint-disable react/prop-types */
              (({ opacity, scale }) => (
                <animated.div
                  css={`
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: ${theme.overlay.alpha(0.8)};
                  `}
                  style={{ opacity }}
                >
                  <animated.div
                    css={`
                      position: absolute;
                      z-index: 1;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      display: grid;
                      align-items: center;
                      justify-items: center;
                      overflow: auto;
                    `}
                    style={{
                      pointerEvents: visible ? 'auto' : 'none',
                      transform: scale.interpolate(
                        v => `scale3d(${v}, ${v}, 1)`
                      ),
                    }}
                  >
                    <div
                      css={`
                        padding: ${2 * GU}px ${2 * GU}px;
                      `}
                    >
                      <EscapeOutside
                        role="alertdialog"
                        background={theme.surface}
                        onEscapeOutside={onClose}
                        css={`
                          overflow: hidden;
                          min-width: ${360 - 4 * GU}px;
                          background: ${theme.surface};
                          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
                        `}
                        style={{
                          width: cssPx(
                            typeof width === 'function'
                              ? width(viewport)
                              : width
                          ),
                          padding: cssPx(
                            typeof padding === 'function'
                              ? padding(viewport)
                              : padding
                          ),
                          borderRadius: `${RADIUS}px`,
                        }}
                      >
                        {children}
                      </EscapeOutside>
                    </div>
                  </animated.div>
                </animated.div>
              ))
            /* eslint-enable react/prop-types */
            }
          </Transition>
        )}
      </Viewport>
    </RootPortal>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  padding: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.string,
  ]),
  visible: PropTypes.bool.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.string,
  ]),
}

Modal.defaultProps = {
  onClose: noop,
  padding: 3 * GU,
  width: viewport => Math.min(viewport.width - 48, 600),
}

export default Modal
