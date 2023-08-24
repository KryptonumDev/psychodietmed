import { notFound } from "next/navigation"
import Hero from "@/components/sections/hero-specialist"
import Flex from "@/components/sections/specialist-flex"
import FAQ from "@/components/sections/faq"
import Reviews from "@/components/sections/specialist-reviews"
import Specialists from "@/components/sections/specialists-slider"
import Calendar from "@/components/sections/calendar-widget"
import { GET_SEO_SPECIALIST } from "../../../queries/specialist-seo"
import { generetaSeo } from "../../../utils/genereate-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"
import { Fetch } from "../../../utils/fetch-query"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.specjalista, '', GET_SEO_SPECIALIST, 'post')
}

export default async function Specjalista({ params }) {
  const { data, faq, other } = await getData(params)
  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Specjaliści', url: `/specjalisci` }, { page: data.title, url: `/specjalisci/${params.specjalista}` }]} />
      <Hero data={data} />
      <Flex
        content={data.proffesional.excerpt}
        diploms={data.proffesional.diploms}
        courses={data.proffesional.courses}
        certificates={data.proffesional.certificates}
      />
      <Calendar
        name={data.title}
        specialistId={data.proffesional.specialistId}
        serviceId={data.proffesional.serviceId}
      />
      {data.proffesional.reviews && (
        <Reviews data={data.proffesional.reviews} />
      )}
      <Specialists data={other} title={'Podobni specjaliści'} />
      <FAQ data={faq} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { specjalisci, specjalistaBy, page } } } = await Fetch({
      query: `
      query Pages($uri: String) {
        specjalisci(first: 100) {
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
              proffesion
              specialistId
              serviceId
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
        page(id: "cG9zdDo3Nzk=") {
          id
          global {
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
        specjalistaBy(uri:  $uri) {
          id
          title
          specialisations {
            nodes {
              id : databaseId
              title : name
            }
          }
          proffesional {
            proffesion
            pacientsAge
            excerpt
            specialistId
            serviceId
            diploms {
              diplom
            }
            courses {
              course
            }
            reviews {
              title
              content
              authorName
              authorAvatar {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            certificates {
              certificate {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
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
    `,
      revalidate: 600,
      variables: {
        uri: `${params.specjalista}`,
      }
    })

    if (!specjalistaBy.id)
      notFound()

    return {
      data: specjalistaBy,
      faq: page.global.faq,
      other: specjalisci.nodes.filter(item => item.slug !== params.specjalista)
    }
  } catch (error) {
    notFound()
  }
}

export async function generateStaticParams() {
  const { body: { data: { specjalisci } } } = await Fetch({
    query: `
    query PostStaticParams {
      specjalisci(first: 100) {
        nodes {
          slug
        }
      }
    }
  `,
    revalidate: 0
  })

  return specjalisci.nodes.map(({ slug }) => ({
    specjalista: slug
  }))
}