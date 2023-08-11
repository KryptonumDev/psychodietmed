import React from "react"
import styles from "./styles.module.scss"
import { motion } from "framer-motion"

export default function Loader() {
  return (
      <motion.div key='two' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.loader}>
        <div class={styles.ldsdefault}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </motion.div>
  )
}