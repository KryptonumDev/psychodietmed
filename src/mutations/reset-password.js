import { gql } from "@apollo/client";

const RESET = gql`
  mutation RESET( $input: ResetUserPasswordInput! ) {
    resetUserPassword(input: $input) {
      user {
        id
      }
    }
  }
`;

export default RESET;
