import { gql } from "@apollo/client";

export const GET_SEO_TOOL = gql`
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