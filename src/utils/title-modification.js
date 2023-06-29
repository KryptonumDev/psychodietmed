export const removeWrap = (text) => {
  if(!text) return ''
  return text?.replace(/^<p>/, '')?.replace(/<\/p>$/, '');
}
