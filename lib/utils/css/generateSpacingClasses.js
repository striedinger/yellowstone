import classnames from 'classnames';
import spacing from './spacing.module.css';

const generatePaddingClasses = padding => {
  if (Array.isArray(padding) && padding.length > 0 && padding.length <= 4) {
    let paddingClasses;
    if (padding.length === 1) paddingClasses = spacing[`padding-${padding[0]}`];
    if (padding.length === 2) paddingClasses = classnames(spacing[`padding-y-${padding[0]}`], spacing[`padding-x-${padding[1]}`]);
    if (padding.length === 3) paddingClasses = classnames(spacing[`padding-top-${padding[0]}`], spacing[`padding-x-${padding[1]}`], spacing[`padding-bottom-${padding[2]}`]);
    if (padding.length === 4) paddingClasses = classnames(spacing[`padding-top-${padding[0]}`], spacing[`padding-right-${padding[1]}`], spacing[`padding-bottom-${padding[2]}`], spacing[`padding-left-${padding[3]}`]);
    return paddingClasses;
  }
  return null;
}

const generateMarginClasses = margin => {
  if (Array.isArray(margin) && margin.length > 0 && margin.length <= 4) {
    let marginClasses;
    if (margin.length === 1) marginClasses = spacing[`margin-${margin[0]}`];
    if (margin.length === 2) marginClasses = classnames(spacing[`margin-y-${margin[0]}`], spacing[`margin-x-${margin[1]}`]);
    if (margin.length === 3) marginClasses = classnames(spacing[`margin-top-${margin[0]}`], spacing[`margin-x-${margin[1]}`], spacing[`margin-bottom-${margin[2]}`]);
    if (margin.length === 4) marginClasses = classnames(spacing[`margin-top-${margin[0]}`], spacing[`margin-right-${margin[1]}`], spacing[`margin-bottom-${margin[2]}`], spacing[`margin-left-${margin[3]}`]);
    return marginClasses;
  }
  return null;
}

export default ({ padding, margin }) => {
  return classnames(generateMarginClasses(margin), generatePaddingClasses(padding));
};
