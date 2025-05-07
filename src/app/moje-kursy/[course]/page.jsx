
import { notFound } from "next/navigation";
import Hero from "@/components/sections/hero-course";
import Content from "@/components/sections/course-content";
import { getUser } from "../../../utils/check-authorisation";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../../utils/fetch-query";
import { generetaSeo } from "../../../utils/genereate-seo";
import { GET_SEO_COURSE } from "../../../queries/course-seo";

export async function generateMetadata({ params }) {
  return await generetaSeo(params.course, '/moje-kursy', GET_SEO_COURSE, 'post')
}

export default async function Courses({ params }) {
  const { course } = await getData(params)
  const { } = await getUser(course.databaseId)

  let totalTime = 0
  let lessonsCount = 0
  let firstLessonSlug = course.course.chapters[0].lessons[0].lesson.slug

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
      <Breadcrumbs data={[{ page: 'Moje kursy', url: `/moje-kursy` }, { page: course.title, url: `/moje-kursy/${params.course}` }]} />
      <Hero accessToCourse={true} lessonSlug={firstLessonSlug} slug={course.slug} title={course.title} image={course.featuredImage} time={totalTime} count={lessonsCount} />
      <Content slug={course.slug} content={course.content} chapters={course.course.chapters} author={course.course.author} />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { course } } } = await Fetch({
      query: `
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
                  index
                  courseExcerpt
                  specialistId
                  serviceId
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
      revalidate: 600,
      variables: {
        id: params.course
      }
    })

    if (!course?.id) notFound()

    return {
      course: course,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}