import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Content from "@/components/sections/checkout-content";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Checkout() {
  // const { hero } = await getData()

  return (
    <main>
      <Content/>
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

// async function getData() {
//   const { data } = await client.query({
//     query: gql`
//       query Pages {
//         posts{
//           nodes{
//             id
//           }
//         }
//       }
//     `,
//   }, { pollInterval: 500 })

//   return {
//   }
// }