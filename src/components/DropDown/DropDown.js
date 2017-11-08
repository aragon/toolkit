import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
import ClickOutside from 'react-click-outside'
import theme from '../../theme'
import { springConf } from '../../shared-styles'
import { lerp } from '../../math-utils'
import DropDownItem from './DropDownItem'
import arrow from './assets/arrow-down.svg'

const {
  contentBackground,
  contentBorder,
  contentBorderActive,
  textPrimary,
  textSecondary,
} = theme

const StyledDropDown = styled.div`
  position: relative;
  color: ${textPrimary};
  white-space: nowrap;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  &:focus {
    outline: 0;
  }
`

const DropDownItems = styled.ul`
  display: ${({ opened }) => (opened ? 'block' : 'none')};
  min-width: 100%;
  padding: 10px 0;
  position: absolute;
  top: calc(100% - 1px);
  color: ${textPrimary};
  background: ${contentBackground};
  border: 1px solid ${contentBorder};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  list-style: none;
`

const DropDownActiveItem = styled(DropDownItem)`
  padding: 15px 40px 15px 15px;
  background: ${contentBackground} url(${arrow}) no-repeat calc(100% - 15px) 50%;
  border: 1px solid ${contentBorder};
  border-radius: 3px;
  &:hover,
  &:focus {
    color: inherit;
  }
  &:active {
    color: ${textPrimary};
  }
`

class DropDown extends React.Component {
  state = {
    opened: false,
  }
  handleToggle = () => {
    this.setState({ opened: !this.state.opened })
  }
  handleClose = () => {
    this.setState({ opened: false })
  }
  handleItemActivate = (index, { keyboard }) => {
    this.props.onChange(index)
    this.setState({ opened: false })
    if (this.activeItemElt && keyboard) {
      this.activeItemElt.focus()
    }
  }
  render() {
    const { items, active } = this.props
    const { opened } = this.state
    const activeItem = items[active] || items[0]
    return (
      <ClickOutside onClickOutside={this.handleClose}>
        <StyledDropDown>
          <DropDownActiveItem
            onActivate={this.handleToggle}
            mainRef={el => (this.activeItemElt = el)}
          >
            {activeItem}
          </DropDownActiveItem>
          <Motion
            defaultStyle={{ openProgress: 0 }}
            style={{
              openProgress: spring(Number(opened), springConf('normal')),
            }}
          >
            {({ openProgress }) => {
              const scale = opened ? lerp(openProgress, 0.95, 1) : 1
              return (
                <DropDownItems
                  onClick={this.handleItemsClick}
                  opened={openProgress > 0}
                  style={{
                    transform: `scale(${scale},${scale})`,
                    opacity: opened ? openProgress : openProgress * 2,
                  }}
                >
                  {items.map((item, i) => (
                    <li key={i}>
                      <DropDownItem
                        index={i}
                        active={i === active}
                        onActivate={this.handleItemActivate}
                      >
                        {item}
                      </DropDownItem>
                    </li>
                  ))}
                </DropDownItems>
              )
            }}
          </Motion>
        </StyledDropDown>
      </ClickOutside>
    )
  }
}

export default DropDown
