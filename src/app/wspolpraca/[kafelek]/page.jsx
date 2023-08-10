import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import getClient from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-kafelek"
import SliderIllnes from "@/components/sections/kafelek-illnes-slider"
import SliderSymptoms from "@/components/sections/kafelek-sympotms-slider"
import CallToActionGray from "@/components/sections/call-to-action-gray"
import FlexDoubled from "@/components/sections/kafelek-flex"
import Prediction from "@/components/sections/kafelek-prediction"
import TwoColumnFlex from "@/components/sections/two-column-flex"
import CallToAction from "@/components/sections/kafelek-cta"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_KAFELEK } from "../../../queries/kafelek-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.kafelek, '/wspolpraca', GET_SEO_KAFELEK, 'post')
}

export default async function Post({ params }) {
  const { data } = await getData(params)
  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Współpraca', url: '/wspolpraca' }, { page: data.title, url: `/wspolpraca/${params.kafelek}` }]} />
      <Hero data={data.acf.heroKafelek} />
      <SliderIllnes data={data.acf.illnesSliderKafelek} />
      <SliderSymptoms data={data.acf.symptomsSliderKafelek} />
      <CallToActionGray data={data.acf.greyCtaKafelek} />
      <FlexDoubled data={data.acf.flexKafelek} />
      <Prediction data={data.acf.predictionKafelek} />
      <TwoColumnFlex data={data.acf.flexAltKafelek} />
      <CallToAction data={data.acf.ctaKafelek} />
    </main>
  )
}

async function getData(params) {
  try {
    const { data: { obszarDzilaniaBy } } = await getClient().query({
      query: gql`
      query Pages($slug: String) {
        obszarDzilaniaBy(uri: $slug){
          id
          title
          acf : obszar_dzialania {
            heroKafelek {
              title
              text
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              logo {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            illnesSliderKafelek{
              title
              illnes{
                title
                text
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
            symptomsSliderKafelek{
              title
              text
              symptoms{
                text
              }
            }
            greyCtaKafelek {
              content
              link {
                title
                url
              }
            }
            flexKafelek{
              title
              text
              imageFirst{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              imageSecond{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            predictionKafelek{
              title
              text
              illnes{
                title
              }
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              grid{
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                text
              }
              cta
              link{
                title
                url
              }
            }
            flexAltKafelek{
              content
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            ctaKafelek{
              title
              content
              link{
                title
                url
              }
              image{
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
        slug: params.kafelek,
      }
    })

    if (!obszarDzilaniaBy.id || !obszarDzilaniaBy.acf.heroKafelek.title)
      notFound()

    return {
      data: obszarDzilaniaBy,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {

  const { data: { obszaryDzialania } } = await getClient().query({
    query: gql`
    query PostStaticParams {
      obszaryDzialania(first: 100) {
        nodes {
          slug
          acf : obszar_dzialania {
            heroKafelek {
              title
            }
          }
        }
      }
    }
  `
  })

  return obszaryDzialania.nodes.filter(el => !!el.acf.heroKafelek.title).map(({ slug }) => ({
    kafelek: slug
  }))
}