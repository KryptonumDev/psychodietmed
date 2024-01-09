import { notFound } from "next/navigation"
import Hero from "@/components/sections/hero-case-archive"
import Metrics from "@/components/sections/case-archive-metrics"
import Tiles from "@/components/sections/case-archive-tiles"
import CallToActionTransparent from "@/components/sections/call-to-action-tranparent";
import FAQ from "@/components/sections/faq"
import Content from "@/components/sections/case-archive-content"
import { PAGE_ITEM_COUNT } from "../../constants/case"
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata() {
  return await generetaSeo('cG9zdDo5MzM=', `/historia-marki`, GET_SEO_PAGE)
} 

export default async function Archive() {
  const { data, faq, metrics, podopieczni } = await getData()
  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Efekty współpracy', url: `/efekty-wspolpracy` }]} />
      <Hero data={data.historyArchive.heroHistoryArchive} />
      <Metrics data={metrics} />
      <Tiles data={data.historyArchive.servicesHistoryArchive} />
      <CallToActionTransparent data={data.historyArchive.ctaHistoryArchive} />
      <Content podopieczni={podopieczni} />
      <FAQ data={faq} />
    </main>
  )
}

async function getData() {
  try {
    const result = await fetch('https://wp.psychodietmed.pl/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query Archive($offset: Int, $size: Int) {
          podopieczni(where: {search: "historia", offsetPagination: {size: $size, offset: $offset}}){
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
                  text
                  problems {
                    id
                    title : name
                    slug
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
                  specialist {
                    ... on Specjalista {
                      title
                      slug
                      proffesional {
                        index
                        avatar {
                          altText
                          mediaItemUrl
                          mediaDetails{
                            width
                            height
                          }
                        }
                      }
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
      ` ,
        variables: {
          offset: 0,
          size: PAGE_ITEM_COUNT,
        }
      }),
      next: {
        revalidate: 600
      }
    });

    const { data: { page, global, podopieczni } } = await result.json()

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