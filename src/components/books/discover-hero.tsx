import { BookOpen, Sparkles } from 'lucide-react';

export function DiscoverHero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">
          <Sparkles size={14} /> CURADORIA PARA VOCÊ
        </p>
        <h1>
          Encontre histórias
          <br />
          <em>que ficam.</em>
        </h1>
        <p className="muted intro">
          Uma biblioteca pessoal, feita para acompanhar
          <br />
          as suas melhores descobertas.
        </p>
      </div>
      <div className="hero-art">
        <BookOpen size={74} />
        <span>“</span>
      </div>
    </section>
  );
}