export const GET_SEO_KAFELEK = `
  query Seo($id: ID!) {
    page : obszarDzilania(id: $id, idType: URI){
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