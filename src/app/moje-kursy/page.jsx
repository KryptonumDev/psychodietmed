import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
import { cookies } from "next/headers";
import Controller from "@/components/sections/my-courses-controller";
import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/components/sections/breadcrumbs";
import { Fetch } from "../../utils/fetch-query";
import axios from "axios";

export async function generateMetadata() {
  return await generetaSeo("cG9zdDoxOTAz", "/moje-kursy", GET_SEO_PAGE);
}

export default async function Courses() {
  const authToken = cookies().get("authToken")?.value;

  if (!authToken) redirect("/logowanie", "replace");

  const { data } = await getData();
  const { user } = await getUser(authToken);
  const corses = await getCoursesIds(user.databaseId);

  return (
    <main className="overflow">
      <Breadcrumbs data={[{ page: "Moje kursy", url: `/moje-kursy` }]} />
      <Controller corses={corses} cta={data?.callToActionCourses} />
    </main>
  );
}

async function getUser(authToken) {
  try {
    const {
      body: {
        data: { viewer },
      },
    } = await Fetch({
      query: `
        query Viewer {
          viewer {
            username
            databaseId
          }
        }
      `,
      revalidate: 0,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!viewer?.username) redirect("/logowanie");

    return {
      user: viewer,
    };
  } catch (error) {
    console.log("error", error);
    redirect("/logowanie");
  }
}

async function getCoursesIds(id) {
  let { data } = await axios.get(
    `https://wp.psychodietmed.pl/wp-json/ldlms/v2/users/${id}/courses`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.AUTHORISE_USERNAME}:${process.env.LEARNDASH_PASSWORD}`
        )}`,
      },
    }
  );

  if (data.length > 0) {
    const {
      body: {
        data: { courses },
      },
    } = await Fetch({
      query: `
        query Course($in: [ID]){
          courses(where: {in: $in}) {
            nodes {
              id
              databaseId
              slug
              title
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              course{
                excerpt
              }
            }
          }
        }
      `,
      variables: {
        in: data.map((e) => e.id),
      },
      revalidate: 60,
    });

    return courses;
  } else {
    return null;
  }
}

async function getData() {
  try {
    const {
      body: {
        data: { page },
      },
    } = await Fetch({
      query: `
        query Pages {
          page(id: "cG9zdDoxOTAz") {
            myCourses {
              callToActionCourses {
                content
                link {
                  url
                  title
                }
                image {
                  altText
                  mediaDetails {
                    width
                    height
                  }
                  mediaItemUrl
                }
              }
            }
          }
        }
      `,
      revalidate: 60,
    });

    return {
      data: page.myCourses,
    };
  } catch (error) {
    console.log("error", error);
    notFound();
  }
}
