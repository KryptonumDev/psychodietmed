import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-case"
import Cards from "@/components/sections/case-result-cards"
import ReviewsSlider from "@/components/sections/reviews-slider"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_CASE } from "../../../queries/case-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.podopieczna, '/efekty-wspolpracy', GET_SEO_CASE, 'post')
}

export default async function Post({ params }) {
  const { data, other } = await getData(params)
  return (
    <main id="main">
    <Breadcrumbs data={[{ page: 'Efekty współpracy', url: `/efekty-wspolpracy` }, { page: data.title, url: `/efekty-wspolpracy/${params.podopieczna}` }]} />
      <Hero data={data.histori.information} />
      <Cards data={data.histori.resultsSection} />
      <ReviewsSlider data={{ title: 'Poznaj inne historie', text: 'Dowiedz się, jaka zmiana zaszła w życiu naszych pacjentek', comments: other }} />
    </main>
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
                boldText
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
          title
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
                id
                title : name
                specialisation {
                  popupCasestudy {
                    title
                    text
                  }
                }
              }
              boldText
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
    })

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