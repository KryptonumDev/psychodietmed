import { cookies } from "next/headers"
import client from "../apollo/apolo-client"
import { redirect } from "next/navigation"
import { gql } from "@apollo/client"

export async function getUser() {
  try {
    const authToken = cookies().get('authToken').value

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