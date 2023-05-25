export const removeWrap = (text) => {
  return text.replace(/^<p>/, '').replace(/<\/p>$/, '');
}
