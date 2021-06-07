export function getTextSizeClassNameFromProp(size?: TextSize) {
  return size ? `text-${size}` : ''
}
