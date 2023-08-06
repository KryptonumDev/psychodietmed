'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import { Card } from "@/components/moleculas/product-card"
import Filtration from "@/components/organisms/academy-filtration"
import { gql } from "@apollo/client"
import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_ITEM_COUNT } from "../../../constants/academy"
import Pagination from "@/components/organisms/pagination-client-side"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"

export default function Content({ prices, orders, productCategories, defaultData }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState(defaultData)
  const [initialLoad, setInitialLoad] = useState(true)
  const [chosenCategory, setChosenCategory] = useState(() => {
    const category = searchParams.get("kategoria");
    if (!category) return null;

    const categoryObj = productCategories.find((el) => el.value === category);
    if (!categoryObj) return null;

    return categoryObj;
  })
  const [chosenPrice, setChosenPrice] = useState(() => {
    const price = searchParams.get("cena");
    if (!price) return null;

    const priceObj = prices.find((el) => el.value === price);
    if (!priceObj) return null;

    return priceObj;
  })
  const [chosenOrder, setChosenOrder] = useState(() => {
    const order = searchParams.get("sortowanie");
    if (!order) return null;

    const orderObj = orders.find((el) => el.value === order);
    if (!orderObj) return null;

    return orderObj;
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("strona");
    if (!page) return 1;

    return +page;
  })

  const { refetch } = useQuery(
    gql`query Product($category: [String], $maxPrice: Float, $minPrice: Float, $orderby: ProductsOrderByEnum!, $orderDirection: OrderEnum, $count: Int, $offset: Int) {
      products(
        where: {
          categoryIn: $category, 
          categoryNotIn: ["kurs", "bundle"],
          orderby: {field: $orderby, order: $orderDirection}, 
          maxPrice: $maxPrice,
          minPrice: $minPrice,
          offsetPagination: {
            size: $count, 
            offset: $offset
          }
        }
      ) {
        pageInfo {
          offsetPagination {
            total
          }
        }
        nodes {
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
            id
            altText
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
    }
  `, {
    skip: initialLoad,
    variables: {
      category: chosenCategory?.value ? chosenCategory.value : null,
      minPrice: +chosenPrice?.value?.split('-')[0] || null,
      maxPrice: +chosenPrice?.value?.split('-')[1] || null,
      orderby: chosenOrder?.value ? chosenOrder?.value.split('-')[0] : 'MENU_ORDER',
      orderDirection: chosenOrder?.value ? chosenOrder?.value.split('-')[1] : 'ASC',
      count: PAGE_ITEM_COUNT,
      offset: PAGE_ITEM_COUNT * (currentPage - 1)
    },
    onCompleted: (data) => {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
      setProducts(data?.products)
    },
    onError: (error) => {
      throw new Error(error)
    }
  })

  const changeCategory = useCallback((value, label) => {
    setChosenCategory(value === ' ' ? null : { value, label })
    setInitialLoad(false)
  }, [setChosenCategory, setInitialLoad])

  const changePrice = useCallback((value, label) => {
    setChosenPrice(value === ' ' ? null : { value, label })
    setInitialLoad(false)
  }, [setChosenPrice, setInitialLoad])

  const changeOrder = useCallback((value, label) => {
    setChosenOrder(value === ' ' ? null : { value, label })
    setInitialLoad(false)
  }, [setChosenOrder, setInitialLoad])

  const changePage = useCallback((page) => {
    setCurrentPage(+page)
    setInitialLoad(false)
  }, [setCurrentPage, setInitialLoad])

  const clearFilters = useCallback(() => {
    setChosenCategory(null)
    setChosenPrice(null)
    setChosenOrder(null)
    setInitialLoad(false)
  }, [setChosenCategory, setChosenPrice, setChosenOrder, setInitialLoad])

  useEffect(() => {
    if (!initialLoad) {
      refetch()
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!chosenCategory?.value) current.delete("kategoria");
      else current.set("kategoria", chosenCategory.value);


      if (!chosenPrice?.value) current.delete("cena");
      else current.set("cena", chosenPrice.value);


      if (!chosenOrder?.value) current.delete("sortowanie");
      else current.set("sortowanie", chosenOrder.value);

      current.delete("strona");
      setCurrentPage(1)

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
      history.replaceState(null, null, `${pathname}${query}`)
    }
  }, [chosenCategory, chosenPrice, chosenOrder])

  useEffect(() => {
    if (!initialLoad) {
      refetch()
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!chosenCategory?.value) current.delete("kategoria");
      else current.set("kategoria", chosenCategory.value);


      if (!chosenPrice?.value) current.delete("cena");
      else current.set("cena", chosenPrice.value);


      if (!chosenOrder?.value) current.delete("sortowanie");
      else current.set("sortowanie", chosenOrder.value);

      if (currentPage === 1) current.delete("strona");
      else current.set("strona", currentPage);

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
      history.replaceState(null, null, `${pathname}${query}`)
    }

  }, [currentPage])

  return (
    <section id='products' className={styles.wrapper}>
      <h2 >Produkty</h2>
      <Filtration
        chosenOrder={chosenOrder}
        chosenPrice={chosenPrice}
        chosenCategory={chosenCategory}
        changeOrder={changeOrder}
        changePrice={changePrice}
        changeCategory={changeCategory}
        clearFilters={clearFilters}
        productCategories={productCategories}
        prices={prices}
        orders={orders}
      />
      {products?.nodes?.length > 0 ? (
        <>
          <div className={styles.grid}>
            {products?.nodes?.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <Pagination changePage={changePage} currentPage={currentPage} itemCount={products?.pageInfo?.offsetPagination.total} PAGE_ITEM_COUNT={PAGE_ITEM_COUNT} />
        </>
      ) : (
        <div className={styles.notFound}>
          <h3>Niestety, nie znaleźliśmy produktu spełniającego dane wymagania</h3>
          <p>Spróbuj zmienić lub usunąć filtry</p>
        </div>
      )}
    </section>
  )
}