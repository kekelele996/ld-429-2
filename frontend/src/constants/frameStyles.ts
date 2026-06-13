import { FrameStyle } from '../types/enums';

export const FRAME_STYLE_LABELS: Record<FrameStyle, string> = {
  [FrameStyle.None]: '无框',
  [FrameStyle.Simple]: '细边框',
  [FrameStyle.Classic]: '古典木框',
  [FrameStyle.Modern]: '现代金属框',
  [FrameStyle.Ornate]: '装饰雕花框',
};

export const FRAME_STYLE_COLORS: Record<FrameStyle, string> = {
  [FrameStyle.None]: '#f4efe6',
  [FrameStyle.Simple]: '#2f2b25',
  [FrameStyle.Classic]: '#6b4629',
  [FrameStyle.Modern]: '#b4b7b2',
  [FrameStyle.Ornate]: '#c29b42',
};
