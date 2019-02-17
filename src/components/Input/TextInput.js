import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { theme } from '../../theme'
import { font } from '../../utils/styles'
import { AdornmentStyled, inputPaddingCss } from './Adornment.js'

const baseStyles = css`
  ${font({ size: 'small', weight: 'normal' })};
  width: ${({ wide }) => (wide ? '100%' : 'auto')};
  height: 40px;
  padding: 0 10px;
  background: ${theme.contentBackground};
  border: 1px solid ${theme.contentBorder};
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
  color: ${theme.textPrimary};
  appearance: none;
  &:focus {
    outline: none;
    border-color: ${theme.contentBorderActive};
  }
  &:read-only {
    color: transparent;
    text-shadow: 0 0 0 ${theme.textSecondary};
  }
`

// Simple input
const TextInput = styled.input`
  ${baseStyles};
`
TextInput.propTypes = {
  required: PropTypes.bool,
  type: PropTypes.oneOf([
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'url',
  ]),
}
TextInput.defaultProps = {
  required: false,
  type: 'text',
}

const Container = styled.div`
  position: relative;
  width: max-content;
`
const TextInputStyled = styled(TextInput)`
  ${props => props.adornment && inputPaddingCss(props.adornmentPosition)}
`

class WrapperTextInput extends React.Component {
  render() {
    const { adornment, adornmentPosition, innerRef } = this.props
    const f = x => {
      this.input = x
    }
    return (
      <Container>
        <TextInputStyled {...this.props} innerRef={innerRef || f} />
        {adornment && (
          <AdornmentStyled
            component={adornment}
            adornment={adornment}
            adornmentPosition={adornmentPosition}
          />
        )}
      </Container>
    )
  }
}

WrapperTextInput.propTypes = {
  adornmentPosition: PropTypes.string,
  adornment: PropTypes.any,
}

WrapperTextInput.defaultProps = {
  adornmentPosition: 'start',
}

// <input type=number> (only for compat)
const TextInputNumber = styled.input.attrs({ type: 'number' })`
  ${baseStyles};
`

// Multiline input (textarea element)
const TextInputMultiline = styled.textarea`
  ${baseStyles};
  resize: vertical;
`
TextInputMultiline.propTypes = {
  required: PropTypes.bool,
}
TextInputMultiline.defaultProps = {
  required: false,
}

WrapperTextInput.Number = TextInputNumber
WrapperTextInput.Multiline = TextInputMultiline

export default WrapperTextInput
