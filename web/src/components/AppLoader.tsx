import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const AppLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      {/* Flame Icon */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.08, 1],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Soft Glow Behind Flame */}
        <motion.div
          className="absolute inset-0 blur-2xl rounded-full bg-[#e11d48]/50"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Flame */}
        <Flame
          className="h-16 w-16 text-[#e11d48] relative z-10 drop-shadow-[0_0_20px_rgba(225,29,72,0.7)]"
          strokeWidth={1.7}
        />
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-2xl font-bold tracking-tight mt-6"
      >
        devtinder
      </motion.h1>

      {/* Tagline */}
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-muted-foreground mt-2"
      >
        Matching you with awesome devs...
      </motion.p>
    </div>
  );
};

export default AppLoader;
