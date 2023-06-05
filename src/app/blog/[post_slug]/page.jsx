import { gql } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import { notFound } from "next/navigation"
import Hero from "@/components/sections/hero-post"
import Content from "@/components/sections/content-post"
import Head from "next/head"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Post({ params }) {
  const { data } = await getData(params)
  return (
    <>
      <main>
        {data.enqueuedStylesheets.nodes.map((style, index) => (
          <link rel='stylesheet' href={style.src} />
        ))}
        <Hero data={data} />
        <Content next={data.next} prev={data.previous} author={data.postAuthor.author} data={data.content} />
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { postBy } } = await client.query({
      query: gql`
      query Pages($slug: String) {
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
          enqueuedStylesheets {
            nodes {
              handle
              src
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
    }, { pollInterval: 500 })

    if (!postBy.id)
      notFound()

    return {
      data: postBy
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}