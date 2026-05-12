import { Search, Heart, User, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  onFavoritesClick: () => void;
}

export default function Header({ searchQuery, setSearchQuery, favoritesCount, onFavoritesClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-3",
        isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-2.5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 bg-brand-neon rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.25)]">
            <LayoutGrid className="text-black w-4.5 h-4.5" strokeWidth={3} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">
            FUT<span className="text-brand-neon">PRÁTICO</span>
          </span>
        </div>

        {/* Search Bar - Refined Style */}
        <div className="flex-grow max-w-lg">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 transition-colors group-focus-within:text-brand-neon" />
            <input
              type="text"
              placeholder="Futebol, filmes, canais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-neon/50 focus:bg-white/10 transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFavoritesClick}
            className="p-2 rounded-xl border border-transparent hover:bg-neutral-800/50 hover:border-white/5 transition-all relative"
          >
            <Heart className={cn("w-5 h-5 text-neutral-400", favoritesCount > 0 && "text-red-500 fill-red-500")} />
            {favoritesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            )}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl border border-transparent hover:bg-neutral-800/50 hover:border-white/5 transition-all text-neutral-400"
          >
            <User className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
