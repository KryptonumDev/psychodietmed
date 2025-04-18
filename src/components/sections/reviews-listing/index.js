'use client';

import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { removeWrap } from "../../../utils/title-modification";
import ReviewCard from "@/components/moleculas/review-card";

export default function ReviewsListing({ data }) {
  const { heading, paragraph, listing } = data;
  const isTruncated = listing.length > 9;
  const [showAll, setShowAll] = useState(false);


  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: removeWrap(heading) }} />
        <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
      </header>
      <div
        className={styles.grid}
        data-truncated={isTruncated && !showAll}
      >
        <div className={styles.columnsContainer}>
          {listing.map((item, index) => (
            <div key={index} className={styles.gridItem}>
              <ReviewCard data={item} />
            </div>
          ))}
        </div>
      </div>
      {isTruncated && (
        <button
          className={styles.showMoreButton}
          onClick={() => setShowAll(prev => !prev)}
        >
          {showAll ? 'Pokaż mniej' : 'Pokaż więcej'}
        </button>
      )}
    </section>
  );
}
