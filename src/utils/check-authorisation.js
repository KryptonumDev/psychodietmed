import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Fetch } from "./fetch-query"

export async function getUser() {
  try {
    const authToken = cookies().get('authToken').value

    const { body: { data: { viewer } } } = await Fetch({
      query: `
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

    if (!viewer?.username) redirect('/logowanie')

    return {
      user: viewer
    }
  } catch (error) {
    console.log('error', error)
    redirect('/logowanie')
  }
}