import { gql } from "@apollo/client";

export const GET_SEO_TOOL = gql`
  query Seo($id: String!) {
    page : narzedzieBy(uri:  $id){
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