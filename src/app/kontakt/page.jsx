import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Contact from "@/components/sections/contact";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Specialist() {
  const { form } = await getData()

  return (
    <main>
      <Contact data={form}/>
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
  const { data: { page: { kontakt } } } = await client.query({
    query: gql`
      query Pages {
        page(id: "cG9zdDo3MjQ=") {
          kontakt {
            form : contactFormGroup {
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
            }
          }
        }
      }
    `,
  }, { pollInterval: 500 })

  return {
    form: kontakt.form
  }
}