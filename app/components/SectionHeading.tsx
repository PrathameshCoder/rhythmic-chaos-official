export default function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8A7DFF]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-white/55">{intro}</p>
      )}
    </div>
  );
}
