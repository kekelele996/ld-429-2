import { useMemo } from 'react';
import { useArtworkStore } from '../stores/artworkStore';
import { useVisitorStore } from '../stores/visitorStore';
import { VisitorStatus } from '../types/enums';

export function Analytics() {
  const artworks = useArtworkStore((state) => state.artworks);
  const visitors = useVisitorStore((state) => state.visitors);
  const ranked = useMemo(
    () =>
      artworks
        .map((artwork) => ({
          artwork,
          views: visitors.filter((visitor) => visitor.viewedArtworkIds.includes(artwork.id)).length,
        }))
        .sort((a, b) => b.views - a.views),
    [artworks, visitors],
  );
  const activeVisitors = visitors.filter((visitor) => visitor.onlineStatus === VisitorStatus.InGallery).length;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <p className="text-sm text-[var(--color-muted)]">在线参观</p>
          <p className="mt-2 text-5xl font-semibold">{activeVisitors}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-[var(--color-muted)]">总停留分钟</p>
          <p className="mt-2 text-5xl font-semibold">{Math.round(visitors.reduce((sum, item) => sum + item.staySeconds, 0) / 60)}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-[var(--color-muted)]">覆盖作品</p>
          <p className="mt-2 text-5xl font-semibold">{new Set(visitors.flatMap((item) => item.viewedArtworkIds)).size}</p>
        </div>
      </div>
      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">最受欢迎作品</h2>
          <div className="mt-5 space-y-3">
            {ranked.map(({ artwork, views }) => (
              <div key={artwork.id} className="grid grid-cols-[1fr_auto] border-b border-[var(--color-line)] pb-3">
                <span>{artwork.title}</span>
                <span className="text-[var(--color-accent)]">{views} views</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-5">
          <h2 className="text-2xl font-semibold">路线回放</h2>
          <div className="mt-5 space-y-3">
            {visitors.map((visitor) => (
              <div key={visitor.visitorId} className="border border-[var(--color-line)] p-3 text-sm">
                <p className="font-semibold">{visitor.visitorId}</p>
                <p className="mt-1 text-[var(--color-muted)]">{visitor.viewedArtworkIds.join(' -> ') || '尚未浏览作品'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
