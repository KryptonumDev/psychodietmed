import { gql } from "@apollo/client";

const CHECKOUT_MUTATION = gql`
mutation CHECKOUT_MUTATION( $input: CheckoutInput! ) {
  checkout(input: $input) {
    clientMutationId
    customer {
      email
      firstName
    }
    order {
      billing {
        email
        firstName
      }
      shipping {
        email
        firstName
      }
      id
      orderKey
      orderNumber
      status
      total(format: RAW)
      refunds {
        nodes {
          amount
        }
      }
    }
    result
    redirect
  }
}
`;

export default CHECKOUT_MUTATION;
