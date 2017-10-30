const FONT_SIZES = {
  xsmall: '12px',
  small: '14px',
  normal: '15px',
  large: '16px',
  xlarge: '22px',
}

const FONT_WEIGHTS = {
  normal: '400',
  bold: '600',
  bolder: '800',
}

export const fontStyle = ({ size = 'normal', weight = 'bold' }) => {
  const fontSize = FONT_SIZES[size] || FONT_SIZES.normal
  const fontWeigt = FONT_WEIGHTS[weight] || FONT_WEIGHTS.normal
  return `
    font-size: ${fontSize};
    font-weight: ${fontWeigt};
    line-height: 1.5;
  `
}
