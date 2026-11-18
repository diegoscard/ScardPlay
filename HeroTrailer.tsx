import React, { useEffect, useState } from 'react';
import { HERO_TRAILER } from './constants';

/**
 * Trailer de fundo do topo: toca sozinho, sem som, em loop e sem controles.
 *
 * Ordem de tentativa:
 *  1. Arquivo MP4 em /public (HERO_TRAILER.mp4) — fica 100% limpo, sem logo nem barra.
 *  2. Vídeo do YouTube (HERO_TRAILER.youtube) — usado se o MP4 não existir.
 *  3. Só a imagem (HERO_TRAILER.poster) — se nenhum dos dois estiver configurado
 *     ou se a pessoa pediu "reduzir movimento" no aparelho.
 *
 * Os navegadores só deixam vídeo tocar sozinho se estiver sem som, por isso ele é mudo.
 */
type Mode = 'mp4' | 'youtube' | 'poster';

// Aceita link completo (watch?v=, youtu.be/, /embed/, /shorts/) ou só o código de 11 caracteres
const youtubeIdFrom = (value: string): string => {
  const v = (value || '').trim();
  if (/^[\w-]{11}$/.test(v)) return v;
  const m = v.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : '';
};
const YT_ID = youtubeIdFrom(HERO_TRAILER.youtube);

export const HeroTrailer: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mode, setMode] = useState<Mode>(
    HERO_TRAILER.mp4 ? 'mp4' : YT_ID ? 'youtube' : 'poster'
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const fallbackFromMp4 = () => {
    setVisible(false);
    setMode(YT_ID ? 'youtube' : 'poster');
  };

  const showVideo = !reducedMotion && mode !== 'poster';
  const id = YT_ID;
  const ytSrc =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&fs=0` +
    `&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&showinfo=0` +
    (HERO_TRAILER.startAt ? `&start=${HERO_TRAILER.startAt}` : '');

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      {/* Imagem de fundo: aparece enquanto o vídeo carrega e fica como reserva */}
      {HERO_TRAILER.poster && (
        <img
          src={HERO_TRAILER.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[50%_20%] scale-105 blur-[2px] opacity-60"
        />
      )}

      {showVideo && mode === 'mp4' && (
        <video
          key="mp4"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
          src={HERO_TRAILER.mp4}
          poster={HERO_TRAILER.poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          onCanPlay={() => setVisible(true)}
          onError={fallbackFromMp4}
        />
      )}

      {showVideo && mode === 'youtube' && (
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Iframe maior que a área e centralizado: preenche como "cover" e corta as bordas onde o YouTube mostra título/logo */}
          <iframe
            src={ytSrc}
            title="Trailer"
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => window.setTimeout(() => setVisible(true), 1800)}
            className="absolute top-1/2 left-1/2 border-0"
            style={{
              width: 'max(100%, calc(100svh * 16 / 9 + 10%))',
              height: 'max(100%, calc(100vw * 9 / 16 + 10%))',
              transform: 'translate(-50%, -50%) scale(1.22)',
            }}
          />
        </div>
      )}

      {/* Escurecimento para o texto continuar legível sobre o vídeo */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </div>
  );
};

export default HeroTrailer;
