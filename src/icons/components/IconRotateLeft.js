import React from 'react'
import iconSize from '../icon-size'
import IconPropTypes from '../IconPropTypes'

function IconRotateLeft({ size, ...props }) {
  const sizeValue = iconSize(size)
  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.166 9.955H5.539V6.328a.623.623 0 00-1.245 0v4.249c0 .344.279.623.623.623h4.249a.622.622 0 100-1.245z"
      />
      <path
        fill="currentColor"
        d="M19.305 9.675a6.95 6.95 0 00-3.577-3.985 6.95 6.95 0 00-5.347-.289 7.04 7.04 0 00-2.611 1.64l-3.28 3.082a.623.623 0 00.853.908l3.286-3.088a5.787 5.787 0 012.166-1.367 5.758 5.758 0 017.335 3.513 5.758 5.758 0 01-3.513 7.335 5.758 5.758 0 01-7.336-3.513.622.622 0 10-1.174.414 6.95 6.95 0 003.577 3.985 6.968 6.968 0 005.347.289 6.95 6.95 0 003.985-3.577 6.95 6.95 0 00.289-5.347z"
      />
    </svg>
  )
}

IconRotateLeft.propTypes = IconPropTypes
export default IconRotateLeft
