import { gql } from "@apollo/client";

export const GET_SEO_SPECIALIST = gql`
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