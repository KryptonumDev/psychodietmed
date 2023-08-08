import { notFound } from "next/navigation"
import { gql } from "@apollo/client"
import  getClient from "../../../apollo/apolo-client"
import Hero from "@/components/sections/hero-medium"
import Flex from "@/components/sections/medium-flex"
import Video from "@/components/sections/medium-video"
import OtherMedia from "@/components/sections/other-media"
// import Contact from "@/components/sections/medium-contact"
import Interview from "@/components/sections/media-interview"
import { generetaSeo } from "../../../utils/genereate-seo"
import { GET_SEO_MEDIA } from "../../../queries/media-seo"
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata({ params }) {
  return await generetaSeo(params.media, '/media', GET_SEO_MEDIA, 'post')
}

export const revalidate = 5

export default async function Post({ params }) {
  const { data, otherMedia } = await getData(params)
  return (
    <>
      <main id="main">
        <Breadcrumbs data={[{ page: 'Media', url: `/media` }, { page: data.title, url: `/media/${params.tool}` }]} />
        <Hero title={data.title} excerpt={data.content} dateGmt={data.dateGmt} image={data.featuredImage?.node} />
        {data.media?.twoColumnFlexMedia?.image && (
          <Flex data={data.media.twoColumnFlexMedia} />
        )}
        {data.media?.mediaVideo?.oembed && (
          <Video data={data.media.mediaVideo} />
        )}
        {data.media?.interviewSection.length > 0 && (
          <Interview data={data.media.interviewSection} />
        )}
        {/* <Contact prev={data.previous} next={data.next} currPage={data.title} /> */}
        {otherMedia.length > 0 && (
          <OtherMedia data={otherMedia} />
        )}
      </main>
    </>
  )
}

async function getData(params) {
  try {
    const { data: { medium, mediums } } = await getClient().query({
      query: gql`
      query Pages($uri: ID!) {
        mediums(first: 7) {
          nodes {
            id
            title
            excerpt
            slug
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
          }
        }
        medium(id: $uri, idType: URI) {
          id
          content
          excerpt
          dateGmt
          title
          previous {
            title
            slug
          }
          next {
            title
            slug
          }
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
          media {
            interviewSection {
              ... on Medium_Media_InterviewSection_QuestionAndTwoColumnAnswer {
                fieldGroupName
                qaRepeater {
                  question
                  answer
                }
              }
              ... on Medium_Media_InterviewSection_QuestionAndImage {
                fieldGroupName
                imageSide
                image {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                qaRepeater {
                  answer
                  question
                }
              }
            }
            mediaVideo {
              oembed
              title
            }
            twoColumnFlexMedia {
              title
              text
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
      }
    `,
      variables: {
        uri: `${params.media}`,
      }
    })

    if (!medium.id)
      notFound()

    return {
      data: medium,
      otherMedia: mediums.nodes.filter(item => item.id !== medium.id)
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { data: { mediums } } = await getClient().query({
    query: gql`
    query PostStaticParams {
      mediums(first: 100) {
        nodes {
          slug
        }
      }
    }
  `
  })

  return mediums.nodes.map(({ slug }) => ({
    media: slug
  }))
}