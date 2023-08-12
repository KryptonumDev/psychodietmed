import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from 'next/headers'
import Controller from "@/components/sections/my-courses-controller";
import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";

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
    const { body: { data: { viewer } } } = await Fetch({
      query:`
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
      revalidate: 3600,
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })

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
    const { body: { data: { page } } } = await Fetch({
      query:`
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
      `,
      revalidate: 60,
    })

    return {
      data: page.myCourses
    }
  } catch (error) {
    console.log('error', error)
    notFound()
  }
}