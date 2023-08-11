export const GET_SEO_SPECIALIST = `
  query Seo($id: ID!) {
    page : specjalista(id: $id, idType: URI){
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