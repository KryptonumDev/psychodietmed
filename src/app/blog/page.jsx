import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-blog"
import Content from "@/components/sections/content-blog"
import { PAGE_ITEM_COUNT } from "../../constants/blog"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Blog() {
  const { hero, posts, newPosts, postsTotalCount, categories } = await getData()
  return (
    <main>
      <Hero data={hero} posts={newPosts} />
      <Content categories={categories} page='1' data={posts} totalCount={postsTotalCount} />
    </main>
  )
}

async function getData() {
  const { data: { categories, newPosts, posts, page: { blog } } } = await client.query({
    query: gql`
      query Pages($size: Int) {
        categories(first: 100) {
          nodes {
            slug
            name
            id
          }
        }
        newPosts: posts(first: 4) {
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
                id
              }
            }
          }
        }
        posts(where: {offsetPagination: {size: $size, offset: 0}}) {
          pageInfo {
            offsetPagination {
              total
            }
          }
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
                id
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
    variables: {
      size: PAGE_ITEM_COUNT,
    },
  }, { pollInterval: 500 })

  return {
    posts: posts.nodes,
    postsTotalCount: posts.pageInfo.offsetPagination.total,
    hero: blog.hero,
    newPosts: newPosts.nodes,
    categories: categories.nodes
  }
}