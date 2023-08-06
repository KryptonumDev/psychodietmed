import { gql } from "@apollo/client";
import  getClient from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Grid from "@/components/sections/academy-grid";
import Recruitment from "@/components/sections/team-recruitment";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/sections/breadcrumbs";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoyMDM3', '/akademia', GET_SEO_PAGE)
}

export default async function Courses() {
  const authToken = cookies().get('authToken')?.value

  if (!authToken) redirect('/logowanie')

  const { products, page } = await getData()
  const { user } = await getUser(authToken)

  return (
    <main className="overflow">
      <Breadcrumbs data={[{ page: 'Akademia', url: `/akademia` }]} />
      <Grid user={user} data={products} />
      <Recruitment data={page.akademia.specialistGridTeam} />
    </main>
  )
}

async function getUser(authToken) {
  try {
    const { data: { viewer } } = await getClient().query({
      query: gql`
      query Viewer {
        viewer {
          username
          courses {
            nodes {
              databaseId
            }
          }
        }
      }
    `,
      context: {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }
    }, { pollInterval: 500 })

    return {
      user: viewer
    }
  } catch (error) {
    return {
      user: null
    }
  }
}

async function getData() {
  try {
    const { data: { page, viewer, products } } = await getClient().query({
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
    })

    return {
      products: products,
      page: page
    }
  } catch (err) {
    throw new Error(err)
  }
}