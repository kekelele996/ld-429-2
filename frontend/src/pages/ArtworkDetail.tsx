import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtworkInfoCard } from '../components/common/ArtworkInfoCard';
import { GuideTooltip } from '../components/common/GuideTooltip';
import { EmptyState } from '../components/common/EmptyState';
import { useArtworkStore } from '../stores/artworkStore';
import { useGuideStore } from '../stores/guideStore';
import { useVisitorTracking } from '../hooks/useVisitorTracking';

export function ArtworkDetail() {
  const { id } = useParams();
  const [scale, setScale] = useState(1);
  const artworks = useArtworkStore((state) => state.artworks);
  const annotations = useGuideStore((state) => state.annotations);
  const artwork = useMemo(() => artworks.find((item) => item.id === id), [artworks, id]);
  useVisitorTracking(artwork?.id);

  if (!artwork) {
    return <EmptyState title="未找到作品" description="当前作品可能已经移出展览，返回展览列表继续浏览。" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="panel overflow-hidden p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-semibold">{artwork.title}</h1>
          <label className="text-sm text-[var(--color-muted)]">
            缩放
            <input className="ml-3 align-middle" type="range" min="0.8" max="1.8" step="0.1" value={scale} onChange={(event) => setScale(Number(event.target.value))} />
          </label>
        </div>
        <div className="grid min-h-[58vh] place-items-center overflow-auto bg-[#211f1a] p-8">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[70vh] max-w-full border-[10px] border-[#f4efe6] object-contain shadow-2xl transition-transform"
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      </section>
      <aside className="space-y-4">
        <ArtworkInfoCard artwork={artwork} />
        {annotations
          .filter((annotation) => annotation.artworkId === artwork.id)
          .map((annotation) => (
            <GuideTooltip key={annotation.id} annotation={annotation} />
          ))}
      </aside>
    </div>
  );
}
