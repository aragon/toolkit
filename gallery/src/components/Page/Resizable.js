import React from 'react'
import styled from 'styled-components'
import { unselectable } from '@aragon/ui'

const StyledResizer = styled.div`
  background-color: #ffff;
  box-shadow: 0 1.2rem 3.6rem rgba(0, 0, 0, 0.2);
  width: 45px;
  cursor: col-resize;
  display: flex;
  justify-content: center;
  align-items: center;
  ${unselectable()};
`
const ResizableContent = styled.div`
  background-color: #f2f2f2;
  padding: 16px;
`

const ResizableContainer = styled.div`
  display: flex;
`

class Resizable extends React.Component {
  static defaultProps = {
    minWidth: 0,
    maxWidth: Number.MAX_VALUE,
  }

  constructor(props) {
    super(props)
    this.state = {
      contentWidth: props.width,
    }
  }

  componentDidMount() {
    this.parentNode = this.containerNode.parentNode
  }

  componentWillReceiveProps({ width }) {
    this.setState({
      contentWidth: width,
    })
  }

  handleOnMouseDown = e => {
    window.addEventListener('mousemove', this.handleOnMouseMove, false)
    window.addEventListener('mouseup', this.handleOnMouseUp, false)
  }

  handleOnMouseMove = e => {
    const { minWidth, maxWidth } = this.props
    const { contentWidth } = this.state
    const updatedWidth = e.clientX - this.containerNode.offsetLeft
    const updatedWidthWithResizerHandle =
      updatedWidth + this.resizerNode.offsetWidth

    if (
      contentWidth !== updatedWidth &&
      updatedWidthWithResizerHandle <= this.parentNode.offsetWidth &&
      updatedWidth >= minWidth &&
      updatedWidth <= maxWidth
    ) {
      this.setState({ contentWidth: updatedWidth })
    }
  }

  handleOnMouseUp = e => {
    window.removeEventListener('mousemove', this.handleOnMouseMove, false)
    window.removeEventListener('mouseup', this.handleOnMouseUp, false)
  }

  render() {
    const { contentWidth } = this.state
    return (
      <ResizableContainer innerRef={node => (this.containerNode = node)}>
        <ResizableContent
          style={{ width: contentWidth == null ? '100%' : `${contentWidth}px` }}
        >
          {this.props.children}
        </ResizableContent>
        <StyledResizer
          onMouseDown={this.handleOnMouseDown}
          innerRef={node => (this.resizerNode = node)}
        >
          ||
        </StyledResizer>
      </ResizableContainer>
    )
  }
}

export default Resizable
