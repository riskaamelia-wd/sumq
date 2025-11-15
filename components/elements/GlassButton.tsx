import { Icon, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function GlassButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
}: GlassButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#4BD5FF] to-[#B388FF] text-white hover:shadow-lg hover:shadow-[#4BD5FF]/30",
    secondary: "glass-card text-white hover:bg-white/10 border border-white/10",
    danger:
      "glass-card text-[#FF6B9D] hover:bg-[#FF6B9D]/10 border border-[#FF6B9D]/30",
  };
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
        variants[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </motion.button>
  );
}
