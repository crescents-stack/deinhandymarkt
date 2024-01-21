"use client";

import { ReactChildren } from "@/lib/types";
import { motion } from "framer-motion";

const Template = ({ children }: ReactChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
