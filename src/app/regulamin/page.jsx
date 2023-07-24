import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Slider from "@/components/sections/products-slider";
import Hero from "@/components/sections/hero-statute";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Regulamin() {
  const { data, products } = await getData()

  return (
    <main>
      <Hero data={data.heroStatute} />
      <Slider products={products} />
    </main>
  )
}

// async function getSeo() {
//   const { data } = await client.query({
//     query: gql`
//       query Seo {
//       }
//     `,
//   }, { pollInterval: 500 })

//   return {
//     ''
//   }
// } 

async function getData() {
  const { data } = await client.query({
    query: gql`
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
        products(first: 5) {
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
  }, { pollInterval: 500 })

  return {
    products: data.products.nodes,
    data: data.page.statute,
  }
}