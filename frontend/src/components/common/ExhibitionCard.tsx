import { Link } from 'react-router-dom';
import type { Exhibition } from '../../types';
import { StatusBadge } from './StatusBadge';

export function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
  return (
    <article className="group border border-[var(--color-line)] bg-[var(--color-panel)]">
      <Link to="/gallery" className="block focus-ring">
        <img src={exhibition.coverUrl} alt={exhibition.title} className="aspect-[16/9] w-full object-cover grayscale-[20%] transition group-hover:grayscale-0" />
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-muted)]">策展人：{exhibition.curator}</p>
            <StatusBadge status={exhibition.status} />
          </div>
          <h3 className="mt-4 text-3xl font-semibold">{exhibition.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{exhibition.description}</p>
        </div>
      </Link>
    </article>
  );
}
