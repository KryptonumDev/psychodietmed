import { gql } from "@apollo/client";
import  getClient from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { redirect } from "next/navigation";
import Login from "@/components/sections/login";
import CallToActionGray from "@/components/sections/call-to-action-gray";
import Breadcrumbs from "@/components/sections/breadcrumbs";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
}

export default async function Courses() {
  const { user } = await getUser()
  if (user?.username) redirect('/moje-kursy')

  return (
    <main >
      <Breadcrumbs data={[{ page: 'Logowanie', url: `/logowanie` }]} />
      <Login />
      <CallToActionGray data={{ content: '<h2>Nie masz konta?</h2><p>Zakładamy ja automatycznie, gdy kupisz kurs w naszej Akademii.</p>', link: { title: 'Akademia', url: '/akademia' } }} />
    </main>
  )
}

async function getUser() {
  try {
    const { data: { viewer } } = await getClient().query({
      query: gql`
      query Viewer {
        viewer {
          username
        }
      }
    `,
    }, { pollInterval: 500 })
    return { user: viewer }
  } catch (error) {
    console.log('error', error)
    return { user: null }
  }
}