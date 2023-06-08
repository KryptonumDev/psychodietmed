import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/case-hero"
import Cards from "@/components/sections/case-result-cards"
import ReviewsSlider from "@/components/sections/reviews-slider"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Post({ params }) {
  const { data, other } = await getData(params)
  return (
    <>
      <main>
        <Hero data={data.histori.information} />
        <Cards data={data.histori.resultsSection} />
        <ReviewsSlider data={{ title: 'Poznaj inne historie', text: 'Dowiedz się, jaka zmiana zaszła w życiu naszych pacjentek', comments: other }} />
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { podopiecznaBy, podopieczni } } = await client.query({
      query: gql`
      query Pages($uri: String) {
        podopieczni(first: 5) {
          nodes {
            id
            slug
            histori {
              information {
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
              caseStudyCard {
                name
                linkText
                comment
                avatar {
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
        uri: `${params.podopieczna}`,
      }
    }, { pollInterval: 500 })

    if (!podopiecznaBy.id)
      notFound()

    return {
      data: podopiecznaBy,
      other: podopieczni.nodes.filter(el => el.id !== podopiecznaBy.id)
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}