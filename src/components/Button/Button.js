import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SafeLink from '../Link/SafeLink'
import { textStyle, GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'
import { warn, warnOnce, useInside } from '../../utils'
import { useLayout } from '../Layout/Layout'
import { ButtonBase } from './ButtonBase'

function buttonStyles(mode, theme) {
  if (mode === 'strong') {
    return {
      background: `
        linear-gradient(
          130deg,
          ${theme.accentStart},
          ${theme.accentEnd}
        )
      `,
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
    iconColor: theme.surfaceIcon,
    border: `1px solid ${theme.border}`,
  }
}

function Button({
  children,
  display,
  icon,
  iconOnly,
  innerRef,
  label,
  mode,
  size,
  wide,
  ...props
}) {
  // backward compatibility and deprecated props
  if (iconOnly) {
    warnOnce('Button: "iconOnly" is deprecated, please use "display".')
    display = 'icon'
  }
  if (mode === 'outline' || mode === 'secondary') {
    warnOnce(`Button: the mode "${mode}" is deprecated, please use "normal".`)
    mode = 'normal'
  }
  if (size === 'mini') {
    warnOnce(`Button: the size "mini" is deprecated, please use "small".`)
    size = 'small'
  }

  // prop warnings
  if (display === 'icon' && !icon) {
    warn('Button: the display "icon" was used without providing an icon.')
  }
  if (!children && !label) {
    warn('Button: please provide a label.')
  }

  const theme = useTheme()
  const { layoutName } = useLayout()

  const insideEmptyStateCard = useInside('EmptyStateCard')
  const insideHeaderSecondary = useInside('Header:secondary')

  // Always wide + strong when used as an empty state card action
  if (insideEmptyStateCard) {
    mode = 'strong'
    wide = true
  }

  // Alternate between icon and label automatically when used in Header
  if (insideHeaderSecondary && display === 'auto' && icon && label) {
    display = layoutName === 'small' ? 'icon' : 'label'
  }

  // Otherwise, display both
  if (display === 'auto') {
    display = 'all'
  }

  const displayIcon = icon && (display === 'all' || display === 'icon')
  const displayLabel = label && (display === 'all' || display === 'label')
  const displayIconOnly = displayIcon && !displayLabel

  // Styles
  const { background, color, iconColor, border } = useMemo(
    () => buttonStyles(mode, theme),
    [mode, theme]
  )

  const width = wide ? '100%' : 'auto'
  const height = size === 'small' ? `${4 * GU}px` : `${5 * GU}px`
  const padding = size === 'small' ? `0 ${2 * GU}px` : `0 ${3 * GU}px`

  // Use the label as a title when only the icon is displayed
  if (displayIconOnly) {
    props.title = label || ''
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
        width: ${displayIconOnly ? height : width};
        height: ${height};
        padding: ${displayIconOnly ? 0 : padding};
        min-width: ${displayIconOnly ? 0 : 16 * GU}px;
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
          {displayIcon && (
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
          {displayIcon && displayLabel && (
            <span
              css={`
                width: ${1 * GU}px;
              `}
            />
          )}
          {displayLabel && label}
        </React.Fragment>
      )}
    </ButtonBase>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  display: PropTypes.oneOf(['auto', 'all', 'icon', 'label']),
  icon: PropTypes.node,
  innerRef: PropTypes.any,
  label: PropTypes.string,
  mode: PropTypes.oneOf([
    'normal',
    'strong',
    'positive',
    'negative',

    // deprecated
    'outline',
    'secondary',
    'text',
  ]),
  size: PropTypes.oneOf([
    'large',
    'normal',
    'small',

    // deprecated
    'mini',
  ]),
  wide: PropTypes.bool,

  // deprecated
  iconOnly: PropTypes.bool,
}

Button.defaultProps = {
  display: 'auto',
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
