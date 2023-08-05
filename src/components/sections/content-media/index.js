'use client'
import React, { useCallback, useEffect, useState } from "react"
import Grid from "@/components/organisms/post-grid"
import Card from "@/components/moleculas/media-card"
import Pagination from "@/components/organisms/pagination-client-side"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { gql, useQuery } from "@apollo/client"
import client from "../../../apollo/apolo-client"
import { PAGE_ITEM_COUNT } from "../../../constants/media"

export default function Content({ data, totalCount, page = '1' }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState(data)
  const [initialLoad, setInitialLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("strona");
    if (!page) return 1;

    return +page;
  })

  const { refetch } = useQuery(
    gql`query Posts($offset: Int!, $size: Int!) {
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
  `, {
    client,
    skip: initialLoad,
    variables: {
      offset: (currentPage - 1) * PAGE_ITEM_COUNT,
      size: PAGE_ITEM_COUNT,
    },
    onCompleted: (data) => {
      debugger
      document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })
      setPosts(data?.mediums)
    },
    onError: (error) => {
      debugger
      throw new Error(error)
    }
  })

  const changePage = useCallback((page) => {
    setCurrentPage(+page)
    setInitialLoad(false)
  }, [setCurrentPage, setInitialLoad])

  useEffect(() => {
    if (!initialLoad) {
      refetch()
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (currentPage === 1) current.delete("strona");
      else current.set("strona", currentPage);

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
      history.replaceState(null, null, `${pathname}${query}`)
    }

  }, [currentPage])

  return (
    <section id='posts'>
      <Grid>
        {posts.nodes.map((el, index) => (
          <Card key={index} data={el} />
        ))}
      </Grid>
      <Pagination changePage={changePage} PAGE_ITEM_COUNT={PAGE_ITEM_COUNT} itemCount={posts.pageInfo.offsetPagination.total} currentPage={currentPage} />
    </section>
  )
}