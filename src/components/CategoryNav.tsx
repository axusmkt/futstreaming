import { CATEGORIES } from '../data';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CategoryNavProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

export default function CategoryNav({ activeCategory, setActiveCategory }: CategoryNavProps) {
  return (
    <div className="sticky top-[58px] z-40 bg-premium-dark/95 backdrop-blur-xl border-b border-white/5 py-4 -mx-6 px-6">
      <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar touch-pan-x active:cursor-grabbing">
        {CATEGORIES.map((category) => {
          const Icon = (Icons as any)[category.icon];
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 border text-xs font-semibold flex-shrink-0 uppercase tracking-wide",
                isActive 
                  ? "bg-brand-neon text-black border-brand-neon shadow-[0_5px_20px_rgba(57,255,20,0.2)]" 
                  : "bg-white/5 text-neutral-500 border-white/5 hover:border-white/10 hover:text-neutral-300 hover:bg-neutral-800"
              )}
            >
              {Icon && <Icon className={cn("w-3.5 h-3.5", isActive ? "text-black" : "text-neutral-500")} />}
              {category.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
