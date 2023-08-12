function getContrastColor(rgb) {
  if (!rgb || !Array.isArray(rgb) || rgb.length !== 3) {
    throw new Error('Invalid RGB format provided to getContrastColor');
  }
  const [r, g, b] = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'black' : 'white';
}

export default getContrastColor;