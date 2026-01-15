import dynamicImport from 'next/dynamic';
import Hero from '@/components/sections/hero-home';
import MethodsGrid from '@/components/sections/methods-grid';
import ResearchBanner from '@/components/sections/research-banner';

// Disable all caching for dev - remove for production
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// import Specialisations from '@/components/sections/specialisations'; // HIDDEN per client request
// import CallToActionTransparent from '@/components/sections/call-to-action-tranparent'; // HIDDEN per client request
import CallToActionGray from '@/components/sections/call-to-action-gray';
import ReviewsSlider from '@/components/sections/reviews-slider';
import StatisticsFlex from '@/components/sections/statistics-flex';
import Citate from '@/components/sections/citate';
import OtherPosts from '@/components/sections/other-posts';
import Newsletter from '@/components/sections/newsletter';
// import StepsToConsultation from '@/components/sections/steps-to-consultation'; // HIDDEN per client request
// import Academy from "@/components/sections/academy";
import { generetaSeo } from '../utils/genereate-seo';
import { GET_SEO_PAGE } from '../queries/page-seo';
import { Fetch } from '../utils/fetch-query';

const Specialists = dynamicImport(() => import('@/components/sections/specialists-slider'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

export async function generateMetadata() {
  return await generetaSeo('cG9zdDo5', '', GET_SEO_PAGE);
}

export default async function Home() {
  const {
    academy,
    compare,
    hero,
    methods,
    researchBanner,
    specialisationsSection,
    activities,
    cta,
    specialists,
    stepsToConsultation,
    newsletter,
    ctaGray,
    reviews,
    newReviews,
    statistics,
    citate,
    blog,
    posts,
  } = await getData();

  const locReviews = { ...reviews };

  if (!locReviews.comments) {
    locReviews.comments = [...newReviews];
  } else if (locReviews.comments.length < 4) {
    newReviews.forEach((podopieczny) => {
      if (!locReviews.comments.find((comment) => comment.id === podopieczny.id) && locReviews.comments.length < 4) {
        locReviews.comments = [...locReviews.comments, podopieczny];
      }
    });
  }

  return (
    <main className="overflow" id="main">
      {/* 1. Hero + Logos */}
      <Hero data={hero} />
      
      {/* 2. Nasze Metody (PDW, PDR, CBT) */}
      {methods && <MethodsGrid data={methods} />}
      
      {/* 3. Baner "Badania pokazują..." */}
      {researchBanner && <ResearchBanner data={researchBanner} />}
      
      {/* 4. Specialists Slider */}
      <Specialists data={specialists} />
      
      {/* HIDDEN: CTA Transparent ("Wezwanie do działania bez tła") */}
      {/* <CallToActionTransparent data={cta} /> */}
      
      {/* HIDDEN: Specialisations ("W czym możemy pomóc?") */}
      {/* <Specialisations data={specialisationsSection} activities={activities} /> */}
      
      {/* HIDDEN: StepsToConsultation ("Jak umówić konsultację?") */}
      {/* <StepsToConsultation data={stepsToConsultation} specialists={specialists} /> */}
      
      {/* 6. Reviews */}
      <ReviewsSlider data={locReviews} />
      
      {/* 7. CTA Gray */}
      <CallToActionGray data={ctaGray} />
      
      {/* 8. Statistics */}
      <StatisticsFlex data={statistics} />
      
      {/* 9. Citate */}
      <Citate data={citate} />
      
      {/* HIDDEN: Academy */}
      {/* <Academy data={academy} /> */}
      
      {/* 10. Blog Posts */}
      <OtherPosts data={posts} title={blog.title} text={blog.text} />
      
      {/* 11. Newsletter */}
      <Newsletter specialist={false} data={newsletter} />
    </main>
  );
}

async function getData() {
  const {
    body: {
      data: {
        global,
        podopieczni,
        posts,
        obszaryDzialania,
        specjalisci,
        page: { homepage },
      },
    },
  } = await Fetch({
    query: `
    query Pages {
      global : page(id: "cG9zdDo3Nzk=") {
        id
        global {
          newsletterClientGlobal{
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
              specialist {
                ... on Specjalista {
                  title
                  slug
                  proffesional {
                    index
                    avatar {
                      altText
                      mediaItemUrl
                      mediaDetails{
                        width
                        height
                      }
                    }
                  }
                }
              }
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
            heroKafelek {
              title
            }
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
          methods : sekcjaMetody {
            title
            text
            methods {
              title
              themeColor
              description
              icon {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              link {
                url
                title
              }
            }
          }
          researchBanner : sekcjaBanerBadania {
            content
            style
            link {
              url
              title
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
                    specialist {
                      ... on Specjalista {
                        title
                        slug
                        proffesional {
                          index
                          avatar {
                            altText
                            mediaItemUrl
                            mediaDetails{
                              width
                              height
                            }
                          }
                        }
                      }
                    }
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
    revalidate: 600,
  });

  return {
    hero: homepage.hero,
    methods: homepage.methods,
    researchBanner: homepage.researchBanner,
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
    newsletter: global.global.newsletterClientGlobal,
    compare: homepage.compare,
    academy: homepage.academy,
  };
}
