import axios from "axios";

export async function isEnrolled(courseId, userId) {
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
