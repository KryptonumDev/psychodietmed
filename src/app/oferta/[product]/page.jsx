import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import  getClient from "../../../apollo/apolo-client"
import FlexibleContent from "@/components/sections/product-flexible-content"
import BundleContains from "@/components/sections/product-bundle-contains"
import StepsToConsultation from "@/components/sections/steps-to-consultation"
import ImportantInformation from "@/components/sections/product-important-information"
import Hero from "@/components/sections/hero-product"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_PRODUCT } from "../../../queries/product-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.product, '/akademia', GET_SEO_PRODUCT, 'post')
}

export default async function Post({ params }) {
  const { data, global, specialists } = await getData(params)
  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Sklep', url: `/oferta` }, { page: data.title, url: `/oferta/${params.product}` }]} />
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
    const { data: { product, global, specialists } } = await getClient().query({
      query: gql`
      query Pages($uri: ID!) {
        specialists: specjalisci(first: 100) {
          nodes {
            title
            slug
            specialisations {
              nodes {
                id : databaseId
                title : name
              }
            }
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
              titleSecond
              textSecond
              titleThird
              textThird
              illnes {
                id : databaseId
                title : name
              }
            }
          }
        }
        product(id: $uri, idType: SLUG) {
          id
          productId: databaseId
          title
          description
          addons {
            name
            ... on AddonMultipleChoice {
              description
              name
              options {
                price
                label
              }
              fieldName
            }
          }
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
            price(format: RAW)
            regularPrice(format: RAW)
          }
          ... on VariableProduct {
            id
            price(format: RAW)
            regularPrice(format: RAW)
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
                price(format: RAW)
                regularPrice(format: RAW)
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
    })

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

export async function generateStaticParams() {
  const { data: { products } } = await getClient().query({
    query: gql`
    query PostStaticParams {
      products(
        first: 100,
        where: {categoryNotIn: ["kurs"]}
      ) {
        nodes {
          slug
        }
      }
    }
  `
  })

  return products.nodes.map(({ slug }) => ({
    product: slug
  }))
}