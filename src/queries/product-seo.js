export const GET_SEO_PRODUCT = `
  query Seo($id: ID!) {
    page : product(id: $id, idType: SLUG){
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