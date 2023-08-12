import Slider from "@/components/sections/products-slider";
import Hero from "@/components/sections/hero-statute";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNjMw', '/regulamin', GET_SEO_PAGE)
}

export default async function Regulamin() {
  const { data, products } = await getData()

  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Regulamin', url: '/regulamin' }]} />
      <Hero data={data.heroStatute} />
      <Slider products={products} />
    </main>
  )
}

async function getData() {
  const { body: { data } } = await Fetch({
    query: `
    query Pages {
      page(id: "cG9zdDoxNjMw") {
        statute {
          heroStatute {
            title
            text
            files {
              file {
                title
                altText
                mediaItemUrl
                mediaDetails {
                  sizes {
                    fileSize
                  }
                }
              }
            }
          }
        }
      }
      products(first: 5, where: {categoryNotIn: ["ebook", "kurs", "bundle"]} ) {
        nodes {
          product {
            discount
            bundleItems {
              text
            }
          }
          id
          productId: databaseId
          slug
          name
          image {
            id
            altText
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
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
        }
      }
    }
  `,
    revalidate: 3600
  })

  return {
    products: data.products.nodes,
    data: data.page.statute,
  }
}