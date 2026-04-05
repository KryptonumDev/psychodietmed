export const GET_SEO_METHOD_LANDING = `
  query Seo($id: ID!) {
    page(id: $id, idType: URI) {
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
`;

