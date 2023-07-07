import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Archive() {
  const { data } = await getData()
  return (
    <main>
    </main>
  )
}

async function getData() {
  try {

    const { data: { page } } = await client.query({
      query: gql`
      query Archive($offset: Int, $size: Int) {
        page(id: "cG9zdDoxMDc1") {
          id
          heroBrand{
            logo{
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
            }
            text
            image{
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
            }
            comment{
              name
              content
              avatar{
                altText
                mediaItemUrl
              }
              link{
                title
                url
              }
            }
          }
        }
      }
    `
    }, { pollInterval: 500 })

    return {
      data: page,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}