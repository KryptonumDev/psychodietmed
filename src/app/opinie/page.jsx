import React from 'react';
import { generetaSeo } from '../../utils/genereate-seo';
import { GET_SEO_PAGE } from '../../queries/page-seo';
import Breadcrumbs from '@/components/sections/breadcrumbs';
import ReviewsListing from '@/components/sections/reviews-listing';
import { Fetch } from '../../utils/fetch-query';

export async function generateMetadata() {
  return await generetaSeo('cG9zdDozOTYx', '/opinie', GET_SEO_PAGE);
}

export default async function Reviews() {
  const { page } = await getData();

  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'Opinie', url: `/opinie` }]} />
      <ReviewsListing data={page.reviews.reviewsListing} />
    </main>
  );
}

async function getData() {
  const {
    body: {
      data: { page },
    },
  } = await Fetch({
    query: `
    query ReviewsPage {
      page(id: "cG9zdDozOTYx") {
        id
        reviews {
          reviewsListing {
            heading
            paragraph
            listing {
              avatar {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              name
              rating
              content
              specialistReference {
                ... on Specjalista {
                  id
                  title
                  slug
                  proffesional {
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
              date
              reviewSource
            }
          }
        }
      }
    }
    `,
  });

  return {
    page,
  };
}
