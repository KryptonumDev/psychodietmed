export const GET_SEO_COURSE = `
  query Seo($id: ID!) {
    page : course(id: $id, idType: SLUG){
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