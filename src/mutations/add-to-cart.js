import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
    mutation ADD_TO_CART($input: AddToCartInput!) {
      addToCart(input: $input) {
        cartItem {
          total
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
          total
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

export default ADD_TO_CART;