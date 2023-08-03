'use client'
import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import axios from "axios";
// import { cookies } from "next/headers";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxODY4', '/akademia', GET_SEO_PAGE)
}

export default async function Courses() {
  const { courses } = await getData()
  return (
    <main className="overflow">
    </main>
  )
}

async function getData() {
  // const { data } = await axios.post('http://localhost:8000/api/get-course-content', {
  //   data: {
  //     id: 1808
  //   }
  // })
  // lessons: data.lessons

  const { data: { viewer, courses } } = await client.query({
    query: gql`
      query Pages {
        courses {
          nodes {
            id
            databaseId
            slug
            title
          }
        }
        viewer {
          username
        }
      }
    `
  }, {
    pollInterval: 500,
    options: {
      context: {
        headers: {
          'Authorisation': `Bearer 12`
        }
      }
    }
  })
  console.log(viewer)
  return {
    courses: courses,
  }
}