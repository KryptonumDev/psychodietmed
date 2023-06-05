import { gql } from "@apollo/client";
import client from "../apollo/apolo-client";
import Hero from "@/components/sections/hero-home";
import Flex from "@/components/sections/case-studies-flex";
import Specialisations from "@/components/sections/specialisations";
import CallToActionTransparent from "@/components/sections/call-to-action-tranparent";
import Specialists from "@/components/sections/specialists";
import CallToActionGray from "@/components/sections/call-to-action-gray";
import ReviewsSlider from "@/components/sections/reviews-slider";
import StatisticsFlex from "@/components/sections/statistics-flex";
import Citate from "@/components/sections/citate";
import OtherPosts from "@/components/sections/other-posts";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Home() {
  const { hero, flex, specialisationsSection, specialisations, cta, specialists, stepsToConsultation, ctaGray, reviews, statistics, citate, blog, posts } = await getData()

  return (
    <main>
      <Hero data={hero} />
      <Flex data={flex} />
      <Specialisations data={specialisationsSection} specialisations={specialisations} />
      <CallToActionTransparent data={cta} />
      <Specialists data={specialists} />
      {/* <StepsToConsultation data={stepsToConsultation} /> */}
      <CallToActionGray data={ctaGray} />
      <ReviewsSlider data={reviews} />
      <StatisticsFlex data={statistics} />
      <Citate data={citate} />
      {/* akademia */}
      <OtherPosts data={posts} title={blog.title} text={blog.text} />
      {/* newsletter */}
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
  const { data: { posts, specjalizacje, specjalisci, page: { homepage } } } = await client.query({
    query: gql`
      query Pages {
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
        specjalizacje {
          nodes {
            title
            id
            slug
            uri
            specialisation {
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
            profesje {
              nodes {
                name
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
            blog : sekcjaZBlogiemKopia{
              title
              text
            }
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
              steps{
                title
                content
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
            wezwanieDoDzialaniaZSzarymTlemKopia {
              text
              link {
                title
                url
              }
            }
            sekcjaZOpiniamiKopia {
              title
              text
              comments {
                text
                author {
                  name
                  avatar {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
                boldText
                after {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                before {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
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
    specialisations: specjalizacje.nodes,
    reviews: homepage.sekcjaZOpiniamiKopia,
    statistics: homepage.sekcjaStatystykiKopia,
    citate: homepage.sekcjaZCytatemKopia,
    blog: homepage.blog,
    posts: posts.nodes,
  }
}