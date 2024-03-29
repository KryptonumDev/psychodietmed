import { gql } from "@apollo/client";

const APPLY_COUPON = gql`
    mutation APPLY_COUPON($input: ApplyCouponInput!) {
      applyCoupon(input: $input) {
        clientMutationId
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

export default APPLY_COUPON;