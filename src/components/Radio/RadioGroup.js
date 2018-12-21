import React from 'react'
import PropTypes from 'prop-types'
import { stylingProps, noop } from '../../utils'

const { Provider, Consumer } = React.createContext({})

class RadioGroup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }
  static defaultProps = {
    onChange: noop,
  }
  state = {
    // keep track of the radios buttons to handle keyboard navigation
    radios: new Set(),
  }
  handleCheck = id => {
    this.props.onChange(id)
  }
  addRadio = id => {
    this.setState(state => {
      const radios = new Set(state.radios)
      radios.add(id)
      return { radios }
    })
  }
  removeRadio = id => {
    this.setState(state => {
      const radios = new Set(state.radios)
      radios.delete(id)
      return { radios }
    })
  }
  getSiblingId(position) {
    const { selected } = this.props
    const radios = [...this.state.radios]
    const selectedIndex = radios.indexOf(selected)
    const newSelectedIndex = selectedIndex + position

    // no radios
    if (radios.length === 0) {
      return null
    }

    // back on the first item: go to the last one
    if (newSelectedIndex === -1) {
      return radios[radios.length - 1]
    }

    // next on the last item: go to the first one
    if (newSelectedIndex === radios.length) {
      return radios[0]
    }

    // new item to select
    if (selectedIndex > -1 && radios[newSelectedIndex]) {
      return radios[newSelectedIndex]
    }

    // select the second item if we are going down
    if (position === 1 && radios[1] !== undefined) {
      return radios[1]
    }

    // default: select the first item if available
    return radios[0] === undefined ? null : radios[0]
  }
  selectPrev = () => {
    const id = this.getSiblingId(-1)
    if (id !== null) {
      this.props.onChange(id)
    }
  }
  selectNext = () => {
    const id = this.getSiblingId(1)
    if (id !== null) {
      this.props.onChange(id)
    }
  }
  render() {
    const { radios } = this.state
    const { children, selected } = this.props
    const focusable = radios.has(selected) ? selected : [...radios][0]
    return (
      <Provider
        value={{
          selected,
          focusable,
          onCheck: this.handleCheck,
          addRadio: this.addRadio,
          removeRadio: this.removeRadio,
          selectPrev: this.selectPrev,
          selectNext: this.selectNext,
        }}
      >
        <div role="radiogroup" {...stylingProps(this)}>
          {children}
        </div>
      </Provider>
    )
  }
}

export { Consumer as RadioGroupConsumer }
export default RadioGroup
