import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import Login from "@/components/sections/login";
import CallToActionGray from "@/components/sections/call-to-action-gray";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
}

export default async function Courses() {
  const authToken = cookies().get('authToken').value
  const { user } = await getUser(authToken)

  if (user?.username) redirect('/moje-kursy')

  return (
    <main >
      <Login />
      <CallToActionGray data={{ content: '<h2>Nie masz konta?</h2><p>Zakładamy ja automatycznie, gdy kupisz kurs w naszej Akademii.</p>', link: { title: 'Akademia', url: '/akademia' } }} />
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
        }
      }
    `,
      context: {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      }
    })
    return { user: viewer }
  } catch (error) {
    console.log('error', error)
    return { user: null }
  }
}