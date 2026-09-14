import { Search, SlidersHorizontal } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';

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
      <form className="flex items-center gap-[3.25px] rounded-[13px] border border-border bg-card py-[1.75px] pr-2 pl-5 shadow-soft" onSubmit={onSubmit}>
        <Search size={20} className="shrink-0 text-(--color-text-subtle)" />
        <Input
          className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Busque por título, autor ou ISBN..."
        />
        <Button type="submit">Buscar</Button>
      </form>
      <div className="flex flex-wrap items-center gap-[6px] border-b border-(--color-border-subtle) py-[6px] pb-[4px] text-[12px] text-(--color-text-subtle) max-[760px]:gap-[3px]">
        <label className="flex items-center gap-1.25">
          <SlidersHorizontal size={15} /> Tipo{' '}
          <NativeSelect value={printType} onChange={(event) => onPrintTypeChange(event.target.value)}>
            <option value="all">Todos</option>
            <option value="books">Livros</option>
            <option value="magazines">Revistas</option>
          </NativeSelect>
        </label>
        <label className="flex items-center gap-1.25">
          Ordenar{' '}
          <NativeSelect value={orderBy} onChange={(event) => onOrderChange(event.target.value)}>
            <option value="relevance">Relevância</option>
            <option value="newest">Mais recentes</option>
          </NativeSelect>
        </label>
      </div>
    </>
  );
}