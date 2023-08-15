import { gql } from "@apollo/client";

/**
 * Update Cart
 *
 * This query is used for both updating the items in the cart and delete a cart item.
 * When the cart item needs to be deleted, we should pass quantity as 0 in the input along with other fields.
 */
const UPDATE_CART = gql`
mutation UPDATE_CART($input: UpdateItemQuantitiesInput!) {
  updateItemQuantities(input: $input) {
    removed {
      key
    }
    updated {
      key
    }
    cart {
      contents {
        nodes {
          key
          extraData {
            value
            key
          }
          product {
            node {
              id
              productId: databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              galleryImages {
                nodes {
                  id
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                  srcSet
                  title
                }
              }
              ... on SimpleProduct {
                price
                regularPrice
                salePrice
              }
            }
          }
          variation {
            node {
              id
              variationId: databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
                title
              }
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons {
        code
        discountAmount
        discountTax
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total(format: RAW)
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
      # new
      availableShippingMethods {
        supportsShippingCalculator
        packageDetails
        rates {
          cost
          methodId
          label
          instanceId
        }
      }
      needsShippingAddress
    }
  }
}
`;

export default UPDATE_CART;
