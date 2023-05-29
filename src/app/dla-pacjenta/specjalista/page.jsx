'use client'
import { gql } from "@apollo/client";
import client from "../../../apollo/apolo-client";
import { InlineWidget } from "react-calendly";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Specialist() {
  const posts = await getData()

  return (
    <main>
      <InlineWidget url="https://calendly.com/d/y6h-z7h-sg3/30min" />
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
  const { data } = await client.query({
    query: gql`
      query Pages {
        posts{
          nodes{
            id
          }
        }
      }
    `,
  }, { pollInterval: 500 })

  return null
}