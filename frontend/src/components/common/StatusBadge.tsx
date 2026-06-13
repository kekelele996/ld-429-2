import { ExhibitionStatus } from '../../types/enums';

const styles: Record<string, string> = {
  [ExhibitionStatus.Active]: 'border-moss text-moss',
  [ExhibitionStatus.Upcoming]: 'border-ultramarine text-ultramarine',
  [ExhibitionStatus.Past]: 'border-zinc-500 text-zinc-600',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center border px-2 py-1 text-xs uppercase tracking-[0.18em] ${styles[status] ?? styles.Past}`}>
      {status}
    </span>
  );
}
