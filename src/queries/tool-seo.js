export const GET_SEO_TOOL = `
  query Seo($id: ID!) {
    page : narzedzie(id: $id, idType: URI){
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