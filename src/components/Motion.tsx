"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

export function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>{children}</motion.div>;
}
