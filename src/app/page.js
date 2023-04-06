import Hero from "./components/sections/hero-home";
import { gql } from "@apollo/client";
import client from "./apolo-client";
import Flex from "./components/sections/case-studies-flex";
import Specialisations from "./components/sections/specialisations";
import Specialists from "./components/sections/specialists";
import StepsToConsultation from "./components/sections/steps-to-consultation";
import CallToActionTransparent from "./components/sections/call-to-action-tranparent";
import CallToActionGray from "./components/sections/call-to-action-gray";
import ReviewsSlider from "./components/sections/reviews-slider";
import StatisticsFlex from "./components/sections/statistics-flex";
import Citate from "./components/sections/citate";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  

export default async function Home() {
  const { hero, flex, specialisationsSection, specialisations, cta, specialists, stepsToConsultation, ctaGray, reviews, statistics, citate } = await getData()
  return (
    <main>
      <Hero data={hero} />
      <Flex data={flex} />
      <Specialisations data={specialisationsSection} specialisations={specialisations} />
      <CallToActionTransparent data={cta} />
      {/* <Specialists data={specialists} /> */}
      {/* <StepsToConsultation data={stepsToConsultation} /> */}
      <CallToActionGray data={ctaGray} />
      {/* <ReviewsSlider data={reviews} /> */}
      <StatisticsFlex data={statistics} />
      <Citate data={citate} />
      {/* akademia */}
      {/* blog */}
      {/* newsletter */}
    </main>
  )
}

async function getData() {
  const { data: { specjalizacje, specjalisci, page: { homepage } } } = await client.query({
    query: gql`
      query Pages {
        specjalizacje {
          nodes {
            title
            uri
            specialisation {
              specialisationCard { 
                zajawkaSpecjalizacji
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
    citate: homepage.sekcjaZCytatemKopia
  }
}