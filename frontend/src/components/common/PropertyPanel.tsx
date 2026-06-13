import { useRoomStore } from '../../stores/roomStore';

export function PropertyPanel() {
  const rooms = useRoomStore((state) => state.rooms);
  const selectedRoomId = useRoomStore((state) => state.selectedRoomId);
  const selectRoom = useRoomStore((state) => state.selectRoom);
  const updateWallColor = useRoomStore((state) => state.updateWallColor);
  const room = rooms.find((item) => item.id === selectedRoomId) ?? rooms[0];

  return (
    <aside className="panel p-5">
      <h2 className="text-2xl font-semibold">展厅属性</h2>
      <label className="mt-5 block text-sm text-[var(--color-muted)]">
        当前展厅
        <select
          className="mt-2 w-full border border-[var(--color-line)] bg-[var(--color-panel)] p-3 text-[var(--color-ink)]"
          value={selectedRoomId}
          onChange={(event) => selectRoom(event.target.value)}
        >
          {rooms.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-5 block text-sm text-[var(--color-muted)]">
        墙面颜色
        <input
          className="mt-2 h-12 w-full border border-[var(--color-line)] bg-transparent"
          type="color"
          value={room.wallColor}
          onChange={(event) => updateWallColor(room.id, event.target.value)}
        />
      </label>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="border border-[var(--color-line)] p-3">
          <p className="text-[var(--color-muted)]">亮度</p>
          <p className="text-xl">{room.lighting.brightness.toFixed(2)}</p>
        </div>
        <div className="border border-[var(--color-line)] p-3">
          <p className="text-[var(--color-muted)]">色温</p>
          <p className="text-xl">{room.lighting.colorTemperature}K</p>
        </div>
      </div>
    </aside>
  );
}
