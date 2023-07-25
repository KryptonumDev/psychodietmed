import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Slider from "@/components/sections/products-slider";
import Hero from "@/components/sections/hero-statute";
import StepsToConsultation from "@/components/sections/steps-to-consultation";
import Content from "@/components/sections/policy-content";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Regulamin() {
  const { data, specialists, book } = await getData()

  return (
    <main>
      <Content data={data.policySections} />
      <StepsToConsultation data={book} specialists={specialists} />
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
              illnes{
                ... on Specjalizacja {
                  id
                  slug
                  title
                }
              }
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
              specialisations {
                ... on Specjalizacja {
                  id
                  title
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