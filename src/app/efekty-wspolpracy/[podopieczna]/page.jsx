import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/case-hero"
import Cards from "@/components/sections/case-result-cards"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Post({ params }) {
  const { data } = await getData(params)
  return (
    <>
      <main>
        <Hero data={data.histori.information} />
        <Cards data={data.histori.resultsSection}/>
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { podopiecznaBy } } = await client.query({
      query: gql`
      query Pages($uri: String) {
        podopiecznaBy(uri: $uri) {
          id
          histori {
            resultsSection {
              title
              leftColumnTitle
              leftColumnList {
                text
              }
              rightColumnTitle
              rightColumnList {
                text
              }
            }
            information {
              title
              text
              resultTitle
              result
              problems {
                ... on Specjalizacja {
                  id
                  title
                  specialisation {
                    popupCasestudy {
                      title
                      text
                    }
                  }
                }
              }
              beforeImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              afterImage {
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
      variables: {
        uri: `/podopieczni/${params.podopieczna}/`,
      }
    }, { pollInterval: 500 })

    if (!podopiecznaBy.id)
      notFound()

    return {
      data: podopiecznaBy,
    }
  } catch (error) {
    notFound()
  }
}