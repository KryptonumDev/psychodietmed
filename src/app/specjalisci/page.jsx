import { notFound } from "next/navigation"
import { generetaSeo } from "../../utils/genereate-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"
import { Fetch } from "../../utils/fetch-query"
import CallToActionGray from "@/components/sections/call-to-action-gray"
import { GET_SEO_PAGE } from "../../queries/page-seo"
import Content from "@/components/sections/specialists-archive"

export async function generateMetadata({ params }) {
  return await generetaSeo('cG9zdDoxODcz', '', GET_SEO_PAGE)
}

export const dynamic = 'force-dynamic'

export default async function Specjalista({ params }) {
  const { specialists } = await getData(params)
  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Specjaliści', url: `/specjalisci` }]} />
      <Content data={specialists} />
      <CallToActionGray data={{ content: "<h2>Masz problem z podjęciem decyzji?</h2><p>Napisz do nas – wskażemy Ci odpowiedni kierunek leczenia. </p>", link: { url: '/kontakt', title: 'Skontaktuj się' } }} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data } } = await Fetch({ // TODO: add pagination
      query: `
      query Pages {
        specialists: specjalisci(first: 9) {
          nodes {
            title
            slug
            specialisations {
              nodes {
                id : databaseId
                title : name
              }
            }
            proffesional {
              index
              specialistId
              serviceId
              proffesion
              excerpt
              personImage {
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
      }
    })

    return {
      specialists: data.specialists,
    }
  } catch (error) {
    notFound()
  }
}