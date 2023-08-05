import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-tool"
import Flex from "@/components/sections/tool-flex"
import Grid from "@/components/sections/tool-grid"
import FlexAlt from "@/components/sections/tool-flex-alt"
import Warning from "@/components/sections/tool-warning"
import CallToAction from "@/components/sections/tool-cta"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_TOOL } from "../../../queries/tool-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.tool, '/narzedzia', GET_SEO_TOOL, 'post')
}

export default async function Post({ params }) {
  const { data, global } = await getData(params)
  return (
    <>
      <main className="overflow" id="main">
        <Breadcrumbs data={[{ page: 'Narzędzia', url: `/narzedzia` }, { page: data.title, url: `/narzedzia/${params.tool}` }]} />
        <Hero data={data.tool.heroTool} />
        <Flex data={data.tool.twoColumnFlexTool} />
        <Grid data={data.tool.gridTool} />
        <FlexAlt data={data.tool.twoColumnFlexAltTool} />
        <Warning data={data.tool.alertTool} />
        <CallToAction data={global.global.callToActionGlobal} />
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { narzedzie, global } } = await client.query({
      query: gql`
      query Pages($uri: ID!) {
        global : page(id: "cG9zdDo3Nzk=") {
          id
          global {
            callToActionGlobal {
              title
              content
              link {
                title
                url
              }
              image {
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
        narzedzie(id: $uri, idType: URI) {
          id
          title
          tool {
            heroTool {
              title
              subTitle
              description : opisNarzedzia
              calculatorType
            }
            twoColumnFlexTool{
              title
              text
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            gridTool{
              title
              grid{
                tile
              }
            }
            twoColumnFlexAltTool{
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
            alertTool{
              title
              content
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
        uri: `${params.tool}`,
      }
    })

    if (!narzedzie.id)
      notFound()

    return {
      data: narzedzie,
      global: global
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}