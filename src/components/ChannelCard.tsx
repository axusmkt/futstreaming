import React from 'react';
import { ExternalLink, Heart, Trophy, Dribbble, Sword, Film, Tv, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Channel } from '../types';
import { cn } from '../lib/utils';

interface ChannelCardProps {
  channel: Channel;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAccess?: () => void;
  onSubChannelClick?: (channel: Channel) => void;
  key?: React.Key;
}

export default function ChannelCard({ channel, isFavorite, onToggleFavorite, onAccess, onSubChannelClick }: ChannelCardProps) {
  const hasSubChannels = channel.subChannels && channel.subChannels.length > 0;

  const handleAccess = (e: React.MouseEvent) => {
    if (hasSubChannels) {
      e.preventDefault();
      onSubChannelClick?.(channel);
    } else {
      onAccess?.();
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'futebol': return { label: 'Futebol', icon: Trophy, color: 'text-emerald-400 bg-emerald-400/10' };
      case 'nba': return { label: 'Basquete', icon: Dribbble, color: 'text-orange-400 bg-orange-400/10' };
      case 'lutas': return { label: 'Lutas', icon: Sword, color: 'text-red-400 bg-red-400/10' };
      case 'filmes': return { label: 'Cinema', icon: Film, color: 'text-purple-400 bg-purple-400/10' };
      case 'series': return { label: 'Séries', icon: Tv, color: 'text-blue-400 bg-blue-400/10' };
      default: return { label: 'Geral', icon: Play, color: 'text-neutral-400 bg-neutral-400/10' };
    }
  };

  const badge = getCategoryBadge(channel.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group relative bg-premium-gray border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-premium"
    >
      {/* Thumbnail with Gradient Overlay */}
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={channel.thumbnail || `https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800`} 
          alt={channel.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-gray via-premium-gray/40 to-transparent" />
        
        {/* badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {channel.status === 'live' && (
            <div className="flex items-center gap-1.5 bg-red-600 px-2.5 py-1 rounded-full shadow-lg">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">AO VIVO</span>
            </div>
          )}
          <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10", badge.color)}>
            <badge.icon className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{badge.label}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(channel.id);
          }}
          className={cn(
            "absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-xl border border-white/5 transition-all duration-300 z-10",
            isFavorite ? "bg-red-500 text-white border-red-500" : "bg-black/20 text-white/40 hover:text-white"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-white")} />
        </motion.button>

        {/* Logo Overlap */}
        <div className="absolute -bottom-5 left-6 w-14 h-14 bg-zinc-900 rounded-xl p-2 flex items-center justify-center border border-white/10 shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-y-1">
          <img 
            src={channel.logo} 
            alt={channel.name} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=0a0a0a&color=fff&size=256`;
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-8">
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-neon transition-colors duration-300 truncate">
          {channel.name}
        </h3>
        <p className="text-neutral-500 text-xs mt-1.5 line-clamp-1 font-light opacity-80">
          {channel.description}
        </p>

        {/* Big Premium Button */}
        <motion.a
          href={hasSubChannels ? '#' : channel.url}
          target={hasSubChannels ? undefined : "_blank"}
          rel="noopener noreferrer"
          onClick={handleAccess}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full bg-white/5 border border-white/5 hover:bg-brand-neon hover:text-black hover:border-brand-neon text-white font-bold py-3 rounded-xl text-[10px] tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          ACESSAR AGORA
          <ExternalLink className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </motion.a>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-20 bg-brand-neon/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}
