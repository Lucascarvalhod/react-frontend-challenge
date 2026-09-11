import { Search, SlidersHorizontal } from 'lucide-react';
import type { FormEvent } from 'react';

type Props = {
  input: string;
  printType: string;
  orderBy: string;
  onInputChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onPrintTypeChange: (value: string) => void;
  onOrderChange: (value: string) => void;
};
export function SearchControls({
  input,
  printType,
  orderBy,
  onInputChange,
  onSubmit,
  onPrintTypeChange,
  onOrderChange,
}: Props) {
  return (
    <>
      <form className="search-bar" onSubmit={onSubmit}>
        <Search size={20} />
        <input
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Busque por título, autor ou ISBN..."
        />
        <button className="primary">Buscar</button>
      </form>
      <div className="filter-row">
        <label>
          <SlidersHorizontal size={15} /> Tipo{' '}
          <select value={printType} onChange={(event) => onPrintTypeChange(event.target.value)}>
            <option value="all">Todos</option>
            <option value="books">Livros</option>
            <option value="magazines">Revistas</option>
          </select>
        </label>
        <label>
          Ordenar{' '}
          <select value={orderBy} onChange={(event) => onOrderChange(event.target.value)}>
            <option value="relevance">Relevância</option>
            <option value="newest">Mais recentes</option>
          </select>
        </label>
      </div>
    </>
  );
}