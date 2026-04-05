import Newsletter from "@/components/sections/newsletter";
import Success from "@/components/sections/result-success";
// import { notFound } from "next/navigation";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Failed from "@/components/sections/result-failed";
import Error from "@/components/sections/result-error";
import { Fetch } from "../../utils/fetch-query";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNzg4', '/podsumowanie', GET_SEO_PAGE)
}

export default async function Home(params) {
  const { newsletter } = await getData()

  // if (params.searchParams.status !== 'success' && params.searchParams.status !== 'failed' && params.searchParams.status !== 'error') return notFound()

  return (
    <main >
      {params.searchParams.status === 'success' ? (
        <Success />
      ) : params.searchParams.status === 'failed' ? (
        <Failed />
      ) : params.searchParams.status === 'error' ? (
        <Error />
      ) : null}
      <Newsletter data={newsletter} />
    </main>
  )
}

async function getData() {
  const { body: { data: { global } } } = await Fetch({
    query: `
    query Pages {
      global : page(id: "cG9zdDo3Nzk=") {
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
    revalidate: 600
  })

  return {
    newsletter: global.global.newsletterGlobal,
  }
}