import { gql } from "@apollo/client";

const SEND_RESET = gql`
  mutation SEND_RESET( $input: SendPasswordResetEmailInput! ) {
    sendPasswordResetEmail(input: $input) {
      success
    }
  }
`;

export default SEND_RESET;
