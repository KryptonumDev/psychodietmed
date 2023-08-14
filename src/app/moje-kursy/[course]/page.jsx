// import { generetaSeo } from "../../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../../queries/page-seo";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/hero-course";
import Content from "@/components/sections/course-content";
import { getUser } from "../../../utils/check-authorisation";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../../utils/fetch-query";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
// }

export default async function Courses({ params }) {
  const { course } = await getData(params)
  const { } = await getUser()

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
      query:`
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

// export async function generateStaticParams() {
//   const { data: { courses } } = await getClient().query({
//     query: gql`
//     query PostStaticParams {
//       courses(first: 100) {
//         nodes {
//           slug
//         }
//       }
//     }
//   `
//   })

//   return courses.nodes.map(({ slug }) => ({
//     course: slug
//   }))
// }