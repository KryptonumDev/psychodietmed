import Hero from "@/components/sections/hero-shop";
import Content from "@/components/sections/offer-products";
import TwoColumnFlex from "@/components/sections/two-column-flex";
import ReviewsSlider from "@/components/sections/reviews-slider";
import Bundles from "@/components/sections/offer-bundles";
import { notFound } from "next/navigation";
import { PAGE_ITEM_COUNT } from "../../constants/academy";
// import { generetaSeo } from "../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";

// export async function generateMetadata({ searchParams }) {

//   let url = '/oferta'

//   if (searchParams.kategoria) {
//     url += `?kategoria=${searchParams.kategoria}`
//     if (searchParams.strona)
//       url += `&strona=${searchParams.strona}`
//   } else if (searchParams.strona) {
//     url += `?strona=${searchParams.strona}`
//   }

//   return await generetaSeo('cG9zdDoxODY4', url, GET_SEO_PAGE)
// }

const prices = [
  { value: '0-99', label: '0 - 99 zł' },
  { value: '100-199', label: '100 - 199 zł' },
  { value: '200-299', label: '200 - 299 zł' },
  { value: '300-0', label: '+300 zł' },
]

const orders = [
  { value: 'PRICE-ASC', label: 'Ceny: rosnąco' },
  { value: 'PRICE-DESC', label: 'Ceny: malejąco' },
  { value: 'DATE-ASC', label: 'Daty: Najnowsze' },
  { value: 'DATE-DESC', label: 'Daty: Najstarsze' },
]

export default async function Shop(params) {
  const { productCategories, featured, cases, data, products, bundles } = await getData(params)

  const locReviews = { ...data.reviewsAcademy }

  if (!locReviews.comments) {
    locReviews.comments = [...cases]
  } else if (locReviews.comments.length < 4) {
    cases.forEach(podopieczny => {
      if (!locReviews.comments.find(comment => comment.id === podopieczny.id) && locReviews.comments.length < 4) {
        locReviews.comments = [...locReviews.comments, podopieczny]
      }
    })
  }

  return (
    <main>
      <Breadcrumbs data={[{ page: 'Sklep', url: '/oferta' }]} />
      <Hero hero={data.heroAcademy} data={featured} />
      <Bundles data={bundles} />
      <Content prices={prices} orders={orders} productCategories={productCategories} defaultData={products} />
      <TwoColumnFlex data={data.descriptionAcademy} />
      <ReviewsSlider data={locReviews} />
    </main>
  )
}

async function getData(params) {
  const currentPage = params.searchParams?.strona ? +params.searchParams?.strona : 1
  const category = params.searchParams?.kategoria ? params.searchParams?.kategoria : null
  const minPrice = params.searchParams?.cena ? +params.searchParams?.cena?.split('-')[0] : null
  const maxPrice = params.searchParams?.cena ? +params.searchParams?.cena?.split('-')[1] : null
  const orderby = params.searchParams?.sortowanie ? params.searchParams?.sortowanie.split('-')[0] : 'MENU_ORDER'
  const orderDirection = params.searchParams?.sortowanie ? params.searchParams?.sortowanie.split('-')[1] : 'ASC'

  try {
    const result = await fetch('https://psychodietmed.headlesshub.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query Academy ($category: [String], $maxPrice: Float, $minPrice: Float, $orderby: ProductsOrderByEnum!, $orderDirection: OrderEnum, $count: Int, $offset: Int) {
          productCategories(where: {exclude: ["dGVybToyNg==", "dGVybTo1OQ=="]}) {
            nodes {
              id
              value : slug
              label : name
              count
            }
          }
          podopieczni(first: 4) {
            nodes {
              id
              slug
              histori {
                information {
                  boldText
                  beforeImage {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                  afterImage {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
                caseStudyCard {
                  name
                  linkText
                  comment
                  avatar {
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
          featured: products(where: {featured: true}, first: 1) {
            nodes {
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
          bundles: products(where: {categoryIn: "bundle"}, first: 50) {
            nodes {
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
          products(
              where: {
                categoryIn: $category, 
                categoryNotIn: ["ebook", "kurs", "bundle"],
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
          pageBy(id: "cG9zdDoxODY4") {
            academy {
              heroAcademy{
                list{
                  text
                  icon{
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
              descriptionAcademy {
                content
                link {
                  title
                  url
                }
                image {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              reviewsAcademy {
                title
                text
                comments {
                  ... on Podopieczna {
                    id
                    slug
                    histori {
                      information {
                        boldText
                        beforeImage {
                          altText
                          mediaItemUrl
                          mediaDetails {
                            height
                            width
                          }
                        }
                        afterImage {
                          altText
                          mediaItemUrl
                          mediaDetails {
                            height
                            width
                          }
                        }
                      }
                      caseStudyCard {
                        name
                        linkText
                        comment
                        avatar {
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
              }
            }
          }
        }` ,
        variables: {
          category: category,
          minPrice: minPrice,
          maxPrice: maxPrice,
          orderby: orderby,
          orderDirection: orderDirection,
          count: PAGE_ITEM_COUNT,
          offset: PAGE_ITEM_COUNT * (currentPage - 1)
        }
      }),
      cache: 'force-cache',
    });

    const { data } = await result.json()

    return {
      productCategories: data?.productCategories?.nodes,
      featured: data?.featured?.nodes[0],
      products: data?.products,
      bundles: data?.bundles?.nodes,
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes,
      data: data?.pageBy?.academy,
      cases: data?.podopieczni?.nodes,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}