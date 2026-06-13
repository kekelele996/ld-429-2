import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Analytics } from '../pages/Analytics';
import { ArtworkDetail } from '../pages/ArtworkDetail';
import { ExhibitionList } from '../pages/ExhibitionList';
import { GalleryWalk } from '../pages/GalleryWalk';
import { RoomEditor } from '../pages/RoomEditor';
import { useThemeStore } from '../stores/themeStore';

const navItems = [
  ['展览', '/exhibitions'],
  ['3D 漫游', '/gallery'],
  ['展厅编辑器', '/editor'],
  ['参观统计', '/analytics'],
];

function Shell() {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  return (
    <div className="app-shell" data-theme={mode}>
      <header className="border-b border-[var(--color-line)] bg-[var(--color-bg)]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
          <Link to="/gallery" className="text-xl font-semibold tracking-wide">
            Virtual Gallery Tour
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {navItems.map(([label, path]) => (
              <Link key={path} className="focus-ring hover:text-[var(--color-accent)]" to={path}>
                {label}
              </Link>
            ))}
            <button className="focus-ring border border-[var(--color-line)] px-3 py-2" onClick={toggleTheme}>
              {mode === 'light' ? '暗色' : '亮色'}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-7">
        <Routes>
          <Route path="/" element={<Navigate to="/gallery" replace />} />
          <Route path="/gallery" element={<GalleryWalk />} />
          <Route path="/exhibitions" element={<ExhibitionList />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/editor" element={<RoomEditor />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
