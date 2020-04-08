import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, unselectable, noop } from '../../utils'

class TabBar extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
    selected: PropTypes.number,
    onChange: PropTypes.func,
    inAppBar: PropTypes.bool,
  }
  static defaultProps = {
    selected: 0,
    onChange: noop,
  }

  state = {
    displayFocusRing: false,
  }

  _barRef = React.createRef()

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  enableFocusRing() {
    this.setState({ displayFocusRing: true })
  }
  disableFocusRing() {
    this.setState({ displayFocusRing: false })
  }
  selectElement(element) {
    const { onChange } = this.props
    if (!element || !this._barRef.current) {
      return
    }
    const index = [...this._barRef.current.childNodes].indexOf(element)
    if (index === -1) {
      return
    }

    onChange(index)
  }
  handleMouseDown = () => {
    this.disableFocusRing()
  }
  handleKeydown = ({ key }) => {
    if (key === 'Enter') {
      this.selectElement(document.activeElement)
      this.enableFocusRing()
    }
    if (key === 'Tab') {
      this.enableFocusRing()
    }
  }
  handleTabMouseDown = ({ currentTarget }) => {
    // We would usually avoid using the DOM when possible, and prefer using a
    // separate component (`Tab`) to keep the `index` in a prop, then pass it
    // using an event prop. But since `this.selectElement()` is needed (so we
    // can pass `document.activeElement` to it for the keyboard), and we have
    // `e.currentTarget` in the event object, we might as well use it for the
    // pointer device too.
    this.selectElement(currentTarget)
  }
  render() {
    const { displayFocusRing } = this.state
    const { items, selected, inAppBar } = this.props
    return (
      <nav onMouseDown={this.handleMouseDown}>
        <Bar ref={this._barRef} border={!inAppBar}>
          {items.map((item, i) => (
            <Tab
              key={i}
              tabIndex="0"
              selected={i === selected}
              focusRing={displayFocusRing}
              onMouseDown={this.handleTabMouseDown}
            >
              <Label selected={i === selected}>{item}</Label>
              {displayFocusRing && <FocusRing />}
            </Tab>
          ))}
        </Bar>
      </nav>
    )
  }
}

function Bar({ children, border }) {
  const theme = useTheme()
  return (
    <ul
      css={`
        display: flex;
        border-bottom: ${border ? `1px solid ${theme.border}` : '0'};
      `}
    >
      {children}
    </ul>
  )
}

function FocusRing({ children }) {
  const theme = useTheme()
  return (
    <span
      className="TabBarLegacy-FocusRing"
      css={`
        display: none;
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border: 2px solid ${theme.accent};
        border-radius: 2px;
      `}
    >
      {children}
    </span>
  )
}

function Tab({ children, selected }) {
  return (
    <li
      css={`
        position: relative;
        list-style: none;
        padding: 0 30px;
        cursor: pointer;
        ${font({
          weight: selected ? 'bold' : 'normal',
          deprecationNotice: false,
        })};
        ${unselectable()};
        &:focus {
          outline: 0;
          .TabBarLegacy-FocusRing {
            display: block;
          }
        }
      `}
    >
      {children}
    </li>
  )
}

function Label({ children }) {
  const theme = useTheme()
  return (
    <span
      css={`
        display: flex;
        margin-bottom: -1px;
        padding: 5px 0 3px;
        border-bottom: 4px solid ${selected ? theme.accent : 'transparent'};
      `}
    >
      {children}
    </span>
  )
}

export default TabBar
