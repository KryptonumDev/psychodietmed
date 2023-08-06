import { gql } from "@apollo/client";

export const GET_SEO_KAFELEK = gql`
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