import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchControls } from '@/components/books/search-controls';

describe('SearchControls', () => {
  it('propaga entrada, filtros e envio do formulário', () => {
    const onInputChange = vi.fn();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const onPrintTypeChange = vi.fn();
    const onOrderChange = vi.fn();

    render(
      <SearchControls
        input="Duna"
        printType="books"
        orderBy="newest"
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onPrintTypeChange={onPrintTypeChange}
        onOrderChange={onOrderChange}
      />,
    );

    const input = screen.getByPlaceholderText('Busque por título, autor ou ISBN...');
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(input, { target: { value: 'Fundação' } });
    fireEvent.change(selects[0], { target: { value: 'magazines' } });
    fireEvent.change(selects[1], { target: { value: 'relevance' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Buscar' }).closest('form')!);

    expect(onInputChange).toHaveBeenCalledWith('Fundação');
    expect(onPrintTypeChange).toHaveBeenCalledWith('magazines');
    expect(onOrderChange).toHaveBeenCalledWith('relevance');
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});