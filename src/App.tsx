import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ChannelCard from './components/ChannelCard';
import MobileNav from './components/MobileNav';
import SubChannelModal from './components/SubChannelModal';
import { CHANNELS } from './data';
import { Channel } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Star, History } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('fut-pratico-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('fut-pratico-history');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChannelAccess = (channelId: string) => {
    setHistory(prev => {
      const newHistory = [channelId, ...prev.filter(id => id !== channelId)].slice(0, 6);
      localStorage.setItem('fut-pratico-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const historyChannels = useMemo<Channel[]>(() => {
    return CHANNELS.filter(c => history.includes(c.id))
      .sort((a, b) => history.indexOf(a.id) - history.indexOf(b.id));
  }, [history]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('fut-pratico-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const openSubChannelModal = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsModalOpen(true);
  };

  const filteredChannels = useMemo<Channel[]>(() => {
    let result = CHANNELS;

    // 1. Filtragem por Categoria ou Contexto
    if (activeCategory === 'favorites') {
      result = result.filter(c => favorites.includes(c.id));
    } else if (activeCategory !== 'all' && activeCategory !== 'search') {
      // Só filtra por categoria se não estiver na aba de busca ou no início
      result = result.filter(c => c.category === activeCategory);
    }

    // 2. Filtragem de Busca (Prioridade Global se houver texto)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      // Se houver busca, ignoramos a categoria (exceto se estiver em favoritos para manter contexto)
      const baseToSearch = activeCategory === 'favorites' ? result : CHANNELS;
      
      result = baseToSearch.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery, favorites]);

  // Section helper
  const SectionHeader = ({ icon: Icon, title, color = "text-brand-neon" }: { icon: any, title: string, color?: string }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-lg md:text-xl font-display font-semibold text-white/90 tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen pb-40 premium-gradient">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        favoritesCount={favorites.length}
        onFavoritesClick={() => {
          setActiveCategory('favorites');
          setSearchQuery('');
        }}
      />
      
      <AnimatePresence mode="wait">
        {activeCategory === 'all' && !searchQuery && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-6 md:px-8 mt-16 relative z-10">
        
        {/* Mobile Search Input (Refined) */}
        <div className="md:hidden relative mb-10 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-brand-neon" />
          <input
            type="text"
            placeholder="Buscar canais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-neon/40 transition-all placeholder:text-neutral-600"
          />
        </div>

        <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="space-y-24">
          {/* Main Grid */}
          <motion.section 
            layout
            className="relative"
          >
            <SectionHeader 
              icon={activeCategory === 'favorites' ? Star : (searchQuery ? Search : Flame)} 
              title={
                searchQuery 
                  ? `Resultados para "${searchQuery}"`
                  : activeCategory === 'all' 
                    ? "Bombando Hoje" 
                    : activeCategory === 'favorites' 
                      ? "Meus Favoritos" 
                      : activeCategory === 'search'
                        ? "O que você quer assistir?"
                        : "Canais de " + activeCategory.toUpperCase()
              } 
            />

            {filteredChannels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredChannels.map((channel) => (
                    <ChannelCard
                      key={channel.id}
                      channel={channel}
                      isFavorite={favorites.includes(channel.id)}
                      onToggleFavorite={toggleFavorite}
                      onAccess={() => handleChannelAccess(channel.id)}
                      onSubChannelClick={openSubChannelModal}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="inline-block p-8 bg-white/5 rounded-full mb-8 border border-white/5">
                  <Search className="w-10 h-10 text-neutral-800" />
                </div>
                <h3 className="text-xl font-semibold text-white/80 mb-3">Nenhum resultado</h3>
                <p className="text-neutral-600 max-w-xs mx-auto text-sm font-light">Não encontramos nada para "{searchQuery || activeCategory}". Tente outra busca ou categoria.</p>
              </div>
            )}
          </motion.section>

          {/* Continue Watching Section (only on home if history exists) */}
          {activeCategory === 'all' && !searchQuery && historyChannels.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader icon={History} title="Acessados recentemente" color="text-neutral-400" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-80">
                 {historyChannels.slice(0, 4).map(channel => (
                   <ChannelCard 
                    key={`history-${channel.id}`} 
                    channel={channel} 
                    isFavorite={favorites.includes(channel.id)} 
                    onToggleFavorite={toggleFavorite} 
                    onAccess={() => handleChannelAccess(channel.id)}
                    onSubChannelClick={openSubChannelModal}
                   />
                 ))}
              </div>
            </motion.section>
          )}

          {/* Favorites Quick Access Section (only on home if any favorites exist) */}
          {activeCategory === 'all' && !searchQuery && favorites.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader icon={Star} title="Sua Seleção Premium" color="text-yellow-500" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {CHANNELS.filter(c => favorites.includes(c.id)).slice(0, 4).map(channel => (
                   <ChannelCard 
                    key={`fav-section-${channel.id}`} 
                    channel={channel} 
                    isFavorite={true} 
                    onToggleFavorite={toggleFavorite} 
                    onAccess={() => handleChannelAccess(channel.id)}
                    onSubChannelClick={openSubChannelModal}
                   />
                 ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <MobileNav 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        favoritesCount={favorites.length}
      />

      <SubChannelModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        channel={selectedChannel} 
      />

      {/* Decorative Blur - Extremely Subtle */}
      <div className="fixed top-0 right-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-brand-neon/[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-brand-neon/[0.01] blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
