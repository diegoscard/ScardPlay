import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Film,
  Search,
  MessageCircle,
  X
} from 'lucide-react';
import { MovieItem } from './types';

const WHATSAPP_PHONE = "5541988745822";
const AUTOPLAY_MS = 5000;
const DASH_COUNT = 8;

const getGenrePalette = (generos: string[]) => {
  const g = generos[0]?.toLowerCase() || '';
  if (g.includes('ação') || g.includes('guerra') || g.includes('faroeste')) {
    return {
      gradient: 'from-[#1a080a] via-[#0e0a0d] to-black',
      glow: 'rgba(229, 9, 20, 0.24)',
      accentText: 'text-red-400',
      lineColor: 'bg-red-500/50'
    };
  }
  if (g.includes('terror') || g.includes('suspense') || g.includes('thriller')) {
    return {
      gradient: 'from-[#170910] via-[#0d090d] to-black',
      glow: 'rgba(190, 18, 60, 0.22)',
      accentText: 'text-rose-400',
      lineColor: 'bg-rose-500/50'
    };
  }
  if (g.includes('animação') || g.includes('aventura') || g.includes('fantasia')) {
    return {
      gradient: 'from-[#181208] via-[#0f0c08] to-black',
      glow: 'rgba(245, 158, 11, 0.2)',
      accentText: 'text-amber-300',
      lineColor: 'bg-amber-400/50'
    };
  }
  if (g.includes('comédia')) {
    return {
      gradient: 'from-[#171408] via-[#0e0d09] to-black',
      glow: 'rgba(234, 179, 8, 0.18)',
      accentText: 'text-yellow-300',
      lineColor: 'bg-yellow-400/50'
    };
  }
  if (g.includes('ficção')) {
    return {
      gradient: 'from-[#07151b] via-[#090f14] to-black',
      glow: 'rgba(6, 182, 212, 0.2)',
      accentText: 'text-cyan-300',
      lineColor: 'bg-cyan-400/50'
    };
  }
  if (g.includes('documentários') || g.includes('nacional')) {
    return {
      gradient: 'from-[#081712] via-[#09100e] to-black',
      glow: 'rgba(16, 185, 129, 0.2)',
      accentText: 'text-emerald-300',
      lineColor: 'bg-emerald-400/50'
    };
  }
  if (g.includes('romance')) {
    return {
      gradient: 'from-[#190a12] via-[#10090e] to-black',
      glow: 'rgba(244, 63, 94, 0.2)',
      accentText: 'text-pink-300',
      lineColor: 'bg-pink-400/50'
    };
  }
  return {
    gradient: 'from-[#141720] via-[#0c0e13] to-black',
    glow: 'rgba(229, 9, 20, 0.16)',
    accentText: 'text-scard-ash',
    lineColor: 'bg-scard-red/50'
  };
};

// 3D Passage Tunnel Geometry for each depth slot (-1 to +6)
const getPassageTransform = (offset: number, isMobile: boolean) => {
  if (offset < 0) {
    // Gliding past camera
    return {
      x: 0,
      y: 16,
      z: 220,
      scale: 1.18,
      rotateY: 0,
      opacity: 0,
      zIndex: 60
    };
  }
  if (offset === 0) {
    // Center foreground focal poster
    return {
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 50
    };
  }

  // Alternating right (+1, +3, +5) and left (+2, +4, +6) tunnel walls
  const isRightWall = offset % 2 === 1;
  const sideSign = isRightWall ? 1 : -1;
  const depthStep = Math.ceil(offset / 2); // 1, 2, 3

  const baseSpread = isMobile ? 125 : 275;
  const extraSpread = isMobile ? 38 : 95;
  const x = sideSign * (baseSpread + (depthStep - 1) * extraSpread);
  const y = -depthStep * (isMobile ? 6 : 10);
  const z = -(offset * (isMobile ? 85 : 105));
  const scale = Math.max(0.35, 1 - offset * 0.105);
  const rotateY = sideSign * -(18 + depthStep * 4);
  const opacity = offset >= 6 ? 0.12 : Math.max(0.18, 1 - offset * 0.14);
  const zIndex = 45 - offset * 5;

  return { x, y, z, scale, rotateY, opacity, zIndex };
};

interface PassageCardProps {
  movie: MovieItem;
  offset: number;
  isMobile: boolean;
  reducedMotion: boolean;
  onSelect: () => void;
  whatsappLink: string;
}

const PassagePosterCard: React.FC<PassageCardProps> = ({
  movie,
  offset,
  isMobile,
  reducedMotion,
  onSelect,
  whatsappLink
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [movie.imagem, movie.titulo]);

  const isCenter = offset === 0;
  const isExiting = offset < 0;
  const palette = getGenrePalette(movie.generos || []);
  const hasImage = Boolean(movie.imagem) && !imgFailed;
  const geom = getPassageTransform(offset, isMobile);

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={movie.titulo}
      aria-hidden={!isCenter && offset > 5}
      onClick={() => {
        if (!isCenter && !isExiting) {
          onSelect();
        }
      }}
      style={{
        transform: `translate3d(calc(-50% + ${geom.x}px), calc(-50% + ${geom.y}px), ${geom.z}px) scale(${geom.scale}) rotateY(${geom.rotateY}deg)`,
        opacity: geom.opacity,
        zIndex: geom.zIndex,
        transition: reducedMotion
          ? 'none'
          : 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1), opacity 580ms cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className={`absolute top-1/2 left-1/2 w-[220px] sm:w-[260px] lg:w-[290px] aspect-[3/4] rounded-xl overflow-hidden select-none will-change-transform ${
        isCenter
          ? 'cursor-default ring-1 ring-white/30 shadow-[0_40px_90px_-20px_rgba(229,9,20,0.45)]'
          : isExiting
            ? 'pointer-events-none'
            : 'cursor-pointer ring-1 ring-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] hover:ring-scard-red/50'
      }`}
    >
      {/* Poster Artwork or Theatrical Fallback */}
      {hasImage ? (
        <img
          src={movie.imagem!}
          alt={`Capa de ${movie.titulo}`}
          referrerPolicy="no-referrer"
          loading="eager"
          draggable={false}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${palette.gradient} flex flex-col justify-between p-5`}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 25%, ${palette.glow}, transparent 70%)`
            }}
          />
          <div className="relative z-10 flex items-center justify-between text-[11px] text-scard-ash border-b border-white/[0.08] pb-2.5">
            <span className="display text-sm text-scard-bone">SCARD PLAY</span>
            <span>{movie.ano}</span>
          </div>

          <div className="relative z-10 my-auto text-center space-y-2.5 px-1">
            <div className={`w-7 h-[2px] mx-auto ${palette.lineColor}`} />
            <p className={`text-xs font-medium ${palette.accentText}`}>
              {movie.generos && movie.generos.length > 0 ? movie.generos.join(', ') : 'Catálogo 2026'}
            </p>
            <h4 className="display text-3xl sm:text-4xl text-white line-clamp-4 text-balance">
              {movie.titulo}
            </h4>
          </div>

          <div className="relative z-10 h-10" />
        </div>
      )}

      {/* Year Tag on Image Posters */}
      {hasImage && (
        <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white tabular">
          {movie.ano}
        </div>
      )}

      {/* Contrast Scrim */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isCenter
            ? 'bg-gradient-to-t from-black via-black/45 to-transparent opacity-95'
            : 'bg-gradient-to-t from-black/90 via-black/25 to-black/15 opacity-80'
        }`}
      />

      {/* Bottom Metadata & Action */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 flex flex-col justify-end">
        {movie.generos && movie.generos.length > 0 && (
          <p className="text-xs font-medium text-scard-red mb-1 truncate">{movie.generos.join(', ')}</p>
        )}

        <h3
          className={`display text-white text-balance ${
            isCenter ? 'text-3xl sm:text-[2.1rem] line-clamp-2' : 'text-xl line-clamp-2 text-scard-bone/90'
          }`}
        >
          {movie.titulo}
        </h3>

        {isCenter && (
          <div className="mt-3 space-y-2.5">
            {movie.sinopse && movie.sinopse.trim().length > 0 && (
              <p className="text-xs text-scard-bone/80 leading-relaxed line-clamp-2">
                {movie.sinopse}
              </p>
            )}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-flex items-center justify-center gap-2 bg-scard-red hover:bg-scard-redDark text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              <MessageCircle size={15} />
              <span>Perguntar se tem</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export const CatalogCarousel: React.FC = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [onlyWithCovers, setOnlyWithCovers] = useState<boolean>(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Viewport & reduced motion checks
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mq.removeEventListener('change', handler);
    };
  }, []);

  // Touch & Mouse Drag Swipe tracking
  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef<number | null>(null);
  const isMouseDragging = useRef<boolean>(false);

  // Fetch static JSON once per page load
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        let response = await fetch('/catalogo-2026.json');
        if (!response.ok) {
          response = await fetch('/assets/aistudio/catalogo-2026_d59c4fae.json');
        }
        if (!response.ok) {
          throw new Error('Falha ao carregar o catálogo estático.');
        }
        const data: MovieItem[] = await response.json();
        // Prioritize titles that already have real cover artwork first in the Passage tunnel
        const sorted = [...data].sort((a, b) => {
          const aHas = a.imagem ? 1 : 0;
          const bHas = b.imagem ? 1 : 0;
          return bHas - aHas;
        });
        if (isMounted) {
          setMovies(sorted);
          setCurrentIndex(0);
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

  // Filtered list
  const filteredMovies = useMemo(() => {
    if (!movies.length) return [];
    return movies.filter((movie) => {
      const matchCover = !onlyWithCovers || Boolean(movie.imagem);
      const matchGenre =
        selectedGenre === 'todos' ||
        (movie.generos &&
          movie.generos.some((g) => g.toLowerCase() === selectedGenre.toLowerCase()));
      const matchSearch =
        !searchQuery.trim() ||
        movie.titulo.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchCover && matchGenre && matchSearch;
    });
  }, [movies, onlyWithCovers, selectedGenre, searchQuery]);

  const coversCount = useMemo(() => movies.filter((m) => Boolean(m.imagem)).length, [movies]);

  // Distinct genres
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => {
      (m.generos || []).forEach((g) => set.add(g));
    });
    return Array.from(set).sort();
  }, [movies]);

  useEffect(() => {
    if (filteredMovies.length === 0) return;
    if (currentIndex >= filteredMovies.length) {
      setCurrentIndex(0);
    }
  }, [filteredMovies.length, currentIndex]);

  const nextSlide = useCallback(() => {
    if (filteredMovies.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredMovies.length);
  }, [filteredMovies.length]);

  const prevSlide = useCallback(() => {
    if (filteredMovies.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length);
  }, [filteredMovies.length]);

  const goToIndex = useCallback(
    (targetIdx: number) => {
      if (filteredMovies.length === 0) return;
      const normalized = ((targetIdx % filteredMovies.length) + filteredMovies.length) % filteredMovies.length;
      setCurrentIndex(normalized);
    },
    [filteredMovies.length]
  );

  // 5-second Autoplay (resets whenever currentIndex changes)
  useEffect(() => {
    if (!isPlaying || isInteracting || showSearchModal || reducedMotion || filteredMovies.length <= 1) {
      return;
    }
    const timer = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, isInteracting, showSearchModal, reducedMotion, filteredMovies.length, nextSlide]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    pointerStartX.current = e.targetTouches[0].clientX;
    pointerCurrentX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    pointerCurrentX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (pointerStartX.current !== null && pointerCurrentX.current !== null) {
      const diff = pointerStartX.current - pointerCurrentX.current;
      if (diff > 40) {
        nextSlide();
      } else if (diff < -40) {
        prevSlide();
      }
    }
    pointerStartX.current = null;
    pointerCurrentX.current = null;
    setIsInteracting(false);
  };

  // Mouse Drag Swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDragging.current = true;
    pointerStartX.current = e.clientX;
    pointerCurrentX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDragging.current) return;
    pointerCurrentX.current = e.clientX;
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDragging.current) return;
    isMouseDragging.current = false;
    if (pointerStartX.current !== null && pointerCurrentX.current !== null) {
      const diff = pointerStartX.current - pointerCurrentX.current;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    pointerStartX.current = null;
    pointerCurrentX.current = null;
  };

  // Passage Tunnel visible depth window: [-1, 0, 1, 2, 3, 4, 5, 6]
  const visibleSlides = useMemo(() => {
    const len = filteredMovies.length;
    if (len === 0) return [];
    if (len === 1) return [{ movie: filteredMovies[0], offset: 0, index: 0 }];

    const maxAhead = Math.min(6, len - 1);
    const offsets: number[] = [];
    if (len > 7) offsets.push(-1);
    for (let o = 0; o <= maxAhead; o++) {
      offsets.push(o);
    }

    return offsets.map((offset) => {
      const idx = ((currentIndex + offset) % len + len) % len;
      return { movie: filteredMovies[idx], offset, index: idx };
    });
  }, [filteredMovies, currentIndex]);

  const currentMovie = filteredMovies[currentIndex] || null;

  const totalDashes = Math.min(DASH_COUNT, Math.max(1, filteredMovies.length));
  const activeDash =
    filteredMovies.length <= DASH_COUNT
      ? currentIndex
      : Math.floor((currentIndex / filteredMovies.length) * totalDashes);

  if (loading) {
    return (
      <div className="pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[460px] sm:h-[520px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-scard-ash">
              <Film size={32} className="text-scard-red animate-pulse" />
              <span className="text-sm">
                Carregando os lançamentos…
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentMovie) {
    return null;
  }

  return (
    <div
      id="catalogo"
      role="region"
      aria-label="Catálogo 2026 SCARD PLAY"
      className="relative pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pt-8 border-t border-white/[0.08] mb-2">
          <div>
            <h2 className="display text-4xl sm:text-5xl text-white">
              Lançamentos 2026{' '}
              <span className="text-scard-red tabular ml-1">{filteredMovies.length}</span>
            </h2>
            <p className="mt-2 text-sm text-scard-ash">
              Arraste ou use as setas para ver os títulos que já estão na grade.
            </p>
          </div>

          {/* Controls: Covers filter + Genre filter + Search + Play/Pause */}
          <div className="flex flex-wrap items-center gap-2">
            {coversCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setOnlyWithCovers(!onlyWithCovers);
                  setCurrentIndex(0);
                }}
                aria-pressed={onlyWithCovers}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors min-h-[40px] ${
                  onlyWithCovers
                    ? 'bg-scard-red text-white border-scard-red'
                    : 'bg-black text-scard-bone border-scard-line hover:border-white/30'
                }`}
              >
                Só com capa ({coversCount})
              </button>
            )}

            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-black border border-scard-line text-scard-bone text-sm font-medium rounded-full px-4 py-2 focus:border-scard-red min-h-[40px]"
              aria-label="Filtrar catálogo por gênero"
            >
              <option value="todos">Todos os gêneros ({movies.length})</option>
              {availableGenres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className="inline-flex items-center gap-2 bg-black hover:bg-white/[0.05] border border-scard-line hover:border-white/30 text-scard-bone text-sm font-medium px-4 py-2 rounded-full transition-colors min-h-[40px]"
            >
              <Search size={15} className="text-scard-red" />
              <span>Buscar título</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-white/[0.05] border border-scard-line text-scard-bone hover:text-white transition-colors"
              title={isPlaying ? "Pausar alternância automática" : "Retomar alternância automática"}
              aria-label={isPlaying ? "Pausar carrossel" : "Reproduzir carrossel"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5 fill-current" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3D Passage Gallery Tunnel Stage */}
      <div
        className="relative w-full h-[380px] sm:h-[440px] lg:h-[490px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
        style={{
          perspective: isMobile ? '900px' : '1250px',
          perspectiveOrigin: '50% 48%'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {/* Subtle Tunnel Depth Floor & Horizon Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(229, 9, 20, 0.14) 0%, rgba(20, 8, 8, 0.35) 38%, rgba(0, 0, 0, 0) 72%)'
          }}
        />
        {/* Corridor Perspective Guide Lines */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-[36vw] rotate-[18deg]" />
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent translate-x-[36vw] -rotate-[18deg]" />
        </div>

        {/* Edge Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-black to-transparent z-50" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-black to-transparent z-50" />

        {/* 3D Tunnel Cards Container */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {visibleSlides.map(({ movie, offset, index }) => {
            const whatsappLink = `https://wa.me/${WHATSAPP_PHONE}?text=Ol%C3%A1%2C%20vi%20o%20filme%20%22${encodeURIComponent(
              movie.titulo
            )}%22%20no%20cat%C3%A1logo%202026%20do%20site%20e%20gostaria%20de%20saber%20a%20disponibilidade!`;

            return (
              <PassagePosterCard
                key={`${movie.titulo}-${index}`}
                movie={movie}
                offset={offset}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
                onSelect={() => goToIndex(index)}
                whatsappLink={whatsappLink}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Passage Controls: <  — — — — — — — —  > */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prevSlide}
            disabled={filteredMovies.length <= 1}
            className="w-11 h-11 rounded-full flex items-center justify-center text-scard-bone border border-scard-line hover:border-scard-red hover:bg-scard-red disabled:opacity-30 transition-colors"
            aria-label="Filme anterior"
            title="Voltar no túnel"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Horizontal Dash Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Posição no catálogo">
            {Array.from({ length: totalDashes }).map((_, dashIdx) => {
              const isActive = dashIdx === activeDash;
              const jumpIndex =
                filteredMovies.length <= DASH_COUNT
                  ? dashIdx
                  : Math.floor((dashIdx / totalDashes) * filteredMovies.length);

              return (
                <button
                  key={dashIdx}
                  type="button"
                  onClick={() => goToIndex(jumpIndex)}
                  aria-label={`Ir para seção ${dashIdx + 1}`}
                  aria-selected={isActive}
                  className="py-2 px-0.5 group focus:outline-none"
                >
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 sm:w-10 bg-scard-red'
                        : 'w-4 sm:w-5 bg-white/20 group-hover:bg-white/45'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            disabled={filteredMovies.length <= 1}
            className="w-11 h-11 rounded-full flex items-center justify-center text-scard-bone border border-scard-line hover:border-scard-red hover:bg-scard-red disabled:opacity-30 transition-colors"
            aria-label="Próximo filme"
            title="Avançar no túnel"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Discreet numeric position & title */}
        <p className="flex items-center gap-3 text-sm text-scard-ash tabular" aria-live="polite">
          <span>
            <strong className="text-white font-semibold">{currentIndex + 1}</strong> de {filteredMovies.length}
          </span>
          <span className="w-4 h-px bg-scard-line" aria-hidden="true" />
          <span className="text-scard-bone truncate max-w-[200px] sm:max-w-xs">
            {currentMovie.titulo}
          </span>
        </p>
      </div>

      {/* Quick Search Modal across all 328 titles */}
      {showSearchModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar título no catálogo"
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-4"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="bg-scard-coal border border-scard-line rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-scard-line flex items-center gap-3">
              <Search size={18} className="text-scard-red shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Nome do filme, ex.: Homem-Aranha, Toy Story"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                aria-label="Nome do filme"
                className="bg-transparent border-none text-white text-base w-full focus-visible:outline-none placeholder-scard-ash/60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-sm text-scard-ash hover:text-white px-2 py-1"
                >
                  Limpar
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="p-1.5 text-scard-ash hover:text-white rounded-full hover:bg-white/[0.06]"
                aria-label="Fechar busca"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-3 space-y-0.5">
              <div className="text-xs text-scard-ash px-2.5 py-1.5">
                {filteredMovies.length} {filteredMovies.length === 1 ? 'título encontrado' : 'títulos encontrados'}
              </div>
              {filteredMovies.length === 0 ? (
                <div className="py-10 px-6 text-center text-sm text-scard-ash">
                  Nenhum título com “{searchQuery}”. Tente outro nome ou pergunte no WhatsApp se já está disponível.
                </div>
              ) : (
                filteredMovies.slice(0, 60).map((m, i) => (
                  <button
                    key={`${m.titulo}-${i}`}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(i);
                      setShowSearchModal(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-[15px] font-semibold text-white group-hover:text-scard-red transition-colors">
                        {m.titulo}
                      </div>
                      <div className="text-xs text-scard-ash mt-0.5">
                        {m.ano}{m.generos && m.generos.length > 0 ? `, ${m.generos.join(', ')}` : ''}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-scard-ash group-hover:text-white transition-colors" />
                  </button>
                ))
              )}
              {filteredMovies.length > 60 && (
                <p className="text-center text-xs text-scard-ash py-2">
                  Mostrando os 60 primeiros. Digite mais do nome para encontrar o seu.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogCarousel;
