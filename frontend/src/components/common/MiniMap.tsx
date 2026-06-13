import type { Artwork, GalleryRoom } from '../../types';

export function MiniMap({ room, artworks }: { room: GalleryRoom; artworks: Artwork[] }) {
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{room.name}</p>
        <span className="text-xs text-[var(--color-muted)]">
          {room.size.width}m x {room.size.depth}m
        </span>
      </div>
      <div className="relative mt-3 aspect-[4/3] border border-[var(--color-line)] bg-[var(--color-bg)]">
        {artworks.map((artwork) => (
          <span
            key={artwork.id}
            title={artwork.title}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-vermilion"
            style={{
              left: `${((artwork.mountPosition.x + room.size.width / 2) / room.size.width) * 100}%`,
              top: `${((artwork.mountPosition.z + room.size.depth / 2) / room.size.depth) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
