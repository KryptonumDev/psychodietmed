import { gql } from "@apollo/client"
import client from "../../../../apollo/apolo-client"
import { PAGE_ITEM_COUNT } from "../../../../constants/blog"
import Hero from "@/components/sections/hero-media"
import Content from "@/components/sections/content-media"
import { notFound } from "next/navigation"

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Blog({ params }) {
  const { data, mediums, totalCount } = await getData(params.page)
  return (
    <main>
      <Hero data={data} />
      <Content data={mediums} totalCount={totalCount} page={params.page} />
    </main>
  )
}

async function getData(currentPage) {
  try {
    const { data: { pageBy, mediums } } = await client.query({
      query: gql`
      query Pages($size: Int, $offset: Int) {
        pageBy(id: "cG9zdDo5MDI=") {
          mediaArchiwum {
            pageTitle
            text
          }
        }
        mediums(where: {offsetPagination: {size: $size, offset: $offset}}) {
          pageInfo {
            offsetPagination {
              total
            }
          }
          nodes {
            id
            title
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
        offset: (currentPage - 1) * PAGE_ITEM_COUNT,
        size: PAGE_ITEM_COUNT,
      },
    }, { pollInterval: 500 })

    if (!mediums.nodes.length)
      return notFound()

    return {
      data: pageBy.mediaArchiwum,
      mediums: mediums.nodes,
      totalCount: mediums.pageInfo.offsetPagination.total,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { data: { mediums } } = await client.query({
    query: gql`
      query Pages {
        mediums{
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
  })

  const pagesCount = (() => {
    return (Math.ceil(mediums.pageInfo.offsetPagination.total / PAGE_ITEM_COUNT))
  })()

  const buttons = (() => {
    let arr = []
    for (let i = 1; i < pagesCount; i++) {
      arr.push(i + 1)
    }
    return arr
  })()

  return buttons.map(page => ({
    page: String(page),
  }));
}