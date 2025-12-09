"use client";

import { Search } from "lucide-react";
import { motion } from "motion/react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  withAnimation?: boolean;
  delay?: number;
}

export const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  withAnimation = true,
  delay = 0.1,
}: SearchInputProps) => {
  const inputElement = (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0] z-10 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full glass-card !pl-12 !pr-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors relative"
      />
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        className="!mb-6"
      >
        {inputElement}
      </motion.div>
    );
  }

  return <div className="!mb-6">{inputElement}</div>;
};
