import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-brand"
import History from "@/components/sections/brand-history"
import Name from "@/components/sections/brand-name"
import TwoColumnFlexMultiText from "@/components/sections/flex-two-texts"
import TwoColumnFlexMultiImages from "@/components/sections/flex-two-images-three-texts"
import TwoColumnFlex from "@/components/sections/two-column-flex"
import Metrics from "@/components/sections/case-archive-metrics"
import OtherPosts from "@/components/sections/other-posts"
import Newsletter from "@/components/sections/newsletter"
import CallToAction from "@/components/sections/brand-cta"
import TwoColumnFlexWithGrid from "@/components/sections/brand-flex-and-grid"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Archive() {
  const { data, metrics, newsletter, posts, blog } = await getData()
  return (
    <main>
      <Hero data={data.brandHistory.heroBrand} />
      <History data={data.brandHistory.historyBrand} />
      <Name data={data.brandHistory.nameBrand}/>
      <TwoColumnFlexMultiText data={data.brandHistory.flexBrand}/>
      <TwoColumnFlexMultiImages data={data.brandHistory.flexImagesBrand}/>
      <TwoColumnFlex data={data.brandHistory.missionBrand}/>
      <Metrics data={metrics}/>
      <CallToAction data={data.brandHistory.callToActionBrand}/>
      <TwoColumnFlexWithGrid data={data.brandHistory.flexSecondBrand}/>

      <Newsletter data={newsletter}/>
      <OtherPosts data={posts} title={blog.title} text={blog.text}/>
    </main>
  )
}

async function getData() {
  try {

    const { data: { page, global, posts } } = await client.query({
      query: gql`
      query Page {
        posts(first: 3) {
          nodes {
            id
            dateGmt
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            slug
            title
            excerpt
            categories {
              nodes {
                name
                slug
                id
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
            newsletterGlobal{
              title
              text
              consent
            }
            blogGlobal{
              title
              text
            }
          }
        }
        page(id: "cG9zdDoxMDc1") {
          id
          brandHistory{
            heroBrand{
              logo{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
              text
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
              comment{
                name
                content
                avatar{
                  altText
                  mediaItemUrl
                }
                link{
                  title
                  url
                }
              }
            }
            historyBrand{
              title
              text
              grid{
                icon{
                  altText
                  mediaItemUrl
                }
                text
              }
            }
            nameBrand{
              psycho
              diet
              med
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
              title
              text
              signature{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            flexBrand{
              contentFirstPart
              contentSecondPart
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            flexImagesBrand{
              contentFirst
              contentSecond
              contentThird
              imageFirst{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
              imageSecond{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            missionBrand{
              content
              link{
                title
                url
              }
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            flexSecondBrand{
              content
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
              gridKafelkow{
                content
                image{
                  altText
                  mediaItemUrl
                  mediaDetails{
                    height
                    width
                  }
                }
              }
            }
            callToActionBrand{
              title
              content : text
              link{
                title
                url
              }
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
          }
        }
      }
    `
    }, { pollInterval: 500 })

    return {
      data: page,
      metrics: global.global.metricsGlobal,
      newsletter: global.global.newsletterGlobal,
      posts: posts.nodes,
      blog: global.global.blogGlobal
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}