import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-post"
import Content from "@/components/sections/content-post"
import OtherPosts from "@/components/sections/other-posts"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_POST } from "../../../queries/post-seo"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.post_slug, '/blog', GET_SEO_POST, 'post')
}

export default async function Post({ params }) {
  const { data, posts } = await getData(params)
  return (
    <>
      <main id="main">
        <Hero data={data} />
        <Content next={data.next} prev={data.previous} author={data.postAuthor.author} data={data.content} title={data.title} excerpt={data.excerpt} />
        <OtherPosts data={posts} />
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { postBy, posts } } = await client.query({
      query: gql`
      query Pages($slug: String) {
        posts(first: 3) {
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
        postBy(slug: $slug){
          dateGmt
          readingTime
          id
          title
          slug
          dateGmt
          excerpt
          content
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
          categories {
            nodes {
              name
              slug
            }
          }
          postAuthor {
            author {
              ... on Specjalista {
                title
                proffesional {
                  proffesion
                  personImage {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
    `,
      variables: {
        slug: params.post_slug,
      }
    })

    if (!postBy.id)
      notFound()

    return {
      data: postBy,
      posts: posts.nodes
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}