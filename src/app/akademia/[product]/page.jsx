import { gql } from "@apollo/client";
import client from "../../../apollo/apolo-client";
// import { generetaSeo } from "../../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../../queries/page-seo";
import { notFound, redirect } from "next/navigation";
import Hero from "@/components/sections/hero-course";
import Content from "@/components/sections/course-content";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/sections/breadcrumbs";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
// }

export default async function Courses({ params }) {
  const authToken = cookies().get('authToken').value

  if (!authToken) redirect('/logowanie')

  const { product } = await getData(params)
  const { user } = await getUser(authToken)

  if (!!user?.courses?.nodes?.find((el) => el.databaseId === product.product.course.databaseId)) redirect(`/moje-kursy/${product?.product?.course?.slug}`)
  let totalTime = 0
  let lessonsCount = 0
  let firstLessonSlug = product.product.course.course.chapters[0].lessons[0].lesson.slug

  product.product.course.course.chapters.forEach(chapter => {
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
      <Breadcrumbs data={[{ page: 'Akademia', url: `/akademia` }, { page: product.title, url: `/akademia/${params.product}` }]} />
      <Hero lessonSlug={firstLessonSlug} slug={product.product.course.slug} databaseId={product.databaseId} title={product.product.course.title} image={product.product.course.featuredImage} time={totalTime} count={lessonsCount} />
      <Content disabled={true} slug={product.product.course.slug} content={product.product.course.content} chapters={product.product.course.course.chapters} author={product.product.course.course.author} />
    </main>
  )
}

async function getUser(authToken) {
  try {
    const { data: { viewer } } = await client.query({
      query: gql`
      query Viewer {
        viewer {
          username
          courses {
            nodes {
              databaseId
            }
          }
        }
      }
    `,
      context: {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }
    })

    return {
      user: viewer
    }
  } catch (error) {
    return {
      user: null
    }
  }
}

async function getData(params) {
  try {
    const { data: { product } } = await client.query({
      query: gql`
      query Pages($id: ID!) {
        product(id: $id, idType: SLUG) {
          databaseId
          title
          slug
          product {
            course {
              ... on Course {
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
          }
        }
      }
    `,
      variables: {
        id: params.product
      }
    })

    if (!product?.databaseId) notFound()
    if (!product?.product?.course?.databaseId) notFound()

    return {
      product: product,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}