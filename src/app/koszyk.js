import { gql } from "@apollo/client";
import client from "../apollo/apolo-client";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Cart() {
  const { hero } = await getData()

  return (
    <main>
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
      }
    `,
  }, { pollInterval: 500 })

  return {
  }
}