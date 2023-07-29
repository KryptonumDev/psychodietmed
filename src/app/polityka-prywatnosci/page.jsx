import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import StepsToConsultation from "@/components/sections/steps-to-consultation";
import Content from "@/components/sections/policy-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNjQz', '/polityka-prywatnosci', GET_SEO_PAGE)
}

export default async function Regulamin() {
  const { data, specialists, book } = await getData()

  return (
    <main>
      <Content data={data.policySections} />
      <StepsToConsultation data={book} specialists={specialists} />
    </main>
  )
}

async function getData() {
  const { data: { specjalisci, global, page } } = await client.query({
    query: gql`
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
            }
          }
        }
        specjalisci(first: 100) {
          nodes {
            title
            slug
            specialisations {
              nodes {
                title : name
                id
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
  }, { pollInterval: 500 })

  return {
    data: page.privacyPolicy,
    specialists: specjalisci.nodes,
    book: global.global.bookGlobal,
  }
}