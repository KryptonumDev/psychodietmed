import { notFound } from 'next/navigation';
import { Fetch } from '@/utils/fetch-query';
import { generetaSeo } from '@/utils/genereate-seo';
import { GET_SEO_METHOD_LANDING } from '@/queries/method-landing-seo';
import MethodLandingTemplate from '@/components/templates/MethodLandingTemplate';

const SLUG = 'psychodietway';
const THEME = 'pdw';

export async function generateMetadata() {
  return await generetaSeo(SLUG, `/${SLUG}`, GET_SEO_METHOD_LANDING, 'page');
}

export default async function PsychoDietWayPage() {
  const { pageData, specialists } = await getData();

  if (!pageData) {
    notFound();
  }

  return (
    <MethodLandingTemplate 
      data={pageData} 
      theme={THEME} 
      slug={SLUG}
      specialists={specialists}
    />
  );
}

async function getData() {
  try {
    const { body: { data: { page, specjalisci } } } = await Fetch({
      query: `
        query MethodLandingPage($uri: ID!) {
          page(id: $uri, idType: URI) {
            id
            title
            methodLanding {
              methodTheme
              methodName
              hero {
                title
                subtitle
                specialist {
                  ... on Specjalista {
                    title
                    slug
                    specialisations(first: 10) {
                      nodes {
                        name
                      }
                    }
                    proffesional {
                      personImage {
                        altText
                        mediaItemUrl
                        mediaDetails {
                          height
                          width
                        }
                      }
                      proffesion
                      excerpt
                    }
                  }
                }
                ctaButton {
                  url
                  title
                }
                backgroundImage {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                heroImage {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              introduction {
                title
                content
              }
              process {
                title
                description
                processImage {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                items {
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
                ctaButton {
                  url
                  title
                }
              }
              targetAudience {
                title
                content
                tiles {
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
              accordion {
                title
                items {
                  title
                  content
                }
              }
              features {
                title
                content
                items {
                  title
                }
                ctaButton {
                  url
                  title
                }
              }
              founderSection {
                title
                image {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                ownerName
                ownerProfession
                repeater {
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
                content
                ctaButton {
                  url
                  title
                }
              }
              benefitsTiles {
                items {
                  text
                }
                content
                ctaButton {
                  url
                  title
                }
              }
              showSpecialistsCarousel
              specialistsSectionTitle
              ctaSection {
                content
                primaryButton {
                  url
                  title
                }
                secondaryButton {
                  url
                  title
                }
              }
            }
          }
          specjalisci(first: 100) {
            nodes {
              title
              slug
              specialisations(first: 100) {
                nodes {
                  id: databaseId
                  title: name
                }
              }
              proffesional {
                index
                specialistId
                serviceId
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
        }
      `,
      revalidate: 600,
      variables: {
        uri: SLUG,
      },
    });

    if (!page?.id) return { pageData: null, specialists: [] };

    return {
      pageData: page.methodLanding,
      specialists: specjalisci?.nodes || [],
    };
  } catch (error) {
    console.error('Error fetching PsychoDietWay data:', error);
    return { pageData: null, specialists: [] };
  }
}
