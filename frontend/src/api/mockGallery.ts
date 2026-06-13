import { ExhibitionStatus, FrameStyle, RoomType, VisitorStatus } from '../types/enums';
import type { Artwork, Exhibition, GalleryRoom, GuideAnnotation, VisitorLog } from '../types';
import { DEFAULT_LIGHTING } from '../constants/lighting';

const image = (seed: string) => `https://picsum.photos/seed/${seed}/1200/840`;

export const rooms: GalleryRoom[] = [
  {
    id: 'room-main',
    name: '主展厅：纸上城市',
    size: { width: 14, height: 5, depth: 18 },
    wallColor: '#eee4d4',
    floorMaterial: 'matte-oak',
    lighting: DEFAULT_LIGHTING.Main,
    roomType: RoomType.Main,
    mountPoints: [
      { id: 'm1', position: { x: -6.8, y: 2.3, z: -5 }, rotationY: Math.PI / 2, width: 2.5, height: 1.8 },
      { id: 'm2', position: { x: 6.8, y: 2.3, z: -5 }, rotationY: -Math.PI / 2, width: 2.5, height: 1.8 },
      { id: 'm3', position: { x: 0, y: 2.4, z: -8.7 }, rotationY: 0, width: 3.2, height: 2 },
    ],
  },
  {
    id: 'room-side',
    name: '侧厅：静物的旁白',
    size: { width: 10, height: 4.2, depth: 12 },
    wallColor: '#e2ded2',
    floorMaterial: 'burnished-concrete',
    lighting: DEFAULT_LIGHTING.Side,
    roomType: RoomType.Side,
    mountPoints: [
      { id: 's1', position: { x: -4.8, y: 2.1, z: -4 }, rotationY: Math.PI / 2, width: 2, height: 1.6 },
      { id: 's2', position: { x: 4.8, y: 2.1, z: -4 }, rotationY: -Math.PI / 2, width: 2, height: 1.6 },
    ],
  },
  {
    id: 'room-virtual',
    name: '虚拟厅：光的回声',
    size: { width: 16, height: 6, depth: 16 },
    wallColor: '#dfe6e4',
    floorMaterial: 'polished-stone',
    lighting: DEFAULT_LIGHTING.Virtual,
    roomType: RoomType.Virtual,
    mountPoints: [
      { id: 'v1', position: { x: -5, y: 2.6, z: -7 }, rotationY: Math.PI / 2, width: 2.4, height: 2.4 },
      { id: 'v2', position: { x: 5, y: 2.6, z: -7 }, rotationY: -Math.PI / 2, width: 2.4, height: 2.4 },
    ],
  },
];

export const artworks: Artwork[] = [
  {
    id: 'art-101',
    title: '雨后平面',
    artistName: '林岑',
    year: 2024,
    medium: 'Digital ink on archival paper',
    imageUrl: image('rain-plane'),
    thumbnailUrl: image('rain-plane-thumb'),
    description: '以建筑制图的克制线条记录城市雨后的湿度，画面边缘保留手工套印痕迹。',
    roomId: 'room-main',
    mountPosition: { x: -6.8, y: 2.3, z: -5 },
    frameStyle: FrameStyle.Modern,
    tags: ['城市', '数字绘画', '冷静'],
  },
  {
    id: 'art-102',
    title: '灰蓝扶手椅',
    artistName: '宋禾',
    year: 2023,
    medium: 'Acrylic on canvas',
    imageUrl: image('blue-chair'),
    thumbnailUrl: image('blue-chair-thumb'),
    description: '室内角落被压缩成几何色块，蓝色扶手椅像临时停靠的船。',
    roomId: 'room-main',
    mountPosition: { x: 6.8, y: 2.3, z: -5 },
    frameStyle: FrameStyle.Simple,
    tags: ['室内', '亚克力', '色块'],
  },
  {
    id: 'art-103',
    title: '缓慢的花瓶',
    artistName: '邢然',
    year: 2022,
    medium: 'Oil painting',
    imageUrl: image('slow-vase'),
    thumbnailUrl: image('slow-vase-thumb'),
    description: '静物在长曝光般的笔触里失去边界，暗部中保留温热的赭色。',
    roomId: 'room-side',
    mountPosition: { x: -4.8, y: 2.1, z: -4 },
    frameStyle: FrameStyle.Classic,
    tags: ['静物', '油画', '暖色'],
  },
  {
    id: 'art-104',
    title: '回声地图',
    artistName: '陈玥',
    year: 2025,
    medium: 'Generative print',
    imageUrl: image('echo-map'),
    thumbnailUrl: image('echo-map-thumb'),
    description: '由观众动线生成的抽象地图，线条密度对应作品前停留时间。',
    roomId: 'room-virtual',
    mountPosition: { x: -5, y: 2.6, z: -7 },
    frameStyle: FrameStyle.None,
    tags: ['生成艺术', '数据', '导览'],
  },
];

export const exhibitions: Exhibition[] = [
  {
    id: 'ex-urban-paper',
    title: '纸上城市',
    curator: '许知遥',
    description: '从建筑线稿、室内静物到观众动线，本展讨论图像如何搭建一座可行走的城市。',
    coverUrl: image('exhibition-cover'),
    roomIds: ['room-main', 'room-side', 'room-virtual'],
    routePoints: [
      { x: 0, y: 0, z: 2 },
      { x: -2, y: 0, z: -4 },
      { x: 2, y: 0, z: -8 },
    ],
    audioGuideUrls: ['/audio/urban-paper-intro.mp3'],
    status: ExhibitionStatus.Active,
  },
  {
    id: 'ex-still-revision',
    title: '静物修订稿',
    curator: '白其安',
    description: '小尺幅作品与低照度展厅共同组成一次缓慢的观看训练。',
    coverUrl: image('still-life-cover'),
    roomIds: ['room-side'],
    routePoints: [{ x: 0, y: 0, z: 2 }, { x: 0, y: 0, z: -6 }],
    status: ExhibitionStatus.Upcoming,
  },
];

export const annotations: GuideAnnotation[] = [
  {
    id: 'guide-101',
    artworkId: 'art-101',
    position: { x: -5.4, y: 3.2, z: -5 },
    title: '套印边缘',
    description: '左侧刻意留下 2mm 的错位边缘，模拟版画制程中的物理延迟。',
    order: 1,
  },
  {
    id: 'guide-104',
    artworkId: 'art-104',
    position: { x: -3.8, y: 3.1, z: -7 },
    title: '数据痕迹',
    description: '每条线段都对应一段匿名参观轨迹，热区在图面中央形成回声。',
    order: 1,
  },
];

export const visitors: VisitorLog[] = [
  {
    visitorId: 'visitor-a12',
    enteredAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    staySeconds: 840,
    viewedArtworkIds: ['art-101', 'art-102', 'art-104'],
    currentRoomId: 'room-main',
    onlineStatus: VisitorStatus.InGallery,
  },
  {
    visitorId: 'visitor-b44',
    enteredAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    staySeconds: 1080,
    viewedArtworkIds: ['art-103'],
    currentRoomId: 'room-side',
    onlineStatus: VisitorStatus.Left,
  },
];
