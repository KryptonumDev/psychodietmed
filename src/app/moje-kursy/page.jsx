import { gql } from "@apollo/client";
import  getClient from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from 'next/headers'
import Controller from "@/components/sections/my-courses-controller";
import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/components/sections/breadcrumbs";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
}

export default async function Courses() {
  const authToken = cookies().get('authToken')?.value

  if (!authToken) redirect('/logowanie', 'replace')

  const { data } = await getData()
  const { user } = await getUser(authToken)

  return (
    <main className="overflow">
      <Breadcrumbs data={[{ page: 'Moje kursy', url: `/moje-kursy` }]} />
      <Controller user={user} cta={data?.callToActionCourses} />
    </main>
  )
}

async function getUser(authToken) {
  try {
    const { data: { viewer } } = await getClient().query({
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

    if (!viewer?.username) redirect('/logowanie')

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
    const { data: { page } } = await getClient().query({
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
    })

    return {
      data: page.myCourses
    }
  } catch (error) {
    console.log('error', error)
    notFound()
  }
}