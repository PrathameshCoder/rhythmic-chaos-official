import { shows } from "../../data/shows";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { ExternalLinkIcon } from "../Icons";

function formatShowDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Shows() {
  return (
    <section id="shows" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading eyebrow="Live" title="Shows & Events" />
        </Reveal>

        {shows.length === 0 ? (
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-14 text-center">
              <p className="text-lg text-white/70">
                No upcoming shows announced yet.
              </p>
              <p className="mt-2 text-sm text-white/45">
                Join the mailing list to be the first to know.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-4">
            {shows.map((show, i) => (
              <Reveal key={`${show.name}-${show.date}`} delay={i * 80}>
                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-[#8A7DFF]">
                      {formatShowDate(show.date)}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      {show.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/55">
                      {show.venue} · {show.city}
                    </p>
                  </div>
                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#8A7DFF] hover:bg-[#8A7DFF]/10"
                    >
                      Tickets
                      <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
