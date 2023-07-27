import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Newsletter from "@/components/sections/newsletter";
import Success from "@/components/sections/result-success";
import Error from "@/components/sections/result-error";
import { notFound } from "next/navigation";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNzg4', '/podsumowanie', GET_SEO_PAGE)
}

export default async function Home(params) {
  const { newsletter } = await getData()

  if (params.searchParams.status !== 'success' && params.searchParams.status !== 'error') return notFound()

  return (
    <main >
      {params.searchParams.status === 'success' ? (
        <Success />
      ) : (
        <Error />
      )}
      <Newsletter data={newsletter} />
    </main>
  )
}

async function getData() {
  const { data: { global } } = await client.query({
    query: gql`
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
  }, { pollInterval: 500 })

  return {
    newsletter: global.global.newsletterGlobal,
  }
}