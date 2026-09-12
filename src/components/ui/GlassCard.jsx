import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  lift = true,
  spotlight = false,
  ...props
}) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      className={`glass-card relative overflow-hidden rounded-2xl ${spotlight ? "card-spotlight" : ""} ${className}`}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      whileHover={lift ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}