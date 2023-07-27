import { gql } from "@apollo/client";

export const GET_SEO_SPECIALIST = gql`
  query Seo($id: String!) {
    page : specjalistaBy(uri:  $id){
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