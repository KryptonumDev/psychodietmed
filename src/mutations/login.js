import { gql } from "@apollo/client";

const LOGIN = gql`
mutation LOGIN( $input: LoginInput! ) {
  login(input: $input) {
    authToken
    sessionToken
    user {
      id
      courses(first: 100) {
        nodes {
          id
          databaseId
          slug
          title
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    }
  }
}
`;

export default LOGIN;
