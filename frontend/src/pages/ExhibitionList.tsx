import { ExhibitionCard } from '../components/common/ExhibitionCard';
import { EmptyState } from '../components/common/EmptyState';
import { useExhibitionStore } from '../stores/exhibitionStore';

export function ExhibitionList() {
  const exhibitions = useExhibitionStore((state) => state.exhibitions);
  if (exhibitions.length === 0) {
    return <EmptyState title="暂无展览" description="创建展厅和作品后，展览会在这里展示。" />;
  }
  return (
    <div>
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">Exhibitions</p>
        <h1 className="mt-3 text-5xl font-semibold">展览列表</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {exhibitions.map((exhibition) => (
          <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
        ))}
      </div>
    </div>
  );
}
