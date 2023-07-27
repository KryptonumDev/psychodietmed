import { gql } from "@apollo/client";

export const GET_SEO_PRODUCT = gql`
  query Seo($id: String!) {
    page : productBy(uri:  $id){
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