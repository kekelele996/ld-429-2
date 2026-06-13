import type { Artwork } from '../../types';
import { FRAME_STYLE_LABELS } from '../../constants/frameStyles';

export function ArtworkInfoCard({ artwork, compact = false }: { artwork: Artwork; compact?: boolean }) {
  return (
    <article className="panel p-5">
      <div className="overflow-hidden border border-[var(--color-line)] bg-black/5">
        <img src={artwork.thumbnailUrl} alt={artwork.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">{artwork.artistName}</p>
        <h3 className="mt-1 text-2xl font-semibold">{artwork.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {artwork.year} · {artwork.medium} · {FRAME_STYLE_LABELS[artwork.frameStyle]}
        </p>
        {!compact && <p className="mt-4 text-sm leading-6">{artwork.description}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {artwork.tags.map((tag) => (
            <span key={tag} className="border border-[var(--color-line)] px-2 py-1 text-xs text-[var(--color-muted)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
