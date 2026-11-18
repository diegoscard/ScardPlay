#!/usr/bin/env node
/**
 * Atualiza o catálogo "Lançamentos 2026" do site a partir da sua lista M3U.
 *
 * Uso (na pasta do projeto, com Node 18 ou mais novo):
 *
 *   node scripts/atualizar-catalogo.mjs "LINK_DA_LISTA_M3U"
 *
 * O que ele faz:
 *   1. Baixa a lista M3U (pode ser grande, ele lê aos poucos).
 *   2. Separa só os FILMES dos grupos de lançamento do ano escolhido (padrão: 2026).
 *   3. Baixa a capa de cada filme (tvg-logo) para public/filmes/.
 *   4. Grava public/catalogo-2026.json, que é o arquivo que o carrossel do site lê.
 *
 * Opções:
 *   --listar-grupos        Só mostra os grupos da lista e quantos itens cada um tem (não altera nada).
 *   --grupo "texto"        Parte do nome do grupo a procurar. Padrão: "lançamento" (com ou sem ç).
 *   --ano 2026             Ano dos lançamentos. Padrão: 2026.
 *   --qualquer-ano         Pega o grupo inteiro mesmo que o ano não apareça no nome do grupo/filme.
 *   --incluir-series       Inclui séries além de filmes.
 *   --sem-baixar-capas     Usa o link da capa direto (não recomendado: links http quebram no site https).
 *   --limpar               Apaga de public/filmes/ as capas antigas que não estão mais no catálogo.
 *
 * IMPORTANTE: o link da lista tem seu usuário e senha. Não coloque esse link dentro do código
 * do site nem em arquivos que vão para o GitHub — passe só pela linha de comando, como acima.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const COVERS_DIR = path.join(PUBLIC_DIR, 'filmes');
const CATALOG_FILE = path.join(PUBLIC_DIR, 'catalogo-2026.json');
const USER_AGENT = 'VLC/3.0.20 LibVLC/3.0.20';

/* ---------------- argumentos ---------------- */

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const OPTION_NAMES = new Set(['--grupo', '--ano']);
const url = process.env.M3U_URL || args.find((a, i) => !a.startsWith('--') && !OPTION_NAMES.has(args[i - 1]));

if (!url) {
  console.error('\nFaltou o link da lista.\n\n  node scripts/atualizar-catalogo.mjs "http://.../get.php?username=...&password=...&type=m3u_plus&output=hls"\n');
  process.exit(1);
}

const YEAR = String(option('--ano', '2026'));
const GROUP_TEXT = option('--grupo', 'lançamento');
const ANY_YEAR = flag('--qualquer-ano');
const WITH_SERIES = flag('--incluir-series');
const DOWNLOAD = !flag('--sem-baixar-capas');
const CLEAN = flag('--limpar');
const LIST_GROUPS = flag('--listar-grupos');

/* ---------------- utilidades ---------------- */

const stripAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const norm = (s) => stripAccents(String(s || '')).toLowerCase();
const slugify = (s) =>
  norm(s).replace(/&/g, ' e ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'filme';

const groupMatches = (group) => norm(group).includes(norm(GROUP_TEXT));

// Remove marcações comuns de painel: (2026), [4K], 4K, [L], LEG, DUB, | HD etc.
const cleanTitle = (raw) => {
  let t = String(raw || '')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\((19|20)\d{2}\)/g, ' ')
    .replace(/\b(4k|uhd|fhd|hd|sd|h265|hevc|leg(endado)?|dub(lado)?|dual|cam|ts|hdcam|hdts)\b/gi, ' ')
    .replace(/\s[-|–]\s*(19|20)\d{2}\s*$/g, ' ')
    .replace(/\s*[|–-]\s*$/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return t.replace(/^[-|–\s]+|[-|–\s]+$/g, '');
};

const yearOf = (...texts) => {
  for (const t of texts) {
    const m = String(t || '').match(/\b(19[5-9]\d|20[0-4]\d)\b/);
    if (m) return Number(m[1]);
  }
  return null;
};

const parseExtinf = (line) => {
  const attrs = {};
  for (const m of line.matchAll(/([\w-]+)="([^"]*)"/g)) attrs[m[1].toLowerCase()] = m[2];
  const lastQuote = line.lastIndexOf('",');
  const name = lastQuote >= 0 ? line.slice(lastQuote + 2) : line.slice(line.indexOf(',') + 1);
  return { name: name.trim(), tvgName: attrs['tvg-name'] || '', logo: attrs['tvg-logo'] || '', group: attrs['group-title'] || '' };
};

const kindOf = (streamUrl) => {
  if (/\/movie\//i.test(streamUrl)) return 'filme';
  if (/\/series\//i.test(streamUrl)) return 'serie';
  if (/\.(mp4|mkv|avi)(\?|$)/i.test(streamUrl)) return 'filme';
  return 'canal';
};

/* ---------------- leitura da lista ---------------- */

async function* readLines(source) {
  if (/^https?:\/\//i.test(source)) {
    const res = await fetch(source, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) throw new Error(`O servidor da lista respondeu ${res.status} ${res.statusText}. Confira se o link, usuário e senha estão certos.`);
    yield* readline.createInterface({ input: Readable.fromWeb(res.body), crlfDelay: Infinity });
  } else {
    yield* readline.createInterface({ input: fs.createReadStream(source), crlfDelay: Infinity });
  }
}

async function readPlaylist(source) {
  const items = [];
  let pending = null;
  let lines = 0;
  for await (const raw of readLines(source)) {
    lines++;
    if (lines % 200000 === 0) process.stdout.write(`  ${lines.toLocaleString('pt-BR')} linhas lidas...\r`);
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('#EXTINF')) {
      pending = parseExtinf(line);
    } else if (!line.startsWith('#') && pending) {
      items.push({ ...pending, kind: kindOf(line) });
      pending = null;
    }
  }
  if (lines === 0) throw new Error('A lista veio vazia.');
  return items;
}

/* ---------------- capas ---------------- */

const EXT_BY_TYPE = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };

async function downloadCover(logoUrl, slug) {
  // Sempre baixa a capa da lista; a capa antiga só é usada se o download falhar
  const existing = fs.readdirSync(COVERS_DIR).find((f) => f.replace(/\.[^.]+$/, '') === slug);
  const keepOld = () => (existing ? `/filmes/${existing}` : null);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(logoUrl, { headers: { 'User-Agent': USER_AGENT }, signal: ctrl.signal, redirect: 'follow' });
    if (!res.ok) return keepOld();
    const type = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    const ext = EXT_BY_TYPE[type] || (logoUrl.match(/\.(jpe?g|png|webp)(\?|$)/i)?.[1]?.toLowerCase().replace('jpeg', 'jpg'));
    if (!ext) return keepOld();
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) return keepOld(); // imagem vazia ou "sem capa" do painel
    const file = `${slug}.${ext}`;
    if (existing && existing !== file) fs.unlinkSync(path.join(COVERS_DIR, existing));
    fs.writeFileSync(path.join(COVERS_DIR, file), buf);
    return `/filmes/${file}`;
  } catch {
    return keepOld();
  } finally {
    clearTimeout(timer);
  }
}

async function mapLimit(list, limit, fn) {
  const out = new Array(list.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, list.length) }, async () => {
    while (i < list.length) {
      const idx = i++;
      out[idx] = await fn(list[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

/* ---------------- principal ---------------- */

async function main() {
  console.log('\nLendo a lista M3U...');
  const items = await readPlaylist(url);
  console.log(`  ${items.length.toLocaleString('pt-BR')} itens na lista.               `);

  if (LIST_GROUPS) {
    const counts = new Map();
    for (const it of items) {
      const key = `${it.group || '(sem grupo)'}  [${it.kind}]`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    console.log('\nGrupos encontrados:\n');
    [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR')).forEach(([g, n]) => console.log(`  ${String(n).padStart(6)}  ${g}`));
    console.log('\nUse --grupo "parte do nome" para escolher o grupo dos lançamentos.\n');
    return;
  }

  const groupHits = items.filter((it) => groupMatches(it.group) && (it.kind === 'filme' || (WITH_SERIES && it.kind === 'serie')));
  if (groupHits.length === 0) {
    console.error(`\nNenhum filme em grupos com "${GROUP_TEXT}". Rode com --listar-grupos para ver os nomes dos grupos e use --grupo "nome".\n`);
    process.exit(2);
  }

  const picked = groupHits.filter((it) => {
    if (ANY_YEAR) return true;
    return it.group.includes(YEAR) || it.name.includes(YEAR) || it.tvgName.includes(YEAR);
  });

  const groupsUsed = [...new Set(groupHits.map((it) => it.group))];
  console.log(`\nGrupos de lançamento encontrados: ${groupsUsed.join(' / ')}`);
  console.log(`  ${groupHits.length} filmes nesses grupos, ${picked.length} de ${YEAR}.`);
  if (picked.length === 0) {
    console.error(`\nNenhum item com "${YEAR}" no nome. Se o grupo inteiro já é só de ${YEAR}, rode de novo com --qualquer-ano.\n`);
    process.exit(2);
  }

  // Gêneros e sinopses que já existiam no catálogo antigo continuam aproveitados
  const previous = new Map();
  try {
    for (const m of JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'))) previous.set(slugify(m.titulo), m);
  } catch { /* catálogo antigo não existe ou é inválido */ }

  // Junta versões repetidas (4K, legendado, dublado...) num título só
  const byTitle = new Map();
  for (const it of picked) {
    const titulo = cleanTitle(it.tvgName || it.name) || cleanTitle(it.name);
    if (!titulo) continue;
    const slug = slugify(titulo);
    const current = byTitle.get(slug);
    if (!current || (!current.logo && it.logo)) {
      byTitle.set(slug, { slug, titulo, logo: it.logo, ano: yearOf(it.name, it.tvgName, it.group) || Number(YEAR) });
    }
  }
  const unique = [...byTitle.values()];
  console.log(`  ${unique.length} títulos depois de juntar versões repetidas (4K, dublado, legendado).`);

  fs.mkdirSync(COVERS_DIR, { recursive: true });
  let done = 0;
  const withCovers = await mapLimit(unique, 6, async (m) => {
    let imagem = null;
    if (m.logo) imagem = DOWNLOAD ? await downloadCover(m.logo, m.slug) : m.logo;
    done++;
    process.stdout.write(`  Capas: ${done}/${unique.length}\r`);
    return { ...m, imagem };
  });
  console.log('');

  const catalog = withCovers
    .filter((m) => m.imagem)
    .map((m) => {
      const old = previous.get(m.slug);
      return {
        titulo: m.titulo,
        ano: m.ano,
        generos: old?.generos?.length ? old.generos : [],
        sinopse: old?.sinopse || '',
        imagem: m.imagem,
      };
    })
    .sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

  const semCapa = withCovers.filter((m) => !m.imagem).map((m) => m.titulo);
  if (catalog.length === 0) {
    console.error('\nNenhuma capa pôde ser baixada, então o catálogo não foi alterado.\n');
    process.exit(3);
  }

  fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2) + '\n');

  if (CLEAN && DOWNLOAD) {
    const keep = new Set(catalog.map((m) => path.basename(m.imagem)));
    let removed = 0;
    for (const f of fs.readdirSync(COVERS_DIR)) {
      if (!keep.has(f)) { fs.unlinkSync(path.join(COVERS_DIR, f)); removed++; }
    }
    console.log(`  ${removed} capas antigas removidas de public/filmes/.`);
  }

  console.log(`\nPronto: ${catalog.length} lançamentos de ${YEAR} gravados em public/catalogo-2026.json.`);
  if (semCapa.length) console.log(`Ficaram de fora por não ter capa (${semCapa.length}): ${semCapa.slice(0, 15).join(', ')}${semCapa.length > 15 ? '...' : ''}`);
  console.log('Agora é só enviar para o GitHub (commit + push) que a Vercel publica.\n');
}

main().catch((err) => {
  console.error(`\nErro: ${err.message}\n`);
  process.exit(1);
});
