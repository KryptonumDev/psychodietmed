export const GET_SEO_POST = `
  query Seo($id: ID!) {
    page : post(id:  $id, idType: SLUG){
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