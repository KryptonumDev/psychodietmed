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

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Home() {
  const { academy, compare, hero, flex, specialisationsSection, activities, cta, specialists, stepsToConsultation, newsletter, ctaGray, reviews, newReviews, statistics, citate, blog, posts } = await getData()

  const locReviews = { ...reviews }

  if (locReviews.comments.length < 4) {
    newReviews.forEach(podopieczny => {
      if (!locReviews.comments.find(comment => comment.id === podopieczny.id) && locReviews.comments.length < 4) {
        locReviews.comments = [...locReviews.comments, podopieczny]
      }
    })
  }

  return (
    <main className="overflow">
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

// async function getSeo() {
//   const { data } = await client.query({
//     query: gql`
//       query Seo {
//       }
//     `,
//   }, { pollInterval: 500 })

//   return {
//     ''
//   }
// }

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
          }
        }
        podopieczni(first: 4) {
          nodes {
            id
            slug
            histori {
              information {
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
        specjalisci {
          nodes {
            title
            slug
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
              specialisations {
                ... on Specjalizacja {
                  id
                  title
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
            sekcjaJakUmowicKonsultacjeKopia{
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
              illnes{
                ... on Specjalizacja {
                  id
                  slug
                  title
                }
              }
              titleSecond
              textSecond
              titleThird
              textThird
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
  }, { pollInterval: 500 })

  return {
    hero: homepage.hero,
    flex: homepage.casestudie,
    specialisationsSection: homepage.specialisations,
    cta: homepage.cta,
    stepsToConsultation: homepage.sekcjaJakUmowicKonsultacjeKopia,
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