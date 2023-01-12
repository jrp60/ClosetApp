export const transformNumber = number => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(0).replace(/\.0$/, '') + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0).replace(/\.0$/, '') + 'K';
  }
  return number;
};
