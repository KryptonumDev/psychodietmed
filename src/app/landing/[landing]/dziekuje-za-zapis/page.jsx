import { notFound } from "next/navigation"
import { generetaSeo } from "../../../../utils/genereate-seo"
import { Fetch } from "../../../../utils/fetch-query"
import { GET_SEO_LANDING } from "../../../../queries/landing-seo"
import Newsletter from "@/components/sections/newsletter"
import HeroLanding from "@/components/sections/hero-landing-result"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.landing, '/landing', GET_SEO_LANDING, 'post')
}

export default async function Landing({ params }) {
  const { data: { newsletterGlobal } } = await getData(params);
  return (
    <main id="main">
      <HeroLanding />
      <Newsletter data={newsletterGlobal} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { global } } } = await Fetch({
      query: `
      query Pages {
        global : page(id: "cG9zdDo3Nzk=") {
          id
          global {
            newsletterGlobal{
              title
              text
              consent
            }
          }
        }
      }
    `,
      revalidate: 600,
    })

    return {
      data: global.global
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}