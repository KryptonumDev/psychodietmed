import { gql } from "@apollo/client";
import client from "../../apollo/apolo-client";
import OtherPosts from "@/components/sections/other-posts";
import Newsletter from "@/components/sections/newsletter";
import Hero from "@/components/sections/hero-team";
import Slider from "@/components/sections/team-slider";
import Owner from "@/components/sections/team-owner";
import Flowers from "@/components/sections/team-flowers";
import Recruitment from "@/components/sections/team-recruitment";
import RepeaterFlex from "@/components/sections/team-repeater-flex";
import Specialists from "@/components/sections/specialists-slider";
import CallToActionGray from "@/components/sections/call-to-action-gray";
import Statistics from "@/components/sections/team-statistics";
import CombinedSpecialisations from "@/components/sections/team-combined-specialisations";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxMTc2', '/zespol', GET_SEO_PAGE)
}

export default async function Team() {
  const { newsletter, posts, blog, page, specialists } = await getData()
  return (
    <main className="overflow">
      <Hero data={page.team.heroTeam} />
      <Slider data={page.team.sliderTeam} />
      <Owner data={page.team.ownerTeam} />
      <Flowers data={page.team.flowersTeam} />
      <Recruitment data={page.team.specialistGridTeam} />
      <RepeaterFlex data={page.team.repeaterFlexTeam} />
      <CombinedSpecialisations data={page.team.combinedSpecialisationsTeam} />
      <Specialists data={specialists} />
      <CallToActionGray data={page.team.greyCtaTeam} />
      <Statistics data={page.team.statisticsTeam} />
      <Newsletter data={newsletter} />
      <OtherPosts data={posts} title={blog.title} text={blog.text} />
    </main>
  )
}

async function getData() {
  const { data: { global, posts, page, specjalisci } } = await client.query({
    query: gql`
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
        page(id: "cG9zdDoxMTc2") {
          id
          team{
            combinedSpecialisationsTeam{
              title
              combinedCards{
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
              logo{
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
                    proffesion
                    personImage {
                      altText
                      mediaItemUrl
                      mediaDetails {
                        height
                        width
                      }
                    }
                    diploms {
                      diplom
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
  }, { pollInterval: 500 })

  return {
    page: page,
    newsletter: global.global.newsletterGlobal,
    posts: posts.nodes,
    blog: global.global.blogGlobal,
    specialists: specjalisci.nodes
  }
}