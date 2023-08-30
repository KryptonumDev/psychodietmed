import { notFound } from "next/navigation"
import Hero from "@/components/sections/hero-post"
import Content from "@/components/sections/content-post"
import OtherPosts from "@/components/sections/other-posts"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_POST } from "../../../queries/post-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"
import { Fetch } from "../../../utils/fetch-query"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.post_slug, '/blog', GET_SEO_POST, 'post')
}

export default async function Post({ params }) {
  const { data, posts } = await getData(params)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.psychodietmed.pl/${data.slug}`
    },
    "headline": data.title,
    "description": data.excerpt,
    "datePublished": data.dateGmt,
    "dateModified": data.dateGmt,
    "author": {
      "@type": "Person",
      "name": data.postAuthor.author.title
    },
    "publisher": {
      "@type": "Organization",
      "name": "Psychodietmed",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.psychodietmed.pl/icon.jpg"
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://www.psychodietmed.pl/opengraph-image.jpg",
      "width": 800,
      "height": 600
    }
  }

  return (
    <main id="main">
      <script
        key={`article`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs data={[{ page: 'Blog', url: `/blog` }, { page: data.title, url: `/blog/${params.post_slug}` }]} />
      <Hero data={data} />
      <Content next={data.next} prev={data.previous} author={data.postAuthor.author} data={data.content} title={data.title} excerpt={data.excerpt} />
      <OtherPosts data={posts} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { post, posts } } } = await Fetch({
      query: `
      query BlogPost($slug: ID!) {
        posts(first: 4) {
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
        post(id:  $slug, idType: SLUG){
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
              id
            }
          }
          postAuthor {
            author {
              ... on Specjalista {
                title
                proffesional {
                  proffesion
                  specialistId
                  serviceId
                  personImage {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          next {
            id
            title
            slug
          }
          previous {
            id
            title
            slug
          }
        }
      }
    `,
      revalidate: 600,
      variables: {
        slug: params.post_slug,
      }
    })

    if (!post.id)
      notFound()

    return {
      data: post,
      posts: posts.nodes.filter(({ id }) => id !== post.id).slice(0, 3)
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { body: { data: { posts } } } = await Fetch({
    query: `
      query PostStaticParams {
        posts(first: 100) {
          nodes {
            slug
          }
        }
      }
    `,
    revalidate: 0,
  })

  return posts.nodes.map(({ slug }) => ({
    post_slug: slug
  }))
}