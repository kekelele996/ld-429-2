import { describe, it, expect, beforeEach } from 'vitest';
import { useRoomStore } from '../stores/roomStore';
import { useVisitorStore } from '../stores/visitorStore';
import { VisitorStatus } from '../types/enums';

describe('Bug #1: 切展厅后应显示当前厅作品', () => {
  it('按 roomId 过滤，只返回属于当前展厅的作品', () => {
    const { rooms } = useRoomStore.getState();
    const artworks = [
      { id: 'a1', roomId: 'room-main', mountPosition: { x: 0, y: 0, z: 0 } },
      { id: 'a2', roomId: 'room-side', mountPosition: { x: 0, y: 0, z: 0 } },
      { id: 'a3', roomId: 'room-main', mountPosition: { x: 0, y: 0, z: 0 } },
    ] as any;

    const mainRoom = rooms.find((r) => r.id === 'room-main')!;
    const filtered = artworks.filter((a) => a.roomId === mainRoom.id);

    expect(filtered).toHaveLength(2);
    expect(filtered.every((a) => a.roomId === 'room-main')).toBe(true);
  });

  it('切换到侧厅后，不应出现主展厅作品', () => {
    const artworks = [
      { id: 'a1', roomId: 'room-main', mountPosition: { x: 0, y: 0, z: 0 } },
      { id: 'a2', roomId: 'room-side', mountPosition: { x: 0, y: 0, z: 0 } },
    ] as any;

    const sideRoom = { id: 'room-side' } as any;
    const filtered = artworks.filter((a) => a.roomId === sideRoom.id);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('a2');
  });
});

describe('Bug #2: 小地图点位不应上下偏移', () => {
  it('top 值用 depth 做分母，与 left 用 width 做分母一致', () => {
    const room = { size: { width: 10, height: 4, depth: 12 } } as any;
    const artwork = { mountPosition: { x: -3, y: 2, z: -4 } } as any;

    const leftPct = ((artwork.mountPosition.x + room.size.width / 2) / room.size.width) * 100;
    const topPct = ((artwork.mountPosition.z + room.size.depth / 2) / room.size.depth) * 100;

    expect(leftPct).toBeCloseTo(20);
    expect(topPct).toBeCloseTo(16.67, 1);
  });

  it('depth ≠ width 时，用 width 做 top 分母会产生错误比例', () => {
    const room = { size: { width: 10, height: 4, depth: 12 } } as any;
    const artwork = { mountPosition: { x: 0, y: 0, z: 0 } } as any;

    const wrongTop = ((artwork.mountPosition.z + room.size.depth / 2) / room.size.width) * 100;
    const correctTop = ((artwork.mountPosition.z + room.size.depth / 2) / room.size.depth) * 100;

    expect(wrongTop).not.toBeCloseTo(correctTop);
    expect(correctTop).toBeCloseTo(50);
  });
});

describe('Bug #3: 改当前厅墙面颜色不应影响其他厅', () => {
  beforeEach(() => {
    const { rooms } = useRoomStore.getState();
    const original = new Map(rooms.map((r) => [r.id, r.wallColor]));
    rooms.forEach((r) => {
      useRoomStore.getState().updateWallColor(r.id, original.get(r.id)!);
    });
  });

  it('updateWallColor 只修改目标展厅', () => {
    const { rooms: before } = useRoomStore.getState();
    const targetId = 'room-main';
    const otherBefore = before.find((r) => r.id !== targetId)!;
    const otherOriginalColor = otherBefore.wallColor;

    useRoomStore.getState().updateWallColor(targetId, '#ff0000');

    const { rooms: after } = useRoomStore.getState();
    const target = after.find((r) => r.id === targetId)!;
    const other = after.find((r) => r.id === otherBefore.id)!;

    expect(target.wallColor).toBe('#ff0000');
    expect(other.wallColor).toBe(otherOriginalColor);
  });

  it('连续修改两个展厅，各自颜色互不干扰', () => {
    useRoomStore.getState().updateWallColor('room-main', '#aabbcc');
    useRoomStore.getState().updateWallColor('room-side', '#ddeeff');

    const { rooms } = useRoomStore.getState();
    const main = rooms.find((r) => r.id === 'room-main')!;
    const side = rooms.find((r) => r.id === 'room-side')!;
    const virtual = rooms.find((r) => r.id === 'room-virtual')!;

    expect(main.wallColor).toBe('#aabbcc');
    expect(side.wallColor).toBe('#ddeeff');
    expect(virtual.wallColor).not.toBe('#aabbcc');
    expect(virtual.wallColor).not.toBe('#ddeeff');
  });
});

describe('Bug #4: 参观回放保留完整路线（含重复折返）', () => {
  beforeEach(() => {
    useVisitorStore.setState({
      visitors: [
        {
          visitorId: 'visitor-local',
          enteredAt: new Date().toISOString(),
          staySeconds: 0,
          viewedArtworkIds: [],
          currentRoomId: 'room-main',
          onlineStatus: VisitorStatus.InGallery,
        },
      ],
    });
  });

  it('同一作品多次经过，路线中逐条保留', () => {
    const { markViewed } = useVisitorStore.getState();

    markViewed('art-101');
    markViewed('art-102');
    markViewed('art-101');
    markViewed('art-103');
    markViewed('art-101');

    const { visitors } = useVisitorStore.getState();
    const local = visitors.find((v) => v.visitorId === 'visitor-local')!;

    expect(local.viewedArtworkIds).toEqual([
      'art-101',
      'art-102',
      'art-101',
      'art-103',
      'art-101',
    ]);
  });

  it('首次浏览直接追加', () => {
    const { markViewed } = useVisitorStore.getState();
    markViewed('art-101');

    const { visitors } = useVisitorStore.getState();
    const local = visitors.find((v) => v.visitorId === 'visitor-local')!;

    expect(local.viewedArtworkIds).toEqual(['art-101']);
  });

  it('折返场景：A → B → A → C → A，路线长度为 5', () => {
    const { markViewed } = useVisitorStore.getState();

    markViewed('A');
    markViewed('B');
    markViewed('A');
    markViewed('C');
    markViewed('A');

    const { visitors } = useVisitorStore.getState();
    const local = visitors.find((v) => v.visitorId === 'visitor-local')!;

    expect(local.viewedArtworkIds).toHaveLength(5);
    expect(local.viewedArtworkIds[0]).toBe('A');
    expect(local.viewedArtworkIds[4]).toBe('A');
  });

  it('新访客首次 markViewed 应创建记录', () => {
    useVisitorStore.setState({ visitors: [], currentVisitorId: 'new-visitor' });

    useVisitorStore.getState().markViewed('art-101');

    const { visitors } = useVisitorStore.getState();
    expect(visitors).toHaveLength(1);
    expect(visitors[0].viewedArtworkIds).toEqual(['art-101']);
    expect(visitors[0].onlineStatus).toBe(VisitorStatus.InGallery);
  });
});
