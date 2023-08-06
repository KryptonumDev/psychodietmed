import { gql } from "@apollo/client";

export const GET_SEO_CASE = gql`
  query Seo($id: ID!) {
    page : podopieczna(id:  $id, idType: URI){
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