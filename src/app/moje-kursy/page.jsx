import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from 'next/headers'
import Controller from "@/components/sections/my-courses-controller";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
}

export default async function Courses() {
  const { data } = await getData()
  const { user } = await getUser()

  return (
    <main className="overflow">
      <Controller user={user} cta={data?.callToActionCourses} />
    </main>
  )
}

async function getUser() {
  try {
    const authToken = cookies().get('authToken').value

    const { data: { viewer } } = await client.query({
      query: gql`
      query Viewer {
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
              course{
                excerpt
              }
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
    }, { pollInterval: 500 })
    
    if(!viewer?.username) redirect('/logowanie')

    return {
      user: viewer
    }
  } catch (error) {
    console.log('error', error)
    redirect('/logowanie')
  }
}

async function getData() {
  try {
    const { data: { page } } = await client.query({
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
      }
    `
    }, { pollInterval: 500 })

    return {
      data: page.myCourses
    }
  } catch (error) {
    console.log('error', error)
    notFound()
  }
}