import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import FlexibleContent from "@/components/sections/product-flexible-content"
import BundleContains from "@/components/sections/product-bundle-contains"
import StepsToConsultation from "@/components/sections/steps-to-consultation"
import ImportantInformation from "@/components/sections/product-important-information"
import Hero from "@/components/sections/hero-product"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Post({ params }) {
  const { data, global, specialists } = await getData(params)
  return (
    <main>
      <Hero data={data} />
      <FlexibleContent productId={data.productId} data={data.product.additionalSectionsProduct} />
      {data.product.bundleItems?.length > 0 && (
        <BundleContains productId={data.productId} data={data.product.bundleItems} />
      )}
      <StepsToConsultation data={global.bookGlobal} specialists={specialists} />
      <ImportantInformation data={global.importantInformationGlobal} />
    </main>
  )
}

async function getData(params) {
  try {
    const { data: { product, global, specialists } } = await client.query({
      query: gql`
      query Pages($uri: ID!) {
        specialists: specjalisci {
          nodes {
            title
            slug
            proffesional {
              proffesion
              personImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              specialisations {
                ... on Specjalizacja {
                  id
                  title
                }
              }
            }
          }
        }
        global : page(id: "cG9zdDo3Nzk=") {
          id
          global {
            importantInformationGlobal{
              title
              list{
                text
              }
            }
            bookGlobal{
              title
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              titleFirst
              textFirst
              illnes{
                ... on Specjalizacja {
                  id
                  slug
                  title
                }
              }
              titleSecond
              textSecond
              titleThird
              textThird
            }
          }
        }
        product(id: $uri, idType: SLUG) {
          id
          productId: databaseId
          title
          description
          featuredImage {
            node {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
          }
          ... on SimpleProduct {
            id
            price
            regularPrice
          }
          ... on VariableProduct {
            id
            price
            regularPrice
            attributes {
              nodes {
                variation
                name
                options
                attributeId
              }
            }
            variations {
              nodes {
                id
                name
                price
                regularPrice
                productId: databaseId
                attributes {
                  nodes {
                    value
                    name
                    attributeId
                  }
                }
              }
            }
          }
          product {
            bundleItems {
              text
            }
            additionalSectionsProduct {
              ... on Product_Product_AdditionalSectionsProduct_TwoColumnFlex {
                content
                fieldGroupName
                image {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              ... on Product_Product_AdditionalSectionsProduct_TwoColumnGrid {
                fieldGroupName
                title
                grid {
                  text
                  icon {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
              ... on Product_Product_AdditionalSectionsProduct_TwoColumnList {
                fieldGroupName
                title
                lista {
                  text
                  icon {
                    altText
                    mediaItemUrl
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
    `,
      variables: {
        uri: `${params.product}`,
      }
    }, { pollInterval: 500 })

    if (!product.id)
      notFound()

    return {
      data: product,
      global: global.global,
      specialists: specialists.nodes
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}