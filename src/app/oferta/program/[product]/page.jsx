import { notFound, redirect } from "next/navigation";
import Hero from "@/components/sections/hero-course";
import Content from "@/components/sections/course-content";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../../../utils/fetch-query";
import { generetaSeo } from "../../../../utils/genereate-seo";
import { GET_SEO_PRODUCT } from "../../../../queries/product-seo";
import FlexibleContent from "@/components/sections/product-flexible-content";
import BundleContains from "@/components/sections/product-bundle-contains";

export async function generateMetadata({ params }) {
  return await generetaSeo(params.product, '/akademia', GET_SEO_PRODUCT, 'post')
}

export default async function Courses({ params }) {
  const { product } = await getData(params)
  const { user } = await getUser()

  if (!!user?.courses?.nodes?.find((el) => el.databaseId === product.product.course.databaseId)) redirect(`/moje-kursy/${product?.product?.course?.slug}`)
  let totalTime = 0
  let lessonsCount = 0
  let firstLessonSlug = product.product.course.course.chapters[0].lessons[0].lesson.slug

  product.product.course.course.chapters.forEach(chapter => {
    chapter.lessons.forEach(el => {
      totalTime += Number(el.lesson.lesson.time)
      lessonsCount++
    })
  })

  if (totalTime > 60) {
    totalTime = Math.floor(totalTime / 60) + ' godzin ' + totalTime % 60 + ' minut'
  } else {
    totalTime = totalTime + ' minut'
  }

  return (
    <main>
      <Breadcrumbs data={[{ page: 'Sklep', url: `/oferta` }, { page: product.title, url: `/oferta/kurs/${params.product}` }]} />
      <Hero regularPrice={product.regularPrice} price={product.price} lessonSlug={firstLessonSlug} slug={product.product.course.slug} databaseId={product.databaseId} title={product.product.course.title} image={product.product.course.featuredImage} time={totalTime} count={lessonsCount} />
      <Content disabled={true} slug={product.product.course.slug} content={product.product.course.content} chapters={product.product.course.course.chapters} author={product.product.course.course.author} />
      <FlexibleContent productId={product.productId} data={product.product.additionalSectionsProduct} />
      {product.product.bundleItems?.length > 0 && (
        <BundleContains productId={product.productId} data={product.product.bundleItems} />
      )}
    </main>
  )
}

async function getUser() {
  const authToken = cookies().get('authToken')?.value
  try {
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

async function getData(params) {
  try {
    const { body: { data: { product } } } = await Fetch({
      query: `
      query Pages($id: ID!) {
        product(id: $id, idType: SLUG) {
          databaseId
          title
          slug
          ... on SimpleProduct {
            id
            price(format: RAW)
            regularPrice(format: RAW)
          }
          product {
            importantInformation{
              title
              list{
                text
              }
            }
            bundleItems {
              text
            }
            additionalSectionsProduct {
              ... on Product_Product_AdditionalSectionsProduct_TwoColumnFlex {
                content
                fieldGroupName
                image {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              ... on Product_Product_AdditionalSectionsProduct_TwoColumnGrid {
                fieldGroupName
                title
                grid {
                  text
                  icon {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
              ... on Product_Product_AdditionalSectionsProduct_TwoColumnList {
                fieldGroupName
                title
                lista {
                  text
                  icon {
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
            course {
              ... on Course {
                databaseId
                id
                title
                slug
                content
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
                course {
                  author {
                    ... on Specjalista {
                      id
                      title
                      proffesional {
                        courseExcerpt
                        proffesion
                        specialistId
                        serviceId
                        avatar {
                          altText
                          mediaItemUrl
                          mediaDetails {
                            width
                            height
                          }
                        }
                      }
                    }
                  }
                  chapters {
                    title
                    lessons {
                      lesson {
                        ... on Lesson {
                          id
                          title
                          slug
                          databaseId
                          lesson {
                            time
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
      revalidate: 360,
      variables: {
        id: params.product
      }
    })

    if (!product?.databaseId) notFound()
    if (!product?.product?.course?.databaseId) notFound()

    return {
      product: product,
    }
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export async function generateStaticParams() {
  const { body: { data: { products } } } = await Fetch({
    query: `
      query PostStaticParams {
        products(
          first: 100,
          where: {categoryIn: ["program"]}
        ) {
          nodes {
            slug
          }
        }
      }
    `,
    cache: 'no-cache'
  })

  return products.nodes.map(({ slug }) => ({
    product: slug
  }))
}