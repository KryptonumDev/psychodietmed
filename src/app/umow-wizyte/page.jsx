import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import Content from "@/components/sections/book-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxNzg2', '/umow-wizyte', GET_SEO_PAGE)
}

export default async function Home() {
  const { specialists, specializations } = await getData()

  // const url = 'https://secure.przelewy24.pl/api/v1/merchant/register';

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Basic ${btoa(`${process.env.NEXT_P24_MERCHANT_ID}:${process.env.NEXT_P24_REST_API_KEY}`)}`,
  //     'Content-Type': 'application/json',
  //     'Content-Length': '0',
  //   },
  // });

  // const text = await response.text();
  // console.log(text)

  return (
    <main className="overflow">
      <Content specialists={specialists} specializations={specializations} />
    </main>
  )
}

async function getData() {
  const { data: { specjalisci, specjalizacje } } = await client.query({
    query: gql`
      query Pages {
        specjalisci(first: 100) {
          nodes {
            title
            slug
            proffesional {
              proffesion
              personImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              specialisations {
                ... on Specjalizacja {
                  id
                  title
                }
              }
            }
          }
        }
        specjalizacje(first: 100) {
          nodes {
            id
            title
          }
        }
      }
    `,
  }, { pollInterval: 500 })

  return {
    specialists: specjalisci.nodes,
    specializations: specjalizacje.nodes
  }
}