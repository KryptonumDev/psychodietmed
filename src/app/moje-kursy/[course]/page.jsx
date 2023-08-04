import { gql } from "@apollo/client";
import client from "../../../apollo/apolo-client";
// import { generetaSeo } from "../../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../../queries/page-seo";
import { notFound, redirect } from "next/navigation";
import Hero from "@/components/sections/hero-course";
import Content from "@/components/sections/course-content";
import { cookies } from "next/headers";
import { getUser } from "../../../utils/check-authorisation";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
// }

export default async function Courses({ params }) {
  const { course } = await getData(params)
  const { } = await getUser()

  let totalTime = 0
  let lessonsCount = 0

  course.course.chapters.forEach(chapter => {
    chapter.lessons.forEach(el => {
      totalTime += Number(el.lesson.lesson.time)
      lessonsCount++
    })
  })

  if (totalTime > 60) {
    totalTime = Math.floor(totalTime / 60) + ' godzin ' + totalTime % 60 + ' minut'
  } else {
    totalTime = totalTime + ' minut'
  }

  return (
    <main>
      <Hero title={course.title} image={course.featuredImage} time={totalTime} count={lessonsCount} />
      <Content slug={course.slug} content={course.content} chapters={course.course.chapters} author={course.course.author} />
    </main>
  )
}

async function getData(params) {
  try {
    const { data: { course } } = await client.query({
      query: gql`
      query Pages($id: ID!) {
        course(id: $id, idType: SLUG) {
          databaseId
          id
          title
          slug
          content
          featuredImage {
            node {
              altText
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
          course {
            author {
              ... on Specjalista {
                id
                title
                proffesional {
                  courseExcerpt
                  proffesion
                  avatar {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            chapters {
              title
              lessons {
                lesson {
                  ... on Lesson {
                    id
                    title
                    slug
                    databaseId
                    lesson {
                      time
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
      variables: {
        id: params.course
      }
    }, { pollInterval: 500 })

    if (!course?.id) notFound()

    return {
      course: course,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}