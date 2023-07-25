import { gql } from "@apollo/client";

const REMOVE_COUPON = gql`
    mutation REMOVE_COUPON($input: RemoveCouponsInput!) {
      removeCoupons(input: $input) {
        clientMutationId
      }
    }
`;

export default REMOVE_COUPON;