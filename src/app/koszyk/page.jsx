import { gql } from "@apollo/client";
import  getClient from "../../apollo/apolo-client";
import Content from "@/components/sections/cart";
import Slider from "@/components/sections/products-slider";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxODcw', '/koszyk', GET_SEO_PAGE)
}

export default async function Cart() {
  const { products } = await getData()

  return (
    <main id="main">
      <Content/>
      <Slider products={products}/>
    </main>
  )
}

async function getData() {
  const { data } = await getClient().query({
    query: gql`
      query Pages {
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
  })

  return {
    products: data.products.nodes,
  }
}