import { notFound } from "next/navigation"
import { generetaSeo } from "../../../utils/genereate-seo"
import { Fetch } from "../../../utils/fetch-query"
import { GET_SEO_LANDING } from "../../../queries/landing-seo"
import Hero from "@/components/sections/LandingPage/Hero"
import Flex from "@/components/sections/LandingPage/Flex"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.landing, '/landing', GET_SEO_LANDING, 'post')
}

export default async function Landing({ params }) {
  const { data: { landingForm, landingFlex, landingPlates } } = await getData(params);
  return (
    <main id="main">
      <Hero data={landingForm} />
      <Flex data={landingFlex} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { landingPage } } } = await Fetch({
      query: `
      query Pages($uri: ID!) {
        landingPage(id: $uri, idType: URI) {
          id
          landingPages {
            landingPlates {
              title
              plates {
                text
                icon {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              linkCta {
                url
                title
              }
              contentCta
            }
            landingForm {
              title
              text
              phone
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              formId
              blueText
            }
            landingFlex {
              content
              image {
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
        uri: `${params.landing}`,
      }
    })
    if (!landingPage.id)
      notFound()

    return {
      data: landingPage.landingPages
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { body: { data: { landingPages } } } = await Fetch({
    query: `
    query PostStaticParams {
      landingPages(first: 100) {
        nodes {
          slug
        }
      }
    }
  `,
    revalidate: 0
  })

  return landingPages.nodes.map(({ slug }) => ({
    landing: slug
  }))
}