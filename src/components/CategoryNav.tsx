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
    <div className="sticky top-[60px] z-40 bg-premium-dark/95 backdrop-blur-xl border-b border-white/5 py-3 -mx-6 px-6 mb-10 overflow-hidden">
      <div className="relative">
        {/* Horizontal Scroll Container */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x py-1 snap-x snap-mandatory">
          {CATEGORIES.map((category) => {
            const Icon = (Icons as any)[category.icon];
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 border text-[10px] font-bold flex-shrink-0 uppercase tracking-widest snap-start",
                  isActive 
                    ? "bg-brand-neon text-black border-brand-neon shadow-[0_8px_20px_rgba(57,255,20,0.2)]" 
                    : "bg-white/5 text-neutral-500 border-white/5 hover:border-white/10 hover:text-neutral-300 hover:bg-neutral-800"
                )}
              >
                {Icon && <Icon className={cn("w-4 h-4", isActive ? "text-black" : "text-neutral-400")} />}
                {category.name}
              </motion.button>
            );
          })}
        </div>
        
        {/* Visual indicators for scroll (Mobile only usually but good everywhere) */}
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-premium-dark to-transparent pointer-events-none opacity-100 z-10" />
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-premium-dark to-transparent pointer-events-none opacity-40 z-10" />
      </div>
    </div>
  );
}
