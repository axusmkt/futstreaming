import { X, Send, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Channel } from '../types';
import { cn } from '../lib/utils';

interface SubChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: Channel | null;
}

export default function SubChannelModal({ isOpen, onClose, channel }: SubChannelModalProps) {
  if (!channel) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="relative p-8 pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-black/40 rounded-2xl p-3 flex items-center justify-center border border-white/5">
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{channel.name}</h2>
                    <p className="text-neutral-500 text-sm">{channel.category.toUpperCase()}</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Body - Options List */}
              <div className="px-6 pb-10 space-y-3">
                <p className="text-xs font-bold text-neutral-600 uppercase tracking-widest px-2 mb-4">Escolha uma opção para assistir:</p>
                
                <div className="grid gap-2">
                  {channel.subChannels?.map((sub) => (
                    <motion.a
                      key={sub.id}
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          sub.type === 'telegram' ? "bg-blue-500/10 text-blue-400" : "bg-brand-neon/10 text-brand-neon"
                        )}>
                          {sub.type === 'telegram' ? <Send className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-white group-hover:text-brand-neon transition-colors">
                            {sub.name}
                          </span>
                          <span className="block text-[10px] text-neutral-500 uppercase tracking-tighter">
                            {sub.type === 'telegram' ? 'Telegram Group' : 'Direct Link'}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-700 group-hover:text-brand-neon transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer Decoration */}
              <div className="h-2 bg-brand-neon" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
