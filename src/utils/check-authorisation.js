import { cookies } from "next/headers"
import  getClient from "../apollo/apolo-client"
import { redirect } from "next/navigation"
import { gql } from "@apollo/client"

export async function getUser() {
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

    if (!viewer?.username) redirect('/logowanie')

    return {
      user: viewer
    }
  } catch (error) {
    console.log('error', error)
    redirect('/logowanie')
  }
}