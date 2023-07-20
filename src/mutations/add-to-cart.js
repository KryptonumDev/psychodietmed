import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
    mutation ADD_TO_CART($input: AddToCartInput!) {
      addToCart(input: $input) {
        cartItem {
          total
        }
      }
    }
`;

export default ADD_TO_CART;