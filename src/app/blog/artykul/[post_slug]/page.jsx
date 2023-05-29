import { gql } from "@apollo/client";
import client from "../../../../apollo/apolo-client";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Post() {
  const { hero } = await getData()

  return (
    <main>
    </main>
  )
}

async function getData() {
  const { data } = await client.query({
    query: gql`
      query Post {
        posts{
          nodes{
            id
          }
        }
      }
    `,
  }, { pollInterval: 500 })

  return {
  }
}

export async function generateStaticParams() {
  const { data: { posts } } = await client.query({
    query: gql`
      query Pages {
        posts{
          nodes{
            slug
          }
        }
      }
    `,
  })

  return posts.nodes.map((post) => ({
    post_slug: post.slug,
  }));
}