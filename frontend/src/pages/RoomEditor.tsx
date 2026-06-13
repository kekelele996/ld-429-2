import { PropertyPanel } from '../components/common/PropertyPanel';
import { GalleryScene } from '../components/scene/GalleryScene';
import { useArtworkStore } from '../stores/artworkStore';
import { useRoomStore } from '../stores/roomStore';

export function RoomEditor() {
  const artworks = useArtworkStore((state) => state.artworks);
  const moveArtwork = useArtworkStore((state) => state.moveArtwork);
  const rooms = useRoomStore((state) => state.rooms);
  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr_280px]">
      <PropertyPanel />
      <section className="min-h-[70vh] overflow-hidden border border-[var(--color-line)] bg-black">
        <GalleryScene />
      </section>
      <aside className="panel p-5">
        <h2 className="text-2xl font-semibold">作品放置</h2>
        <div className="mt-4 space-y-3">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="border border-[var(--color-line)] p-3">
              <p className="font-semibold">{artwork.title}</p>
              <select
                className="mt-2 w-full border border-[var(--color-line)] bg-[var(--color-panel)] p-2 text-sm"
                value={artwork.roomId}
                onChange={(event) => moveArtwork(artwork.id, event.target.value)}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
