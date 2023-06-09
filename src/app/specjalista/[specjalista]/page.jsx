import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-specialist"
import Flex from "@/components/sections/specialist-flex"
import FAQ from "@/components/sections/faq"
import Reviews from "@/components/sections/specialist-reviews"
// import { InlineWidget } from "react-calendly"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Specjalista({ params }) {
  const { data, faq } = await getData(params)
  return (
    <>
      <main>
        <Hero data={data} />
        <Flex
          content={data.proffesional.excerpt}
          diploms={data.proffesional.diploms}
          courses={data.proffesional.courses}
          certificates={data.proffesional.certificates}
        />
        {/* <InlineWidget url="https://calendly.com/d/y6h-z7h-sg3/30min" /> */}
        <Reviews data={data.proffesional.reviews} />
        {/* other specialists */}
        <FAQ data={faq} />
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { specjalistaBy, page } } = await client.query({
      query: gql`
      query Pages($uri: String) {
        page(id: "cG9zdDo3Nzk=") {
          id
          global {
            faq {
              title
              text
              qa {
                answer
                question
              }
            }
          }
        }
        specjalistaBy(uri:  $uri) {
          id
          title
          proffesional {
            proffesion
            pacientsAge
            excerpt
            diploms {
              diplom
            }
            courses {
              course
            }
            reviews {
              title
              content
              authorName
              authorAvatar {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            certificates {
              certificate {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
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
    `,
      variables: {
        uri: `${params.specjalista}`,
      }
    }, { pollInterval: 500 })

    if (!specjalistaBy.id)
      notFound()

    return {
      data: specjalistaBy,
      faq: page.global.faq,
    }
  } catch (error) {
    notFound()
  }
}
