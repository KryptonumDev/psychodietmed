import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-blog"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Blog() {
  const { hero, posts } = await getData()

  return (
    <main>
      <Hero data={hero} posts={posts.slice(0, 4)} />
    </main>
  )
}

async function getData() {
  const { data: { posts, page: { blog } } } = await client.query({
    query: gql`
      query Pages {
        posts {
          nodes {
            id
            dateGmt
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            slug
            title
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
        page(id: "cG9zdDo2NzA=") {
          blog {
            hero : sekcjaPowitalnaBlog {
              pageTitle
              text
            }
          }
        }
      }
    `,
  }, { pollInterval: 500 })

  return {
    posts: posts.nodes,
    hero: blog.hero,
  }
}