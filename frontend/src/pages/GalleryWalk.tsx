import { Link } from 'react-router-dom';
import { ArtworkInfoCard } from '../components/common/ArtworkInfoCard';
import { GuideTooltip } from '../components/common/GuideTooltip';
import { MiniMap } from '../components/common/MiniMap';
import { GalleryScene } from '../components/scene/GalleryScene';
import { useFirstPersonController } from '../hooks/useFirstPersonController';
import { useGalleryScene } from '../hooks/useGalleryScene';
import { useVisitorTracking } from '../hooks/useVisitorTracking';
import { useArtworkStore } from '../stores/artworkStore';
import { useGuideStore } from '../stores/guideStore';

export function GalleryWalk() {
  const { room, artworks } = useGalleryScene();
  const activeArtworkId = useArtworkStore((state) => state.activeArtworkId);
  const activeArtwork = useArtworkStore((state) => state.artworks.find((artwork) => artwork.id === activeArtworkId));
  const annotation = useGuideStore((state) => state.annotations.find((item) => item.artworkId === activeArtworkId));
  const { hintVisible, velocity } = useFirstPersonController();
  useVisitorTracking(activeArtworkId);

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <section className="relative min-h-[70vh] overflow-hidden border border-[var(--color-line)] bg-black">
        <GalleryScene />
        <div className="pointer-events-none absolute left-4 top-4 border border-white/30 bg-black/50 px-3 py-2 text-sm text-white">
          {hintVisible ? 'WASD / 方向键记录漫游意图，鼠标拖动画面观察展厅' : `移动向量 ${velocity.x}, ${velocity.z}`}
        </div>
      </section>
      <aside className="space-y-4">
        {room && <MiniMap room={room} artworks={artworks} />}
        {activeArtwork ? <ArtworkInfoCard artwork={activeArtwork} /> : null}
        {annotation ? <GuideTooltip annotation={annotation} /> : null}
        <Link className="block border border-[var(--color-line)] p-4 text-center text-sm uppercase tracking-[0.2em] hover:bg-[var(--color-panel)]" to="/editor">
          Open room editor
        </Link>
      </aside>
    </div>
  );
}
