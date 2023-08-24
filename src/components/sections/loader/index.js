'use client'
import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function Loader({ className = '', show }) {

  const [needAnimation, setNeedAnimation] = useState(false);

  useEffect(() => {
    setNeedAnimation(true)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div key='two' initial={{ opacity: needAnimation ? 0 : 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.loader} ${className}`}>
          <div className={styles.ldsdefault}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}