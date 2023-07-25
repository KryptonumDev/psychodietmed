import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-blog"
import Content from "@/components/sections/content-blog"
import { PAGE_ITEM_COUNT } from "../../constants/blog"
import { notFound } from 'next/navigation';

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Blog({ params }) {
  const { categories, hero, posts, newPosts, postsTotalCount } = await getData(params.page)

  return (
    <main>
      <Hero data={hero} posts={newPosts} />
      <Content categories={categories} page={params.page} data={posts} totalCount={postsTotalCount} />
    </main>
  )
}

async function getData(currentPage = 1) {
  try {
    const { data: { categories, newPosts, posts, page: { blog } } } = await client.query({
      query: gql`
      query Pages($offset: Int, $size: Int) {
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
        posts(where: {offsetPagination: {size: $size, offset: $offset}}) {
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
        offset: (currentPage - 1) * PAGE_ITEM_COUNT,
        size: PAGE_ITEM_COUNT,
      },
    }, { pollInterval: 500 })

    if (!posts.nodes.length)
      return notFound()

    return {
      posts: posts,
      postsTotalCount: posts.pageInfo.offsetPagination.total,
      hero: blog.hero,
      newPosts: newPosts.nodes,
      categories: categories.nodes,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { data: { posts } } = await client.query({
    query: gql`
      query Pages {
        posts{
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
  })

  const pagesCount = (() => {
    return (Math.ceil(posts.pageInfo.offsetPagination.total / PAGE_ITEM_COUNT))
  })()

  const buttons = (() => {
    let arr = []
    for (let i = 1; i < pagesCount; i++) {
      arr.push(i + 1)
    }
    return arr
  })()

  return buttons.map(page => ({
    page: String(page),
  }));
}