import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import Hero from "@/components/sections/hero-blog"
import Content from "@/components/sections/content-blog"
import { PAGE_ITEM_COUNT } from "../../constants/blog"
import { notFound } from 'next/navigation';
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata({ searchParams }) {
  let url = '/blog'

  if (searchParams.kategoria) {
    url += `?kategoria=${searchParams.kategoria}`
    if (searchParams.strona)
      url += `&strona=${searchParams.strona}`
  } else if (searchParams.strona) {
    url += `?strona=${searchParams.strona}`
  }

  return await generetaSeo('cG9zdDo2NzA=', url, GET_SEO_PAGE)
}

export default async function Blog({ searchParams }) {
  const { categories, hero, posts, newPosts, postsTotalCount } = await getData(searchParams.strona)

  return (
    <main id="main">
      <Hero data={hero} posts={newPosts} />
      <Content categories={categories} page={searchParams.strona} data={posts} totalCount={postsTotalCount} />
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