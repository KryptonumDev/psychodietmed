export const GET_SEO_LANDING = `
query Seo($id: ID!) {
  page : landingPage(id: $id, idType: URI){
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