import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Content from "@/components/sections/book-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNzg2', '/umow-wizyte', GET_SEO_PAGE)
}

export default async function Home() {
  const { specialists, specializations } = await getData()

  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Umów wizytę', url: '/umow-wizyte' }]} />
      <Content specialists={specialists} specializations={specializations} />
    </main>
  )
}

async function getData() {
  const { data: { specjalisci, specjalizacje } } = await client.query({
    query: gql`
      query Pages {
        specjalisci(first: 100) {
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
      }
    `,
  })

  return {
    specialists: specjalisci.nodes,
    specializations: specjalizacje?.nodes || []
  }
}