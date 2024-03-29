import { notFound } from "next/navigation"
import FlexibleContent from "@/components/sections/product-flexible-content"
import BundleContains from "@/components/sections/product-bundle-contains"
import ImportantInformation from "@/components/sections/product-important-information"
import Hero from "@/components/sections/hero-product"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_PRODUCT } from "../../../queries/product-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"
import { Fetch } from "../../../utils/fetch-query"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.product, '/akademia', GET_SEO_PRODUCT, 'post')
}

export default async function Post({ params }) {
  const { data } = await getData(params)
  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Akademia', url: `/akademia` }, { page: data.title, url: `/akademia/${params.product}` }]} />
      <Hero data={data} />
      <FlexibleContent productId={data.productId} data={data.product.additionalSectionsProduct} />
      {data.product.bundleItems?.length > 0 && (
        <BundleContains productId={data.productId} data={data.product.bundleItems} />
      )}
      <ImportantInformation data={data.product.importantInformation} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { product } } } = await Fetch({
      query: `
      query Pages($uri: ID!) {
        product(id: $uri, idType: SLUG) {
          id
          productId: databaseId
          title
          description
          productCategories{
            nodes{
              slug
            }
          }
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
            importantInformation{
              title
              list{
                text
              }
            }
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
      revalidate: 600,
      variables: {
        uri: `${params.product}`,
      }
    })

    if (!product.id || product.productCategories.nodes.some(({ slug }) => slug !== 'ebook'))
      notFound()

    return {
      data: product,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { body: { data: { products } } } = await Fetch({
    query: `
      query PostStaticParams {
        products(
          first: 100,
          where: {categoryIn: ["ebook"]}
        ) {
          nodes {
            slug
          }
        }
      }
    `,
    cache: 'no-cache'
  })

  return products.nodes.map(({ slug }) => ({
    product: slug
  }))
}