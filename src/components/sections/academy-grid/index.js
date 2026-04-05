import React from "react";
import styles from "./styles.module.scss";
import Course from "@/components/moleculas/course-card-product";
import { Card } from "@/components/moleculas/product-card";
import { isEnrolled } from "../../../utils/check-enrollment";

export default function Grid({ user, courses, ebooks }) {
  return (
    <section className={styles.wrapper}>
      {/* <h1>Sprawdź najnowszy kurs</h1> */}
      {courses.nodes.length > 0 && (
        <>
          <h2>Nasze kursy</h2>
          <div className={styles.grid}>
            {courses.nodes.map(async (item, index) => {
              let isFeaturedMyProduct = user?.databaseId
                ? await isEnrolled(
                    item.product.course.databaseId,
                    user?.databaseId
                  )
                : null;

                console.log(isFeaturedMyProduct)
              return (
                <Course
                  myCourse={isFeaturedMyProduct}
                  data={item}
                  key={index}
                />
              );
            })}
          </div>
        </>
      )}
      {ebooks.nodes.length > 0 && (
        <>
          <h2>Nasze eBooki</h2>
          <div className={styles.grid}>
            {ebooks.nodes.map((item, index) => (
              <Card offer={false} product={item} key={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
