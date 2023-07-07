import { gql } from "@apollo/client"
import client from "../../apollo/apolo-client"
import { PAGE_ITEM_COUNT } from "../../constants/blog"
import Hero from "@/components/sections/hero-media"
import Content from "@/components/sections/content-media"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

const clientId = '1260289094861018'
const clientSecret = '62a0ccbef97b3c950eb13c639535620c'

export default async function Media() {
  const { data, mediums, totalCount } = await getData()
  return (
    <main>
      <Hero data={data} />
      <Content data={mediums} totalCount={totalCount} page='1'/>
    </main>
  )
}

async function getData() {
  const { data: { pageBy, mediums } } = await client.query({
    query: gql`
      query Pages($size: Int) {
        pageBy(id: "cG9zdDo5MDI=") {
          mediaArchiwum {
            pageTitle
            text
          }
        }
        mediums(where: {offsetPagination: {size: $size, offset: 0}}) {
          pageInfo {
            offsetPagination {
              total
            }
          }
          nodes {
            id
            title
            excerpt
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      size: PAGE_ITEM_COUNT,
    },
  }, { pollInterval: 500 })

  return {
    data: pageBy.mediaArchiwum,
    mediums: mediums.nodes,
    totalCount: mediums.pageInfo.offsetPagination.total,
  }
}