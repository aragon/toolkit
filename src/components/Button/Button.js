import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SafeLink from '../Link/SafeLink'
import { textStyle, GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'
import { warn, useInside } from '../../utils'
import { ButtonBase } from './ButtonBase'

function buttonStyles(mode, theme) {
  if (mode === 'strong') {
    return {
      background: `
          linear-gradient(
            130deg,
            ${theme.accentStart},
            ${theme.accentEnd}
          )`,
      color: theme.accentContent,
      iconColor: theme.accentContent,
      border: '0',
    }
  }

  if (mode === 'positive') {
    return {
      background: theme.positive,
      color: theme.positiveContent,
      iconColor: theme.positiveContent,
      border: '0',
    }
  }

  if (mode === 'negative') {
    return {
      background: theme.negative,
      color: theme.negativeContent,
      iconColor: theme.negativeContent,
      border: '0',
    }
  }

  return {
    background: theme.surfaceInteractive,
    color: theme.surfaceContent,
    border: `1px solid ${theme.border}`,
    iconColor: theme.surfaceIcon,
  }
}

function Button({
  children,
  icon,
  iconOnly,
  innerRef,
  label,
  mode,
  size,
  wide,
  ...props
}) {
  // prop warnings
  if (iconOnly && !icon) {
    warn('Button: iconOnly was used without providing an icon.')
  }
  if (!children && !label) {
    warn('Button: please provide a label.')
  }

  // backward compatibility
  if (mode === 'outline') mode = 'normal'
  if (mode === 'secondary') mode = 'normal'
  if (size === 'mini') size = 'small'

  const theme = useTheme()

  const insideEmptyStateCard = useInside('EmptyStateCard')

  // Always wide + strong when used as an empty state card action
  if (insideEmptyStateCard) {
    mode = 'strong'
    wide = true
  }

  const { background, color, iconColor, border } = useMemo(
    () => buttonStyles(mode, theme),
    [mode, theme]
  )

  const width = wide ? '100%' : 'auto'
  const height = size === 'small' ? `${4 * GU}px` : `${5 * GU}px`
  const padding = size === 'small' ? `0 ${2 * GU}px` : `0 ${3 * GU}px`

  if (iconOnly) {
    props.title = label
  }

  return (
    <ButtonBase
      ref={innerRef}
      focusRingSpacing={border === '0' ? 3 : 4}
      focusRingRadius={RADIUS}
      css={`
        display: ${wide ? 'flex' : 'inline-flex'};
        align-items: center;
        justify-content: center;
        background: ${background};
        color: ${color};
        ${textStyle('body2')};
        white-space: nowrap;
        width: ${iconOnly ? height : width};
        height: ${height};
        padding: ${iconOnly ? 0 : padding};
        min-width: ${iconOnly ? 0 : 16 * GU}px;
        border: ${border};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition-property: transform, box-shadow;
        transition-duration: 50ms;
        transition-timing-function: ease-in-out;
        &:active {
          transform: translateY(1px);
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.125);
        }
      `}
      {...props}
    >
      {children || (
        <React.Fragment>
          {icon && (
            <span
              css={`
                position: relative;
                top: -1px;
                display: flex;
                color: ${iconColor};
              `}
            >
              {icon}
            </span>
          )}
          {icon && label && !iconOnly && (
            <span
              css={`
                width: ${1 * GU}px;
              `}
            />
          )}
          {!iconOnly && label}
        </React.Fragment>
      )}
    </ButtonBase>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  iconOnly: PropTypes.bool,
  innerRef: PropTypes.any,
  label: PropTypes.string,
  mode: PropTypes.oneOf([
    'normal',
    'strong',
    'positive',
    'negative',

    // backward compatibility
    'outline',
    'secondary',
    'text',
  ]),
  size: PropTypes.oneOf([
    'large',
    'normal',
    'small',

    // backward compatibility
    'mini',
  ]),
  wide: PropTypes.bool,
}

Button.defaultProps = {
  iconOnly: false,
  mode: 'normal',
  size: 'normal',
  wide: false,
}

const ButtonWithRef = React.forwardRef((props, ref) => (
  <Button innerRef={ref} {...props} />
))

ButtonWithRef.Anchor = React.forwardRef((props, ref) => (
  <ButtonWithRef ref={ref} as={SafeLink} {...props} />
))

export { ButtonWithRef as Button }
export default ButtonWithRef
