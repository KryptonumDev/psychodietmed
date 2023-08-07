import { gql } from "@apollo/client";
import  getClient from "../../apollo/apolo-client";
import Content from "@/components/sections/book-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNzg2', '/umow-wizyte', GET_SEO_PAGE)
}

export default async function Home() {
  const { specialists } = await getData()

  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Umów wizytę', url: '/umow-wizyte' }]} />
      <Content specialists={specialists}/>
    </main>
  )
}

async function getData() {
  const { data: { specjalisci } } = await getClient().query({
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
              docotorCalendarCode
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
  }
}