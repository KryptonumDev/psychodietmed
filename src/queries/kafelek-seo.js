import { gql } from "@apollo/client";

export const GET_SEO_KAFELEK = gql`
  query Seo($id: String!) {
    page : obszarDzilaniaBy(uri:  $id){
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