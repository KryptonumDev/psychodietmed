import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Newsletter from "@/components/sections/newsletter";
import Success from "@/components/sections/result-success";
import Error from "@/components/sections/result-error";
import { notFound } from "next/navigation";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

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

// async function getSeo() {
//   const { data } = await client.query({
//     query: gql`
//       query Seo {
//       }
//     `,
//   }, { pollInterval: 500 })

//   return {
//     ''
//   }
// }

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