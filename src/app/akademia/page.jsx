import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Grid from "@/components/sections/academy-grid";
import Recruitment from "@/components/sections/team-recruitment";
// import { cookies } from "next/headers";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
}

export default async function Courses() {
  const { products, page } = await getData()
  return (
    <main className="overflow">
      <Grid data={products} />
      <Recruitment data={page.akademia.specialistGridTeam} />
    </main>
  )
}

async function getData() {
  try {
    const { data: { page, viewer, products } } = await client.query({
      query: gql`
      query Pages {
        page(id: "cG9zdDoyMDM3"){
          akademia {
            specialistGridTeam{
              title
              text
              link{
                title
                url
              }
              grid{
                text
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails{
                    height
                    width
                  }
                }
              }
            }
          }
        }
        products(where: {categoryIn: "kurs"}) {
          nodes {
            productId: databaseId
            slug
            name
            excerpt
            image {
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
            product {
              course {
                ... on Course {
                  slug
                  databaseId
                }
              }
            }
          }
        }
      }
    `
    }, { pollInterval: 500 })

    return {
      products: products,
      page: page
    }
  } catch (err) {
    throw new Error(err)
  }
}