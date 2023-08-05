import { gql } from "@apollo/client";
import client from "../../../../apollo/apolo-client";
// import { generetaSeo } from "../../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../../queries/page-seo";
import { notFound } from "next/navigation";
import CallToAction from "@/components/sections/cooperate-cta";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
// }

export default async function Courses({ params }) {
  return notFound() 

  const { page, course } = await getData(params)

  return (
    <main>
      <CallToAction data={page.callToActionCourses} />
    </main>
  )
}

async function getData(params) {
  try {
    const { data: { page, course } } = await client.query({
      query: gql`
      query Pages($id: ID!) {
        course(id: $id, idType: SLUG) {
          databaseId
          title
          slug 
        }
        page(id: "cG9zdDoxOTAz") {
          myCourses {
            callToActionCourses {
              content
              link {
                url
                title
              }
              image {
                altText
                mediaDetails {
                  width
                  height
                }
                mediaItemUrl
              }
            }
          }
        }
      }
    `,
      variables: {
        id: params.course,
      }
    })

    if (!course.databaseId) notFound()

    return {
      course: course,
      page: page.myCourses
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}