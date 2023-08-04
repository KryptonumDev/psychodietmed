import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Contact from "@/components/sections/contact";
import DigitalSlider from "@/components/sections/digital-products-slider";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDo3MjQ=', '/koszyk', GET_SEO_PAGE)
}

export default async function Specialist() {
  const { form, products } = await getData()

  return (
    <main id="main">
      <Contact data={form} />
      <DigitalSlider data={products} />
    </main>
  )
}

async function getData() {
  const { data: { products, page: { kontakt } } } = await client.query({
    query: gql`
      query Pages {
        products(where: {orderby: {field: DATE, order: DESC}}, first: 12) {
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
        page(id: "cG9zdDo3MjQ=") {
          kontakt {
            form : contactFormGroup {
              subjects{
                subject
              }
              title
              text
              image {
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
    `,
  }, { pollInterval: 500 })

  return {
    form: kontakt.form,
    products: products.nodes
  }
}