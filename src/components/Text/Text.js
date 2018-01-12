/* @flow */
import type { ComponentType, ElementType, Node } from 'react'
import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { font } from '../../utils/styles/font'

type Props = {
  children?: Node,
  color?: string,
  size?: string,
  smallcaps?: boolean,
  weight?: string,
}

type TextComponentType = {
  Block: ComponentType<Props>,
  Paragraph: ComponentType<Props>,
}

const StyledText = styled.span`
  ${({ size, weight }) => font({ size, weight })};
  ${({ smallcaps }) => {
    if (!smallcaps) return ''
    return `
      text-transform: lowercase;
      font-variant: small-caps;
    `
  }};
  ${({ color }) => {
    return `color: ${color || theme.textPrimary}`
  }};
`

const Text = props => <StyledText {...props} />

const createTextContainer = (
  Element: ElementType,
  defaultProps?: Props
): ComponentType<Props> => {
  const Container = ({
    children,
    color,
    size,
    smallcaps,
    weight,
    ...props
  }: Props) => {
    const textProps = { color, size, smallcaps, weight }
    return (
      <Element {...props}>
        <Text {...textProps}>{children}</Text>
      </Element>
    )
  }
  Container.defaultProps = defaultProps

  return Container
}

Text.Block = createTextContainer('div')
Text.Paragraph = createTextContainer('p')

const TypedText: ComponentType<Props> & TextComponentType = Text

export default TypedText
