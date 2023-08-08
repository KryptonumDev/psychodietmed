import { gql } from "@apollo/client"
import  getClient from "../../apollo/apolo-client"
import { PAGE_ITEM_COUNT } from "../../constants/blog"
import Hero from "@/components/sections/hero-media"
import Content from "@/components/sections/content-media"
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/sections/breadcrumbs"

export async function generateMetadata({ searchParams }) {
  return await generetaSeo('cG9zdDo5MDI=', `/media${searchParams.strona ? `?strona=${searchParams.strona}` : ''}`, GET_SEO_PAGE)
}

export const dynamic = 'force-dynamic' 

export default async function Media({ searchParams }) {
  const { data, mediums, totalCount } = await getData(searchParams.strona)
  return (
    <main id="main">
      <Breadcrumbs data={[{ page: 'Media', url: `/media` }]} />
      <Hero data={data} />
      <Content data={mediums} page={searchParams.strona} totalCount={totalCount} />
    </main>
  )
}

async function getData(currentPage = 1) {
  try {
    const { data: { pageBy, mediums } } = await getClient().query({
      query: gql`
      query Pages($offset: Int!, $size: Int) {
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
        offset: (currentPage - 1) * PAGE_ITEM_COUNT,
        size: PAGE_ITEM_COUNT,
      },
    })

    if (!mediums.nodes.length)
      return notFound()

    return {
      data: pageBy.mediaArchiwum,
      mediums: mediums,
      totalCount: mediums.pageInfo.offsetPagination.total,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}