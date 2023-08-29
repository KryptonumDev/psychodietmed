export const GET_SEO_LESSON = `
query Seo($id: ID!) {
  page : lesson(id: $id, idType: SLUG){
    id
    seo {
      title
      metaDesc
      opengraphImage {
        mediaItemUrl
      }
    }
  }
}
`