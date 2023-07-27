import { gql } from "@apollo/client";

export const GET_SEO_POST = gql`
  query Seo($id: String!) {
    page : postBy(uri:  $id){
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