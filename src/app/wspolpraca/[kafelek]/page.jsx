import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-kafelek"
import SliderIllnes from "@/components/sections/kafelek-illnes-slider"
import SliderSymptoms from "@/components/sections/kafelek-sympotms-slider"
import CallToActionGray from "@/components/sections/call-to-action-gray"
import FlexDoubled from "@/components/sections/kafelek-flex"
import Prediction from "@/components/sections/kafelek-prediction"
import TwoColumnFlex from "@/components/sections/two-column-flex"
import CallToAction from "@/components/sections/kafelek-cta"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Post({ params }) {
  const { data } = await getData(params)
  return (
    <>
      <main className="overflow">
        <Hero data={data.acf.heroKafelek} />
        <SliderIllnes data={data.acf.illnesSliderKafelek} />
        <SliderSymptoms data={data.acf.symptomsSliderKafelek} />
        <CallToActionGray data={data.acf.greyCtaKafelek} />
        <FlexDoubled data={data.acf.flexKafelek} />
        <Prediction data={data.acf.predictionKafelek} />
        <TwoColumnFlex data={data.acf.flexAltKafelek}/>
        <CallToAction data={data.acf.ctaKafelek}/>
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { obszarDzilaniaBy } } = await client.query({
      query: gql`
      query Pages($slug: String) {
        obszarDzilaniaBy(uri: $slug){
          id
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
    }, { pollInterval: 500 })

    if (!obszarDzilaniaBy.id)
      notFound()

    return {
      data: obszarDzilaniaBy,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}