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
import DigitalSlider from "@/components/sections/digital-products-slider";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxMzM4', '/wspolpraca', GET_SEO_PAGE)
}

export default async function Wspolpraca() {
  const { products, data, activities, faq, metrics } = await getData()

  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Współpraca', url: '/wspolpraca' }]} />
      <Hero data={data.cooperate.heroCooperate} />
      <Steps data={data.cooperate.stepsCooperate} />
      <CallToAction data={data.cooperate.ctaCooperate} />
      <Specialisations data={data.cooperate.specialisationsCooperate} activities={activities} />
      <TwoColumnFlex data={data.cooperate.flexCooperate} />
      <Metrics data={metrics} />
      <Grid data={data.cooperate.gridCooperate} />
      <FlexAlt data={data.cooperate.flexAltCooperate} />
      <DigitalSlider data={products} title={'Co oferujemy?'} />
      <FAQ data={faq} />
    </main>
  )
}

async function getData() {
  const { data: { products, global, page, obszaryDzialania } } = await client.query({
    query: gql`
      query Pages {
        products(where: {orderby: {field: DATE, order: DESC}, categoryNotIn: ["kurs"]}, first: 12) {
          nodes {
            product {
              discount
              bundleItems {
                text
              }
            }
            id
            productId: databaseId
            slug
            name
            image {
              id
              altText
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            ... on SimpleProduct {
              id
              price
              regularPrice
            }
            ... on VariableProduct {
              id
              price
              regularPrice
              attributes {
                nodes {
                  variation
                  name
                  options
                  attributeId
                }
              }
              variations {
                nodes {
                  id
                  name
                  price
                  regularPrice
                  productId: databaseId
                  attributes {
                    nodes {
                      value
                      name
                      attributeId
                    }
                  }
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
      }
    `,
  })

  return {
    data: page,
    activities: obszaryDzialania.nodes,
    faq: global.global.faq,
    metrics: global.global.metricsGlobal,
    products: products.nodes
  }
}