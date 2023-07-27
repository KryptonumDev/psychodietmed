import { gql } from "@apollo/client";

export const GET_SEO_CASE = gql`
  query Seo($id: String!) {
    page : podopiecznaBy(uri:  $id){
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