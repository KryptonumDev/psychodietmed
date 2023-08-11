export const GET_SEO_CASE = `
  query Seo($id: ID!) {
    page : podopieczna(id:  $id, idType: URI){
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