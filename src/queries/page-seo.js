export const GET_SEO_PAGE = `
  query Seo($id: ID!) {
    page(id: $id) {
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