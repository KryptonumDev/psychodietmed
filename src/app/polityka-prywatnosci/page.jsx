import StepsToConsultation from "@/components/sections/steps-to-consultation";
import Content from "@/components/sections/policy-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNjQz', '/polityka-prywatnosci', GET_SEO_PAGE)
}

export default async function Regulamin() {
  const { data, specialists, book } = await getData()

  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Polityka prywatności', url: '/polityka-prywatnosci' }]} />
      <Content data={data.policySections} />
      <StepsToConsultation data={book} specialists={specialists} />
    </main>
  )
}

async function getData() {
  const { body: { data: { specjalisci, global, page } } } = await Fetch({
    query: `
    query Pages {
      global : page(id: "cG9zdDo3Nzk=") {
        id
        global {
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
            index
            proffesion
            specialistId
            serviceId
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
      page(id: "cG9zdDoxNjQz") {
        privacyPolicy {
          policySections {
            title
            content
          }
        }
      }
    }
  `,
    revalidate: 600
  })

  return {
    data: page.privacyPolicy,
    specialists: specjalisci.nodes,
    book: global.global.bookGlobal,
  }
}