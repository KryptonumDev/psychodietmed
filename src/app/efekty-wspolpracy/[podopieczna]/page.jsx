import { notFound } from "next/navigation"
import Hero from "@/components/sections/hero-case"
import Cards from "@/components/sections/case-result-cards"
import ReviewsSlider from "@/components/sections/reviews-slider"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_CASE } from "../../../queries/case-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"
import { Fetch } from "../../../utils/fetch-query"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.podopieczna, '/efekty-wspolpracy', GET_SEO_CASE, 'post')
}

export default async function Post({ params }) {
  const { data, other } = await getData(params)
  return (
    <main id="main">
    <Breadcrumbs data={[{ page: 'Efekty współpracy', url: `/efekty-wspolpracy` }, { page: data.title, url: `/efekty-wspolpracy/${params.podopieczna}` }]} />
      <Hero comment={data.histori.caseStudyCard.comment} data={data.histori.information} />
      <Cards data={data.histori.resultsSection} />
      <ReviewsSlider data={{ title: 'Poznaj inne historie', text: '<p>Dowiedz się, jaka zmiana zaszła w życiu naszych pacjentek</p>', comments: other }} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { podopiecznaBy, podopieczni } } } = await Fetch({
      query: `
      query Pages($uri: String) {
        podopieczni(first: 5) {
          nodes {
            id
            slug
            title
            histori {
              information {
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
              leftColumnTitle
              leftColumnList {
                text
              }
              rightColumnTitle
              rightColumnList {
                text
              }
            }
            caseStudyCard {
              comment
            }
            information {
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
      revalidate: 600,
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

export async function generateStaticParams() {
  const { body: { data: { podopieczni } } } = await Fetch({
    query: `
    query PostStaticParams {
      podopieczni(first: 100, where: {search: "historia"}) {
        nodes {
          slug
        }
      }
    }
  `,
  cache: 'no-cache'
  })

  return podopieczni.nodes.map(({ slug }) => ({
    podopieczna: slug
  }))
}