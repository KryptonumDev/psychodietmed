export const htmlDelete = (string) => {

  if(!string){
      return string
  }    

  return string.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
}