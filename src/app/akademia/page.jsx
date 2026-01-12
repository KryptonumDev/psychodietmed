import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Grid from "@/components/sections/academy-grid";
import Recruitment from "@/components/sections/team-recruitment";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";
import Newsletter from "@/components/sections/newsletter";
import Owner from "@/components/sections/team-owner";
import GridTextImagePlates from "@/components/organisms/grid-text-image-plates";
import TwoColumnFlex from "@/components/sections/two-column-flex";
import Hero from "@/components/sections/hero-academy";
import Featured from "@/components/sections/academy-featured";
import { isEnrolled } from "../../utils/check-enrollment";

export async function generateMetadata() {
  return await generetaSeo("cG9zdDoyMDM3", "/akademia", GET_SEO_PAGE);
}

export default async function Courses() {
  const { newsletter, courses, page, ebooks } = await getData();
  const { user } = await getUser();
  let isFeaturedMyProduct = user?.databaseId
    ? await isEnrolled(
        courses.nodes[0].product.course.databaseId,
        user.databaseId
      )
    : false;

  return (
    <main className="overflow">
      <Breadcrumbs data={[{ page: "Akademia", url: `/akademia` }]} />
      <Hero data={page.akademia.heroAcademy} />
      <Featured
        isFeaturedMyProduct={isFeaturedMyProduct}
        post={courses.nodes[0]}
        data={page.akademia.featuredAcademy}
      />
      <Grid user={user} courses={courses} ebooks={ebooks} />
      <GridTextImagePlates grid={page.akademia.gridAcademy} />
      <TwoColumnFlex data={page.akademia.flexAcademy} />
      <Owner data={page.akademia.ownerAcademy} />
      <Recruitment data={page.akademia.specialistGridTeam} />
      <Newsletter data={newsletter} />
    </main>
  );
}

async function getUser() {
  try {
    const authToken = cookies().get("authToken")?.value;

    const {
      body: {
        data: { viewer },
      },
    } = await Fetch({
      query: `
        query Viewer {
          viewer {
            databaseId
            username
          }
        }
      `,
      revalidate: 0,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return {
      user: viewer,
    };
  } catch (error) {
    console.log("error", error);
    return {
      user: null,
    };
  }
}

async function getData() {
  try {
    const {
      body: {
        data: { global, page, courses, ebooks },
      },
    } = await Fetch({
      query: `
      query Pages {
        global : page(id: "cG9zdDo3Nzk=") {
          id
          global {
            newsletterGlobal{
              title
              text
              consent
            }
          }
        }
        page(id: "cG9zdDoyMDM3"){
          akademia {
            heroAcademy : heroAkademia{
              content
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
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            featuredAcademy{
              content
            }
            flexAcademy{
              content
              link{
                url
                title
              }
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            gridAcademy{
              content
              image{
                altText
                mediaItemUrl
                mediaDetails{
                  height
                  width
                }
              }
            }
            ownerAcademy{
              title
              text
              link{
                title
                url
              }
              repeater{
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
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              owner {
                ... on Specjalista {
                  id
                  title
                  proffesional {
                    index
                    proffesion
                    specialistId
                    serviceId
                    personImage {
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
            productCategories {
              nodes {
                slug
              }
            }
          }
        }
      }
    `,
      revalidate: 600,
    });

    // Filter out hidden courses (with "ukryty" category)
    const filteredCourses = {
      ...courses,
      nodes: courses.nodes.filter(course => 
        !course.productCategories?.nodes?.some(cat => cat.slug === 'ukryty')
      )
    };

    return {
      courses: filteredCourses,
      page: page,
      ebooks: ebooks,
      newsletter: global.global.newsletterGlobal,
    };
  } catch (err) {
    throw new Error(err);
  }
}
