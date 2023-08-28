import CallToAction from "@/components/sections/cooperate-cta";
import TwoColumnFlex from "@/components/sections/two-column-flex";
import Metrics from "@/components/sections/case-archive-metrics";
import FAQ from "@/components/sections/faq";
import Grid from "@/components/sections/cooperate-grid";
import FlexAlt from "@/components/sections/cooperate-flex";
import Steps from "@/components/sections/cooperate-steps";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxMzM4', '/wspolpraca', GET_SEO_PAGE)
}

export default async function Wspolpraca() {
  const { data, faq, metrics } = await getData()

  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Współpraca', url: '/wspolpraca' }]} />
      {/* <Hero data={data.cooperate.heroCooperate} /> */}
      <Steps data={data.cooperate.stepsCooperate} />
      <CallToAction data={data.cooperate.ctaCooperate} />
      {/* <Specialisations data={data.cooperate.specialisationsCooperate} activities={activities} /> */}
      <TwoColumnFlex data={data.cooperate.flexCooperate} />
      <Metrics data={metrics} />
      <Grid data={data.cooperate.gridCooperate} />
      <FlexAlt data={data.cooperate.flexAltCooperate} />
      {/* <DigitalSlider data={products} title={'Co oferujemy?'} /> */}
      <FAQ data={faq} />
    </main>
  )
}

async function getData() {
  const { body: { data: { global, page, obszaryDzialania } } } = await Fetch({
    query: `
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
            link{
              url
              title
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
          stepsCooperate{
            title
            # first
            titleFirst
            linkFirst{
              title
              url
            }
            repeater {
              title
              illnes {
                title: name
              }
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
    }
  `,
    revalidate: 600
  })

  return {
    data: page,
    faq: global.global.faq,
    metrics: global.global.metricsGlobal,
  }
}