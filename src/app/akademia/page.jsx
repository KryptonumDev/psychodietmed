import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Grid from "@/components/sections/academy-grid";
import Recruitment from "@/components/sections/team-recruitment";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoyMDM3', '/akademia', GET_SEO_PAGE)
}

export default async function Courses() {
  const { courses, page, ebooks } = await getData()
  const { user } = await getUser()

  return (
    <main className="overflow">
      <Breadcrumbs data={[{ page: 'Akademia', url: `/akademia` }]} />
      <Grid user={user} courses={courses} ebooks={ebooks}/>
      <Recruitment data={page.akademia.specialistGridTeam} />
    </main>
  )
}

async function getUser() {
  try {
    const authToken = cookies().get('authToken')?.value

    const { body: { data: { viewer } } } = await Fetch({
      query: `
        query Viewer {
          viewer {
            username
            courses {
              nodes {
                databaseId
              }
            }
          }
        }
      `,
      revalidate: 0,
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })

    return {
      user: viewer
    }
  } catch (error) {
    return {
      user: null
    }
  }
}

async function getData() {
  try {
    const { body: { data: { page, courses, ebooks } } } = await Fetch({
      query: `
      query Pages {
        page(id: "cG9zdDoyMDM3"){
          akademia {
            specialistGridTeam{
              title
              text
              link{
                title
                url
              }
              grid{
                text
                icon{
                  altText
                  mediaItemUrl
                  mediaDetails{
                    height
                    width
                  }
                }
              }
            }
          }
        }
        ebooks: products(where: {categoryIn: "ebook"}) {
          nodes{
            addons {
              name
              ... on AddonMultipleChoice {
                description
                name
                options {
                  price
                  label
                }
                fieldName
              }
            }
            product {
              discount
              bundleItems {
                text
              }
            }
            id
            productId: databaseId
            slug
            name
            image {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            ... on SimpleProduct {
              id
              price
              regularPrice
            }
            ... on VariableProduct {
              id
              price
              regularPrice
              attributes {
                nodes {
                  variation
                  name
                  options
                  attributeId
                }
              }
              variations {
                nodes {
                  id
                  name
                  price
                  regularPrice
                  productId: databaseId
                  attributes {
                    nodes {
                      value
                      name
                      attributeId
                    }
                  }
                }
              }
            }
          }
        }
        courses: products(where: {categoryIn: "kurs"}) {
          nodes {
            productId: databaseId
            slug
            name
            excerpt
            image {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            ... on SimpleProduct {
              id
              price
              regularPrice
            }
            product {
              course {
                ... on Course {
                  slug
                  databaseId
                }
              }
            }
          }
        }
      }
    `,
      revalidate: 3600,
    })

    return {
      courses: courses,
      page: page,
      ebooks: ebooks
    }
  } catch (err) {
    throw new Error(err)
  }
}