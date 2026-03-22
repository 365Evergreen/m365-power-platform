interface HeroSectionProps {
  articleCount: number;
  filteredCount: number;
  categoryCount: number;
}

export function HeroSection({
  articleCount,
  filteredCount,
  categoryCount,
}: HeroSectionProps) {
  const stats = [
    {
      label: "Articles",
      value: articleCount.toString(),
      detail: articleCount === 1 ? "knowledge entry" : "knowledge entries",
    },
    {
      label: "Visible now",
      value: filteredCount.toString(),
      detail: filteredCount === articleCount ? "full library" : "filtered results",
    },
    {
      label: "Categories",
      value: categoryCount.toString(),
      detail: categoryCount === 1 ? "topic covered" : "topics covered",
    },
  ];

  return (
    <section className="relative mb-6 overflow-hidden rounded-[28px] border border-border/80 bg-[linear-gradient(135deg,rgba(238,244,255,0.95),rgba(255,255,255,0.98)_55%,rgba(242,247,244,0.92))] p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.35)] sm:p-8 md:p-10">
      <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-40 w-40 rounded-full bg-emerald-400/12 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] lg:items-end">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            curated for practitioners
          </span>

          <h2 className="mt-4 max-w-2xl text-[34px] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[42px] md:text-[52px]">
            Build and maintain your own M365 Evergreen article library.
          </h2>

          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-[16px]">
            Collect trusted guidance, write internal how-to pages, and keep contributor access tied to approved GitHub identities.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/70 bg-background/75 p-4 shadow-sm backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}