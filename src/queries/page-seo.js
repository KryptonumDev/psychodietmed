import { gql } from "@apollo/client";

export const GET_SEO_PAGE = gql`
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