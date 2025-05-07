
import { notFound } from "next/navigation";
import Content from "@/components/sections/lesson-content";
import { getUser } from "../../../../utils/check-authorisation";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../../../utils/fetch-query";
import { GET_SEO_LESSON } from "../../../../queries/lesson-seo";
import { generetaSeo } from "../../../../utils/genereate-seo";

export async function generateMetadata({ params }) {
  return await generetaSeo(params.lesson, `/moje-kursy/${params.course}`, GET_SEO_LESSON, 'post')
}

export default async function Courses({ params }) {
  const { lesson } = await getData(params)
  const { } = await getUser(lesson.lesson.course.databaseId)

  return (
    <main>
      <Breadcrumbs data={[{ page: 'Moje kursy', url: `/moje-kursy` }, { page: lesson.lesson.course.title, url: `/moje-kursy/${params.course}` }, { page: lesson.title, url: `/moje-kursy/${params.course}/${params.lesson}` }]} />
      <Content
        course={lesson.lesson.course.slug}
        title={lesson.title}
        databaseId={lesson.databaseId}
        content={lesson.content}
        video={lesson.lesson.video}
        chapters={lesson.lesson.course.course.chapters}
        params={params}
      />
    </main>
  )
}

async function getData(params) {
  try {
    const { body: { data: { lesson } } } = await Fetch({
      query: `
      query Pages($id: ID!) {
        lesson(id: $id, idType: SLUG) {
          title
          content
          databaseId
          lesson {
            video
            course {
              ... on Course {
                databaseId
                slug
                title
                course {
                  chapters {
                    title
                    lessons {
                      lesson {
                        ... on Lesson {
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
          }
        }
      }
    `,
      revalidate: 600,
      variables: {
        id: params.lesson,
        course: params.course
      }
    })

    if (!lesson?.databaseId) notFound()
    if (lesson.lesson.course.slug !== params.course) notFound()

    return {
      lesson: lesson,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}