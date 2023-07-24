import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-case-archive"
import Metrics from "@/components/sections/case-archive-metrics"
import Tiles from "@/components/sections/case-archive-tiles"
import CallToActionTransparent from "@/components/sections/call-to-action-tranparent";
import FAQ from "@/components/sections/faq"
import Content from "@/components/sections/case-archive-content"
import { PAGE_ITEM_COUNT } from "../../constants/case"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Archive(props) {
  const { data, faq, metrics, podopieczni } = await getData(props)
  return (
    <main className="overflow">
      <Hero data={data.historyArchive.heroHistoryArchive} />
      <Metrics data={metrics} />
      <Tiles data={data.historyArchive.servicesHistoryArchive} />
      <CallToActionTransparent data={data.historyArchive.ctaHistoryArchive} />
      <Content  podopieczni={podopieczni} />
      <FAQ data={faq} />
    </main>
  )
}

async function getData(props) {
  try {
    let currentPage = props?.searchParams?.strona || 1

    const { data: { page, global, podopieczni } } = await client.query({
      query: gql`
      query Archive($offset: Int, $size: Int) {
        podopieczni(where: {offsetPagination: {size: $size, offset: $offset}}){
          pageInfo {
            offsetPagination {
              total
            }
          }
          nodes {
            id
            slug
            histori {
              information {
                resultTitle
                result
                problems {
                  ... on Specjalizacja {
                    id
                    title
                    slug
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
                differences {
                  difference
                }
              }
            }
          }
        }
        global : page(id: "cG9zdDo3Nzk=") {
          id
          global {
            metricsGlobal{
              terapyTime
              happyPacientPercent
              goopReviewsCount
            }
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
        page(id: "cG9zdDo5MzM=") {
          historyArchive {
            heroHistoryArchive {
              title
              text
              link {
                url
                title
              }
              topImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              rightImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              leftImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              wordLine{
                word
              }
            }
            servicesHistoryArchive{
              title
              text
              colorfulTiles{
                icon{
                  altText
                  mediaItemUrl
                }
                text
              }
            }
            ctaHistoryArchive{
              content : text
              link{
                url
                title
              }
            }
          }
        }
      }
    `,
      variables: {
        offset: (currentPage - 1) * PAGE_ITEM_COUNT,
        size: PAGE_ITEM_COUNT,
      },
    }, { pollInterval: 500 })

    return {
      data: page,
      faq: global.global.faq,
      metrics: global.global.metricsGlobal,
      podopieczni: podopieczni
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}