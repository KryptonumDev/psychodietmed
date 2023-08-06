import { gql } from "@apollo/client";

export const GET_SEO_MEDIA = gql`
  query Seo($id: ID!) {
    page : medium(id: $id, idType: URI){
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