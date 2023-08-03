import { gql } from "@apollo/client";
import client from "../../../../apollo/apolo-client";
// import { generetaSeo } from "../../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../../queries/page-seo";
import { notFound } from "next/navigation";
import Content from "@/components/sections/lesson-content";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
// }

export default async function Courses({ params }) {
  const { lesson } = await getData(params)

  return (
    <main>
      <Content
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
    const { data: { lesson } } = await client.query({
      query: gql`
      query Pages($id: ID!) {
        lesson(id: $id, idType: SLUG) {
          content
          databaseId
          lesson {
            video
            course {
              ... on Course {
                databaseId
                slug
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
    }, { pollInterval: 500 })

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