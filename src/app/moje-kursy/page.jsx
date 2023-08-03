import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from 'next/headers'
import Controller from "@/components/sections/my-courses-controller";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
}

export default async function Courses() {
  const { user, data } = await getData()

  return (
    <main className="overflow">
      <Controller user={user} cta={data?.callToActionCourses} />
    </main>
  )
}

async function getData() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')

  const { data: { page, viewer } } = await client.query({
    query: gql`
      query Pages {
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
        viewer {
          username
          courses {
            nodes {
              id
              databaseId
              slug
              title
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    `
  }, { pollInterval: 500 })


  return {
    user: viewer,
    data: page.myCourses
  }
}