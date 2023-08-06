'use client'
import React, { useCallback, useEffect, useState } from "react"
import styles from './styles.module.scss'
import Grid from "@/components/organisms/post-grid"
import Category from "@/components/atoms/category-pill"
import Card from "@/components/moleculas/blog-card"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client"
import { PAGE_ITEM_COUNT } from "../../../constants/blog"
import Pagination from "@/components/organisms/pagination-client-side"
import client from "../../../apollo/apolo-client"

export default function Content({ categories, data }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState(data)
  const [initialLoad, setInitialLoad] = useState(true)
  const [chosenCategory, setChosenCategory] = useState(() => {
    const category = searchParams.get("kategoria");
    if (!category) return null;

    const categoryObj = categories.find((el) => el.slug === category);
    if (!categoryObj) return null;

    return categoryObj;
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("strona");
    if (!page) return 1;

    return +page;
  })

  const { refetch } = useQuery(
    gql`query ClientSidePosts($offset: Int!, $size: Int!, $category: String) {
      posts(where: {offsetPagination: {size: $size, offset: $offset}, categoryName: $category}) {
        pageInfo {
          offsetPagination {
            total
          }
        }
        nodes {
          id
          dateGmt
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
          slug
          title
          excerpt
          categories {
            nodes {
              name
              slug
              id
            }
          }
        }
      }
    }
  `, {
    client,
    skip: initialLoad,
    variables: {
      category: chosenCategory?.slug ? chosenCategory.slug : null,
      size: PAGE_ITEM_COUNT,
      offset: PAGE_ITEM_COUNT * (currentPage - 1)
    },
    onCompleted: (data) => {
      document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })
      setPosts(data?.posts)
    },
    onError: (error) => {
      throw new Error(error)
    }
  })

  const changeCategory = useCallback((slug, label) => {
    setChosenCategory(slug === ' ' ? null : { slug, label })
    setInitialLoad(false)
  }, [setChosenCategory, setInitialLoad])

  const changePage = useCallback((page) => {
    setCurrentPage(+page)
    setInitialLoad(false)
  }, [setCurrentPage, setInitialLoad])

  useEffect(() => {
    if (!initialLoad) {
      refetch()
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!chosenCategory?.slug) current.delete("kategoria");
      else current.set("kategoria", chosenCategory.slug);

      current.delete("strona");
      setCurrentPage(1)

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
      history.replaceState(null, null, `${pathname}${query}`)
    }
  }, [chosenCategory])

  useEffect(() => {
    if (!initialLoad) {
      refetch()
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!chosenCategory?.slug) current.delete("kategoria");
      else current.set("kategoria", chosenCategory.slug);

      if (currentPage === 1) current.delete("strona");
      else current.set("strona", currentPage);

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
      history.replaceState(null, null, `${pathname}${query}`)
    }

  }, [currentPage])

  return (
    <section id='posts' className={styles.wrapper}>
      <h2 className={styles.title}>Wszystkie artykuły <span>({posts.pageInfo.offsetPagination.total})</span></h2>
      <div className={styles.categories}>
        <Category active={chosenCategory === null} onClick={() => { changeCategory(' ') }} name='Wszystkie artykuy' />
        {categories?.map(el => (
          <Category active={chosenCategory?.slug === el.slug} key={el.id} name={el.name} onClick={() => { changeCategory(el.slug, el.name) }} />
        ))}
      </div>
      <Grid>
        {posts.nodes.map((el, index) => (
          <Card key={index} data={el} />
        ))}
      </Grid>
      <Pagination changePage={changePage} PAGE_ITEM_COUNT={PAGE_ITEM_COUNT} itemCount={posts.pageInfo.offsetPagination.total} currentPage={currentPage} />
    </section>
  )
}