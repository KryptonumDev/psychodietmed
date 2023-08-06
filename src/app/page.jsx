import { gql } from "@apollo/client";
import client from "../apollo/apolo-client";
import Hero from "@/components/sections/hero-home";
import Flex from "@/components/sections/case-studies-flex";
import Specialisations from "@/components/sections/specialisations";
import CallToActionTransparent from "@/components/sections/call-to-action-tranparent";
import Specialists from "@/components/sections/specialists-slider";
import CallToActionGray from "@/components/sections/call-to-action-gray";
import ReviewsSlider from "@/components/sections/reviews-slider";
import StatisticsFlex from "@/components/sections/statistics-flex";
import Citate from "@/components/sections/citate";
import OtherPosts from "@/components/sections/other-posts";
import Newsletter from "@/components/sections/newsletter";
import StepsToConsultation from "@/components/sections/steps-to-consultation";
import Compare from "@/components/sections/pdm-compare";
import Academy from "@/components/sections/academy";
import { generetaSeo } from "../utils/genereate-seo";
import { GET_SEO_PAGE } from "../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDo5', '/', GET_SEO_PAGE)
}

export default async function Home() {
  const { academy, compare, hero, flex, specialisationsSection, activities, cta, specialists, stepsToConsultation, newsletter, ctaGray, reviews, newReviews, statistics, citate, blog, posts } = await getData()

  const locReviews = { ...reviews }

  if (!locReviews.comments) {
    locReviews.comments = [...newReviews]
  } else if (locReviews.comments.length < 4) {
    newReviews.forEach(podopieczny => {
      if (!locReviews.comments.find(comment => comment.id === podopieczny.id) && locReviews.comments.length < 4) {
        locReviews.comments = [...locReviews.comments, podopieczny]
      }
    })
  }

  return (
    <main className="overflow" id="main">
      <Hero data={hero} />
      <Flex data={flex} />
      <Compare data={compare} />
      <Specialisations data={specialisationsSection} activities={activities} />
      <CallToActionTransparent data={cta} />
      <Specialists data={specialists} />
      <StepsToConsultation data={stepsToConsultation} specialists={specialists} />
      <CallToActionGray data={ctaGray} />
      <ReviewsSlider data={locReviews} />
      <StatisticsFlex data={statistics} />
      <Citate data={citate} />
      <Academy data={academy} />
      <OtherPosts data={posts} title={blog.title} text={blog.text} />
      <Newsletter data={newsletter} />
    </main>
  )
}

async function getData() {
  const { data: { global, podopieczni, posts, obszaryDzialania, specjalisci, page: { homepage } } } = await client.query({
    query: gql`
      query Pages {
        global : page(id: "cG9zdDo3Nzk=") {
          id
          global {
            newsletterGlobal{
              title
              text
              consent
            }
            blogGlobal{
              title
              text
            }
            bookGlobal{
              title
              image{
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              titleFirst
              textFirst
              titleSecond
              textSecond
              titleThird
              textThird
              illnes {
                id : databaseId
                title : name
              }
            }
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
        posts(first: 3) {
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
        obszaryDzialania {
          nodes {
            title
            id
            slug
            uri
            obszar_dzialania {
              specialisationCard {
                zajawkaSpecjalizacji
                number
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
        }
        specjalisci(first: 100) {
          nodes {
            title
            slug
            specialisations {
              nodes {
                id : databaseId
                title : name
              }
            }
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
            }
          }
        }
        page(id: "cG9zdDo5") {
          id
          title
          homepage {
            hero : sekcjaPowitalnaKopia {
              pageTitle
              link {
                url
                title
              }
              content
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              logos {
                link
                logo {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
            compare: sekcjaZPorownaniem{
              title
              text
              psychoterapeuta
              psychodietyk
              psychoterapeutaPsychodietetyk
              cta
              link{
                title
                url
              }
            }
            casestudie : sekcjaZCaseStudieKopia{
              content
              image {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            specialisations : sekcjaZSiatkaSpecjalizacjiKopia {
              text
              title
            }
            cta : wezwanieDoDzialaniaKopia {
              content
              link {
                title
                url
              }
            }
            wezwanieDoDzialaniaZSzarymTlemKopia {
              content
              link {
                title
                url
              }
            }
            sekcjaZOpiniamiKopia {
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
            sekcjaStatystykiKopia {
              title
              textTop
              pinkList {
                title
                listItems {
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
              blueList {
                title
                listItems {
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
              textBot
              counters: licznikiNadZdjeciem {
                text
                number
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
            sekcjaZCytatemKopia {
              cytat
              author {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
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
            }
            academy : sekcjaAkademia{
              title
              text
              grid{
                title
                text
                link{
                  title
                  url
                }
                image{
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
    `,
  })

  return {
    hero: homepage.hero,
    flex: homepage.casestudie,
    specialisationsSection: homepage.specialisations,
    cta: homepage.cta,
    stepsToConsultation: global.global.bookGlobal,
    ctaGray: homepage.wezwanieDoDzialaniaZSzarymTlemKopia,
    specialists: specjalisci.nodes,
    activities: obszaryDzialania.nodes,
    reviews: homepage.sekcjaZOpiniamiKopia,
    newReviews: podopieczni.nodes,
    statistics: homepage.sekcjaStatystykiKopia,
    citate: homepage.sekcjaZCytatemKopia,
    blog: global.global.blogGlobal,
    posts: posts.nodes,
    newsletter: global.global.newsletterGlobal,
    compare: homepage.compare,
    academy: homepage.academy,
  }
}

export async function getStaticProps() {
  return {

  }
}