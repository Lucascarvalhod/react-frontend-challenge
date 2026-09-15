import { BookOpen, Sparkles } from 'lucide-react';

export function DiscoverHero() {
  return (
    <section className="flex items-center justify-between py-6 pb-13.5">
      <div>
        <p className="mb-[3.75px] flex items-center gap-[1.75px] text-[11px] font-bold tracking-[0.16em] text-(--color-accent-text)">
          <Sparkles size={14} /> CURADORIA PARA VOCÊ
        </p>
        <h1 className="font-serif text-[58px] leading-[1.04] tracking-[-0.04em] text-(--color-heading) max-[760px]:text-[45px]">
          Encontre histórias
          <br />
          <em>que ficam.</em>
        </h1>
        <p className="mt-5.25 text-[14px] leading-[1.75] text-(--color-text-subtle)">
          Uma biblioteca pessoal, feita para acompanhar
          <br />
          as suas melhores descobertas.
        </p>
      </div>
      <div className="relative grid h-[190px] w-[210px] rotate-[-8deg] place-items-center rounded-[48%_52%_43%_57%] bg-accent text-(--color-accent-text) max-[760px]:hidden">
        <BookOpen size={74} />
        <span className="absolute top-[5px] left-[30px] font-serif text-[80px] text-var(--color-accent-text)">“</span>
      </div>
    </section>
  );
}