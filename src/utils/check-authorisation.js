import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Fetch } from "./fetch-query";
import axios from "axios";

export async function getUser(courseId) {
  try {
    const authToken = cookies().get("authToken").value;

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

    if (!await isEnrolled(courseId, viewer.databaseId)) redirect("/kursy");

    return {
      user: viewer,
    };
  } catch (error) {
    console.log("error", error);
    redirect("/logowanie");
  }
}

async function isEnrolled(courseId, userId) {
  let { data } = await axios.get(
    `https://wp.psychodietmed.pl/wp-json/ldlms/v2/users/${userId}/courses`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.AUTHORISE_USERNAME}:${process.env.LEARNDASH_PASSWORD}`
        )}`,
      },
    }
  );

  return data.some((course) => course.id === courseId);
}
