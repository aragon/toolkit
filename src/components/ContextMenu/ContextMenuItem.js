import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { unselectable } from '../../shared-styles'

const ContextMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  ${unselectable()};
  &:active {
    background: ${theme.contentBackgroundActive};
  }
  & > svg {
    margin-right: 15px;
  }
`

export default ContextMenuItem
