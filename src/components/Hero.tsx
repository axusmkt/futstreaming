import { Play, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center pt-16">
      {/* Background Image with Shadow/Fade */}
      <div className="absolute inset-0 z-0 scale-105">
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000"
          alt="Stadium Background"
          className="w-full h-full object-cover opacity-40 grayscale-[0.2]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-premium-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-premium-dark via-transparent to-premium-dark/30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center max-w-4xl mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-8"
        >
          <div className="flex flex-col items-center gap-3">
             <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-neon"></span>
              </span>
              Streaming Premium
            </span>
          </div>

          <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
            Tudo em um <br />
            <span className="text-neutral-500 font-light">único lugar.</span>
          </h1>

          <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Organize seu entretenimento com o Fut Prático. Futebol, cinema e esporte mundial em uma interface premium e veloz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-brand-neon text-black font-bold px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-[0_10px_20px_rgba(57,255,20,0.15)]"
            >
              <Play className="w-4 h-4 fill-black" strokeWidth={3} />
              EXPLORAR
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white/5 border border-white/5 hover:bg-white/10 text-white font-medium px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm backdrop-blur-md transition-all"
            >
              <Info className="w-4 h-4" />
              Saber mais
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-premium-dark to-transparent z-10" />
    </section>
  );
}
