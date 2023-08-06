import { gql } from "@apollo/client";
import  getClient from "../../../../apollo/apolo-client";
// import { generetaSeo } from "../../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../../queries/page-seo";
import { notFound } from "next/navigation";
import Content from "@/components/sections/lesson-content";
import { getUser } from "../../../../utils/check-authorisation";
import Breadcrumbs from "@/components/sections/breadcrumbs";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
// }

export default async function Courses({ params }) {
  const { lesson } = await getData(params)
  const { } = await getUser()

  return (
    <main>
      <Breadcrumbs data={[{ page: 'Moje kursy', url: `/moje-kursy` }, { page: lesson.lesson.course.title, url: `/moje-kursy/${params.course}` }, { page: lesson.title, url: `/moje-kursy/${params.course}/${params.lesson}` }]} />
      <Content
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
    const { data: { lesson } } = await getClient().query({
      query: gql`
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

export async function generateStaticParams() {
  const { data: { lessons } } = await getClient().query({
    query: gql`
    query PostStaticParams {
      lessons(first: 100) {
        nodes {
          slug
          lesson {
            course {
              ... on Course {
                slug
              }
            }
          }
        }
      }
    }
  `
  })

  return lessons.nodes.map(({ lesson, slug }) => ({
    lesson: slug,
    course: lesson.course.slug
  }))
}