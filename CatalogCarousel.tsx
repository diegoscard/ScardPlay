import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Film, 
  Search, 
  Sparkles, 
  ArrowRight,
  Tv,
  Check,
  Calendar,
  Layers,
  X
} from 'lucide-react';
import { MovieItem } from './types';

const WHATSAPP_PHONE = "5541988745822";

// Deterministic subtle genre styling for the cinema billboard backdrop
const getGenreAesthetic = (generos: string[]) => {
  const g = generos[0]?.toLowerCase() || '';
  if (g.includes('ação') || g.includes('guerra') || g.includes('faroeste')) {
    return {
      accent: 'text-red-500',
      border: 'border-red-500/30',
      bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(229, 9, 20, 0.18) 0%, rgba(7, 8, 10, 0) 70%)',
      badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20',
      themeName: 'Ação & Combate'
    };
  }
  if (g.includes('terror') || g.includes('suspense') || g.includes('thriller')) {
    return {
      accent: 'text-rose-400',
      border: 'border-rose-500/30',
      bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(190, 18, 60, 0.16) 0%, rgba(7, 8, 10, 0) 70%)',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      themeName: 'Suspense & Mistério'
    };
  }
  if (g.includes('animação') || g.includes('aventura') || g.includes('fantasia')) {
    return {
      accent: 'text-amber-400',
      border: 'border-amber-500/30',
      bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(245, 158, 11, 0.15) 0%, rgba(7, 8, 10, 0) 70%)',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      themeName: 'Animação & Aventura'
    };
  }
  if (g.includes('comédia')) {
    return {
      accent: 'text-yellow-400',
      border: 'border-yellow-500/30',
      bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(234, 179, 8, 0.14) 0%, rgba(7, 8, 10, 0) 70%)',
      badgeBg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
      themeName: 'Comédia & Diversão'
    };
  }
  if (g.includes('ficção')) {
    return {
      accent: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(6, 182, 212, 0.16) 0%, rgba(7, 8, 10, 0) 70%)',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
      themeName: 'Ficção Científica'
    };
  }
  if (g.includes('documentários') || g.includes('nacional')) {
    return {
      accent: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(16, 185, 129, 0.15) 0%, rgba(7, 8, 10, 0) 70%)',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      themeName: 'Documentários & Cultura'
    };
  }
  // Default / Drama / Romance
  return {
    accent: 'text-scard-red',
    border: 'border-white/10',
    bgGlow: 'radial-gradient(ellipse at 80% 30%, rgba(229, 9, 20, 0.12) 0%, rgba(7, 8, 10, 0) 70%)',
    badgeBg: 'bg-white/5 text-gray-300 border-white/10',
    themeName: 'Cinema & Streaming'
  };
};

export const CatalogCarousel: React.FC = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isPausedHover, setIsPausedHover] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Touch Swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load static catalog once
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        // Load local static JSON without external network API calls
        let response = await fetch('/catalogo-2026.json');
        if (!response.ok) {
          response = await fetch('/assets/aistudio/catalogo-2026_d59c4fae.json');
        }
        if (!response.ok) {
          throw new Error('Falha ao carregar o catálogo estático.');
        }
        const data: MovieItem[] = await response.json();
        if (isMounted) {
          setMovies(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erro ao ler catálogo:', err);
          setError('Não foi possível carregar o catálogo de lançamentos.');
          setLoading(false);
        }
      }
    };

    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered list based on genre and search query
  const filteredMovies = useMemo(() => {
    if (!movies.length) return [];
    return movies.filter(movie => {
      const matchGenre = selectedGenre === 'todos' || 
        (movie.generos && movie.generos.some(g => g.toLowerCase() === selectedGenre.toLowerCase()));
      const matchSearch = !searchQuery.trim() || 
        movie.titulo.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchGenre && matchSearch;
    });
  }, [movies, selectedGenre, searchQuery]);

  // Ensure currentIndex stays within bounds when filter changes
  useEffect(() => {
    if (currentIndex >= filteredMovies.length) {
      setCurrentIndex(0);
    }
  }, [filteredMovies.length, currentIndex]);

  // Extract distinct genres for quick filters
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach(m => {
      (m.generos || []).forEach(g => set.add(g));
    });
    return Array.from(set).sort();
  }, [movies]);

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    if (filteredMovies.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % filteredMovies.length);
    setProgress(0);
  }, [filteredMovies.length]);

  const prevSlide = useCallback(() => {
    if (filteredMovies.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + filteredMovies.length) % filteredMovies.length);
    setProgress(0);
  }, [filteredMovies.length]);

  // Check reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // 5-second Autoplay timer & progress bar
  useEffect(() => {
    if (!isPlaying || isPausedHover || prefersReducedMotion || filteredMovies.length <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalDuration = 5000; // 5 seconds
    const tickInterval = 50; // update progress every 50ms
    const step = (tickInterval / intervalDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          nextSlide();
          return 0;
        }
        return p + step;
      });
    }, tickInterval);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isPausedHover, prefersReducedMotion, filteredMovies.length, nextSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Current movie
  const currentMovie = filteredMovies[currentIndex] || null;
  const aesthetic = currentMovie ? getGenreAesthetic(currentMovie.generos || []) : null;

  // WhatsApp query link specific to this movie
  const currentWhatsAppLink = currentMovie
    ? `https://wa.me/${WHATSAPP_PHONE}?text=Ol%C3%A1%2C%20vi%20o%20filme%20%22${encodeURIComponent(currentMovie.titulo)}%22%20no%20cat%C3%A1logo%202026%20do%20site%20e%20gostaria%20de%20saber%20a%20disponibilidade!`
    : `https://wa.me/${WHATSAPP_PHONE}?text=Ol%C3%A1,%20vim%20pelo%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es`;

  if (loading) {
    return (
      <section className="pt-24 pb-8 bg-[#07080A] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[440px] sm:h-[480px] rounded-3xl bg-[#0F1116] border border-white/[0.06] flex items-center justify-center animate-pulse">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Film size={36} className="text-scard-red animate-spin" />
              <span className="text-xs font-semibold tracking-wider uppercase">Carregando catálogo cinematográfico...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !currentMovie) {
    return null; // Graceful fail without breaking page
  }

  return (
    <section 
      id="catalogo" 
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#07080A] border-b border-white/[0.08] overflow-hidden"
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Marquee Bar: Header & Search trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-scard-red/10 border border-scard-red/30 flex items-center justify-center text-scard-red shrink-0">
              <Film size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-scard-red">
                  Catálogo 2026
                </span>
                <span className="text-[10px] text-gray-400 font-mono bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded">
                  {filteredMovies.length} títulos
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                Pré-estreias e lançamentos identificados na grade oficial
              </p>
            </div>
          </div>

          {/* Quick controls: Genre filter dropdown & search button */}
          <div className="flex items-center gap-2">
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentIndex(0);
                setProgress(0);
              }}
              className="bg-[#0F1116] border border-white/[0.08] text-gray-300 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-scard-red"
              aria-label="Filtrar por gênero"
            >
              <option value="todos">Todos os Gêneros ({movies.length})</option>
              {availableGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-1.5 bg-[#0F1116] hover:bg-[#151820] border border-white/[0.08] hover:border-white/[0.2] text-gray-300 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
              title="Buscar filme por título"
            >
              <Search size={14} className="text-scard-red" />
              <span className="hidden sm:inline">Buscar Título</span>
            </button>
          </div>
        </div>

        {/* The Main Billboard Slide Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[#0C0E13] shadow-2xl min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
          
          {/* Ambient Lighting & Backdrop Graphic */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: aesthetic?.bgGlow || 'none'
            }}
          />

          {/* Watermark of Movie Title in the Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-end pr-6 opacity-[0.035]">
            <span className="text-[14vw] font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap text-right transform rotate-[-4deg]">
              {currentMovie.titulo}
            </span>
          </div>

          {/* Film Frame Texture / Image Support */}
          {currentMovie.imagem ? (
            <div className="absolute inset-0">
              <img 
                src={currentMovie.imagem} 
                alt={currentMovie.titulo}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if local image doesn't exist yet
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/60" />
            </div>
          ) : (
            /* Professional Dark Cinema Graphic Backdrop */
            <div className="absolute inset-0 bg-gradient-to-tr from-[#07080A] via-[#0D1016] to-[#121620] opacity-95">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />
              {/* Cinema Projector Vignette Lines */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-scard-red/[0.04] to-transparent pointer-events-none" />
            </div>
          )}

          {/* Content Body: Left Column Information */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl flex-1 flex flex-col justify-center space-y-6">
            
            {/* Metadata Tags Line */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-scard-red text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Sparkles size={12} />
                <span>Lançamento {currentMovie.ano}</span>
              </div>

              {currentMovie.generos && currentMovie.generos.length > 0 ? (
                currentMovie.generos.map((g, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-gray-300 text-[11px] font-medium"
                  >
                    {g}
                  </span>
                ))
              ) : (
                <span className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-gray-300 text-[11px] font-medium">
                  Grade Oficial
                </span>
              )}

              <span className="text-gray-500 hidden sm:inline">·</span>
              <span className="text-gray-400 font-mono text-[11px] hidden sm:inline">4K Ultra HD</span>
            </div>

            {/* Movie Title */}
            <div>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md text-balance">
                {currentMovie.titulo}
              </h3>
            </div>

            {/* Synopsis or Professional Preview Disclaimer */}
            <div className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {currentMovie.sinopse && currentMovie.sinopse.trim().length > 0 ? (
                <p className="line-clamp-3">{currentMovie.sinopse}</p>
              ) : (
                <p className="text-gray-400 text-xs sm:text-sm italic border-l-2 border-scard-red/60 pl-3">
                  Título em pré-visualização no catálogo 2026 da SCARD PLAY. Consulte nossa equipe de atendimento para confirmação de grade, dublagem e legendas.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href={currentWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-scard-red hover:bg-scard-redDark text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-scard-red/25 transition-all active:scale-95"
              >
                <span>Consultar Disponibilidade</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href="#planos"
                className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-gray-200 hover:text-white px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border border-white/[0.1] transition-colors"
              >
                <Tv size={16} className="text-scard-red" />
                <span>Ver Planos</span>
              </a>
            </div>

          </div>

          {/* Bottom Bar inside the Billboard: Position Indicator, Progress Bar & Controls */}
          <div className="relative z-10 p-4 sm:px-10 sm:py-5 bg-black/60 backdrop-blur-md border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            
            {/* Position counter */}
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <span className="font-mono font-bold text-white text-sm">
                {String(currentIndex + 1).padStart(3, '0')}
              </span>
              <span className="text-gray-600 font-mono">/</span>
              <span className="font-mono text-gray-400">
                {String(filteredMovies.length).padStart(3, '0')}
              </span>
              <span className="text-gray-500 text-[11px] hidden md:inline ml-2">
                (Transição a cada 5s)
              </span>
            </div>

            {/* Mini visual indicator / next upcoming title preview */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
              <span className="text-gray-500">Próximo:</span>
              <button 
                onClick={nextSlide}
                className="text-gray-300 hover:text-white font-semibold truncate max-w-[240px] text-left underline decoration-scard-red/50 hover:decoration-scard-red"
              >
                {filteredMovies[(currentIndex + 1) % filteredMovies.length]?.titulo}
              </button>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                title={isPlaying ? "Pausar troca automática" : "Iniciar troca automática"}
                aria-label={isPlaying ? "Pausar carrossel" : "Reproduzir carrossel"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5 fill-current" />}
              </button>

              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-scard-red border border-white/[0.08] hover:border-scard-red text-white flex items-center justify-center transition-all"
                title="Título anterior"
                aria-label="Filme anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-scard-red border border-white/[0.08] hover:border-scard-red text-white flex items-center justify-center transition-all"
                title="Próximo título"
                aria-label="Próximo filme"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* 5-second progress bar at the very bottom edge of the billboard */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/[0.06] overflow-hidden z-20">
            <div 
              className="h-full bg-scard-red transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>

      {/* Quick Search Modal for all 328 titles */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F1116] border border-white/[0.1] rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header & Search Input */}
            <div className="p-4 border-b border-white/[0.08] flex items-center gap-3">
              <Search size={20} className="text-scard-red shrink-0" />
              <input 
                type="text"
                autoFocus
                placeholder="Digite o nome do filme (ex: Batman, Homem-Aranha, Toy Story)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder-gray-500 font-medium"
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results list */}
            <div className="overflow-y-auto p-4 divide-y divide-white/[0.04] space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 px-2 py-1">
                {filteredMovies.length} títulos encontrados no catálogo 2026
              </div>
              {filteredMovies.slice(0, 50).map((m) => {
                const globalIndex = filteredMovies.indexOf(m);
                return (
                  <button
                    key={m.titulo}
                    onClick={() => {
                      setCurrentIndex(globalIndex);
                      setProgress(0);
                      setShowSearchModal(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-scard-red transition-colors">
                        {m.titulo}
                      </div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                        <span>{m.ano}</span>
                        {m.generos && m.generos.length > 0 && (
                          <>
                            <span>·</span>
                            <span>{m.generos.join(', ')}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                  </button>
                );
              })}
              {filteredMovies.length > 50 && (
                <p className="text-center text-xs text-gray-500 py-2">
                  Mostrando os primeiros 50 resultados. Refine sua busca para ver mais.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default CatalogCarousel;
