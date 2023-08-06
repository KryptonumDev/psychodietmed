import { gql } from "@apollo/client";

export const GET_SEO_PRODUCT = gql`
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