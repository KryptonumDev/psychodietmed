import React from "react";
import styles from "./styles.module.scss";

export default function StarRating({ rating }) {
  // Make sure the rating is between 1 and 5
  const normalizedRating = Math.min(5, Math.max(1, parseInt(rating) || 1));

  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} filled={star <= normalizedRating} />
      ))}
    </div>
  );
}

const Star = ({ filled }) => (
  <svg
    className={`${styles.star} ${filled ? styles.filled : styles.empty}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={filled ? "#FFBB33" : "none"}
      stroke="#FFBB33"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
