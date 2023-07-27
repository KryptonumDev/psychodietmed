import { gql } from "@apollo/client";

export const GET_SEO_MEDIA = gql`
  query Seo($id: String!) {
    page : mediumBy(uri:  $id){
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