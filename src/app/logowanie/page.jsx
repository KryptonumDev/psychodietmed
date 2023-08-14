import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import Login from "@/components/sections/login";
import CallToActionGray from "@/components/sections/call-to-action-gray";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
}

export default async function Courses() {
  const authToken = cookies().get('authToken')?.value
  const { user } = await getUser(authToken)

  if (user?.username) redirect('/moje-kursy')

  return (
    <main >
      <Breadcrumbs data={[{ page: 'Logowanie', url: `/logowanie` }]} />
      <Login />
      <CallToActionGray data={{ content: '<h2>Nie masz konta?</h2><p>Zakładamy ja automatycznie, gdy kupisz kurs w naszej Akademii.</p>', link: { title: 'Akademia', url: '/akademia' } }} />
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
          }
        }
      `,
      revalidate: 0,
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })

    return { user: viewer }
  } catch (error) {
    console.log('error', error)
    return { user: null }
  }
}