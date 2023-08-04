import { gql } from "@apollo/client";

export const GET_SEO_POST = gql`
  query Seo($id: ID!) {
    page : post(id:  $id, idType: SLUG){
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