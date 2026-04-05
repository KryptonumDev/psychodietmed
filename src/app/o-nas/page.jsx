import dynamic from "next/dynamic";
import OtherPosts from "@/components/sections/other-posts";
import Hero from "@/components/sections/hero-team";
import Owner from "@/components/sections/team-owner";
import Flowers from "@/components/sections/team-flowers";
import RepeaterFlex from "@/components/sections/team-repeater-flex";
import CallToActionGray from "@/components/sections/call-to-action-gray";
import Statistics from "@/components/sections/team-statistics";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";
import CombinedSpecializations from "@/components/sections/combined-specializations";

const Slider = dynamic(() => import("@/components/sections/team-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

const Specialists = dynamic(() => import("@/components/sections/specialists-slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxMTc2', '/o-nas', GET_SEO_PAGE)
}

export default async function Team() {
  const { posts, blog, page, specialists } = await getData()
  return (
    <main className="overflow" id="main">
      <Breadcrumbs data={[{ page: 'O nas', url: '/o-nas' }]} />
      <Hero data={page.team.heroTeam} />
      <Specialists data={specialists} />
      <Slider data={page.team.sliderTeam} />
      <Owner data={page.team.ownerTeam} />
      <Flowers data={page.team.flowersTeam} />
      <RepeaterFlex data={page.team.repeaterFlexTeam} />
      <CombinedSpecializations data={page.team.mixSpecialisations} />
      <CallToActionGray data={page.team.greyCtaTeam} />
      <Statistics data={page.team.statisticsTeam} />
      <OtherPosts data={posts} title={blog.title} text={blog.text} />
    </main>
  )
}

async function getData() {
  const { body: { data: { global, posts, page, specjalisci } } } = await Fetch({
    query: `
    query Pages {
      specjalisci {
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
      page(id: "cG9zdDoxMTc2") {
        id
        team{
          mixSpecialisations{
            title
            pinkContent
            blueContent
            pinkIcons {
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
            }
            blueIcons {
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
            }
          }
          statisticsTeam{
            title
            text
            link{
              title
              url
            }
            counters{
              number
              text
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
          heroTeam{
            title
            text
            link{
              title
              url
            }
            image{
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
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
            subTitle
          }
          sliderTeam{
            title
            content
            subTitle
            slider{
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
            }
          }
          ownerTeam{
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
          flowersTeam{
            repeater{
              text
            }
            text
            link{
              title
              url
            }
          }
          repeaterFlexTeam{
            title
            text
            image{
              altText
              mediaItemUrl
              mediaDetails{
                height
                width
              }
            }
          }
          greyCtaTeam {
            content
            link {
              title
              url
            }
          }
        }
      }
      global : page(id: "cG9zdDo3Nzk=") {
        id
        global {
          blogGlobal{
            title
            text
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
    }
  `,
    revalidate: 600
  })

  return {
    page: page,
    posts: posts.nodes,
    blog: global.global.blogGlobal,
    specialists: specjalisci.nodes
  }
}