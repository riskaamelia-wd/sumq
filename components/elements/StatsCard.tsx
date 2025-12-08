import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  gradient,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="glass-panel !p-6 hover:border-white/20 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <motion.div
          className="text-xs !px-3 !py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          Active
        </motion.div>
      </div>
      <h3 className="text-3xl mb-1">{value}</h3>
      <p className="text-[#A0A0A0]">{title}</p>
    </motion.div>
  );
}
