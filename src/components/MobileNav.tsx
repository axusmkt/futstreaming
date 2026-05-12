import { Home, Trophy, Heart, Search, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MobileNavProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  favoritesCount: number;
}

export default function MobileNav({ activeCategory, setActiveCategory, favoritesCount }: MobileNavProps) {
  const items = [
    { id: 'all', label: 'Início', icon: Home },
    { id: 'futebol', label: 'Futebol', icon: Trophy },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'favorites', label: 'Favoritos', icon: Heart, badge: favoritesCount },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
      <div className="bg-black/60 backdrop-blur-2xl px-2 py-2 flex items-center justify-between rounded-[2rem] border border-white/5 shadow-2xl shadow-black/80">
        {items.map((item) => {
          const isActive = activeCategory === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveCategory(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 min-w-[60px]",
                isActive ? "text-brand-neon" : "text-neutral-500"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-x-2 inset-y-1 bg-brand-neon/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-5 h-5 flex-shrink-0 z-10", isActive && "stroke-[2.5px]")} />
              <span className="text-[9px] mt-1 font-semibold tracking-wide uppercase z-10">{item.label}</span>
              
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1.5 right-3 w-3.5 h-3.5 bg-red-500 text-[8px] flex items-center justify-center rounded-full text-white font-bold border border-black">
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
