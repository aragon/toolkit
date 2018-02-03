import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
import Text from '../Text/Text'
import { lerp } from '../../utils/math'
import { spring as springConf, unselectable } from '../../utils/styles'
import getPublicUrl, { prefixUrl } from '../../public-url'

import close from './assets/close.svg'

const PANEL_WIDTH = 400
const PANEL_OVERFLOW = PANEL_WIDTH * 0.2
const PANEL_HIDE_RIGHT = -PANEL_WIDTH * 1.6

const StyledSidePanel = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: ${({ opened }) => (opened ? 'auto' : 'none')};
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(68, 81, 89, 0.65);
  pointer-events: ${({ opened }) => (opened ? 'auto' : 'none')};
`

const StyledPanel = styled.aside`
  display: flex;
  flex-direction: column;
  width: ${PANEL_WIDTH + PANEL_OVERFLOW}px;
  padding-right: ${30 + PANEL_OVERFLOW}px;
  padding-left: 30px;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: -2px 0 36px rgba(0, 0, 0, 0.2);
`

const StyledPanelHeader = styled.header`
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 20px;
  ${unselectable()};
`

const StyledPanelCloseButton = styled.button`
  ${StyledPanelHeader} & {
    position: absolute;
    padding: 20px;
    top: 0;
    right: -30px;
    cursor: pointer;
    background: none;
    border: 0;
    outline: 0;
    &::-moz-focus-inner {
      border: 0;
    }
  }
`

const motionStyles = progress => ({
  overlay: { opacity: progress },
  panel: { right: `${lerp(progress, PANEL_HIDE_RIGHT, -PANEL_OVERFLOW)}px` },
})

class SidePanel extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape, false)
  }
  handleClose = () => {
    if (!this.props.blocking) {
      this.props.onClose()
    }
  }
  handleEscape = event => {
    if (event.keyCode === 27 && this.props.opened) {
      this.handleClose()
    }
  }
  render() {
    const { children, title, opened, blocking, publicUrl } = this.props
    return (
      <Motion style={{ progress: spring(Number(opened), springConf('slow')) }}>
        {({ progress }) => {
          const styles = motionStyles(progress)
          return (
            <StyledSidePanel hidden={progress === 0} opened={opened}>
              <Overlay
                opened={opened}
                style={styles.overlay}
                onClick={this.handleClose}
              />
              <StyledPanel style={styles.panel}>
                <StyledPanelHeader>
                  <h1>
                    <Text size="xxlarge">{title}</Text>
                  </h1>
                  {!blocking && (
                    <StyledPanelCloseButton
                      type="button"
                      onClick={this.handleClose}
                    >
                      <img src={prefixUrl(close, publicUrl)} alt="Close" />
                    </StyledPanelCloseButton>
                  )}
                </StyledPanelHeader>
                {children}
              </StyledPanel>
            </StyledSidePanel>
          )
        }}
      </Motion>
    )
  }
}

SidePanel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  opened: PropTypes.bool,
  blocking: PropTypes.bool,
  onClose: PropTypes.func,
  publicUrl: PropTypes.string.isRequired,
}

SidePanel.defaultProps = {
  opened: true,
  blocking: false,
}

export default getPublicUrl(SidePanel)
