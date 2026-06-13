export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="panel flex min-h-48 flex-col items-start justify-center p-8">
      <p className="text-xl font-semibold">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">{description}</p>
    </div>
  );
}
