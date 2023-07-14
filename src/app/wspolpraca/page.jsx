import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Hero from "@/components/sections/hero-cooperate";
import CallToAction from "@/components/sections/cooperate-cta";
import Specialisations from "@/components/sections/specialisations";
import TwoColumnFlex from "@/components/sections/two-column-flex";
import Metrics from "@/components/sections/case-archive-metrics";
import FAQ from "@/components/sections/faq";
import Grid from "@/components/sections/cooperate-grid";
import FlexAlt from "@/components/sections/cooperate-flex";
import Steps from "@/components/sections/cooperate-steps";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Wspolpraca() {
  const { data, activities, faq, metrics, specialisations } = await getData()

  return (
    <main>
      <Hero data={data.cooperate.heroCooperate} />
      <Steps data={data.cooperate.stepsCooperate} specialisations={specialisations}/>
      <CallToAction data={data.cooperate.ctaCooperate} />
      <Specialisations data={data.cooperate.specialisationsCooperate} activities={activities} />
      <TwoColumnFlex data={data.cooperate.flexCooperate} />
      <Metrics data={metrics} />
      <Grid data={data.cooperate.gridCooperate} />
      <FlexAlt data={data.cooperate.flexAltCooperate} />
      {/* products */}
      <FAQ data={faq} />
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
  const { data: { global, page, obszaryDzialania, specjalizacje } } = await client.query({
    query: gql`
      query Pages {
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
        page(id: "cG9zdDoxMzM4") {
          id
          cooperate {
            heroCooperate {
              title
              text
              link {
                title
                url
              }
              grid {
                text
                icon {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
            ctaCooperate{
              content
              link{
                title
                url
              }
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            specialisationsCooperate{
              title
              text
            }
            flexCooperate{
              content
              link{
                title
                url
              }
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            gridCooperate{
              image : obrazek{
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
              content
            }
            flexAltCooperate{
              content
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            stepsCooperate{
              # first
              titleFirst
              linkFirst{
                title
                url
              }

              # second
              titleSecond
              gridSecond{
                text
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              linkSecond{
                title
                url
              }

              # third
              titleThird
              gridThird{
                text
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              linkThird{
                title
                url
              }

              # fourth
              titleFourth
              gridFourth{
                text
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        obszaryDzialania {
          nodes {
            title
            id
            slug
            uri
            obszar_dzialania {
              specialisationCard {
                zajawkaSpecjalizacji
                number
                icon {
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
        specjalizacje(first: 1000) {
          nodes {
            id
            slug
            title
            profesje {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `,
  }, { pollInterval: 500 })

  return {
    data: page,
    activities: obszaryDzialania.nodes,
    faq: global.global.faq,
    metrics: global.global.metricsGlobal,
    specialisations: specjalizacje.nodes
  }
}