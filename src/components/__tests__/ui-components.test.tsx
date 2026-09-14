import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/ui/brand';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/states';
import { DiscoverHero } from '@/components/books/discover-hero';

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('componentes de UI', () => {
  it('renderiza o Button com variante, tamanho e props nativas', () => {
    render(<Button variant="outline" size="lg">Continuar</Button>);

    const button = screen.getByRole('button', { name: 'Continuar' });
    expect(button).toHaveAttribute('data-slot', 'button');
    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-size', 'lg');
    expect(button).toHaveClass('border', 'h-10');
  });

  it('renderiza Button como filho de um link quando asChild está ativo', () => {
    renderWithRouter(
      <Button asChild>
        <a href="/shelf">Minha estante</a>
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Minha estante' })).toHaveAttribute('href', '/shelf');
  });

  it('renderiza a marca no modo grande', () => {
    renderWithRouter(<Brand large />);

    const brand = screen.getByRole('link', { name: 'Libris' });
    expect(brand).toHaveAttribute('href', '/');
    expect(brand).toHaveClass('text-[28]');
    expect(brand.querySelector('svg')).toHaveClass('size-5.75');
  });

  it('renderiza mensagens padrão e customizadas dos estados', () => {
    renderWithRouter(
      <>
        <LoadingState />
        <ErrorState message="Falha ao carregar" />
        <EmptyState />
      </>,
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Algo deu errado' })).toBeInTheDocument();
    expect(screen.getByText('Falha ao carregar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sua estante está vazia' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explorar livros' })).toHaveAttribute('href', '/');
  });

  it('exibe o conteúdo principal da hero de descoberta', () => {
    render(<DiscoverHero />);

    expect(screen.getByRole('heading', { name: /Encontre histórias/ })).toBeInTheDocument();
    expect(screen.getByText('CURADORIA PARA VOCÊ')).toBeInTheDocument();
    expect(screen.getByText(/Uma biblioteca pessoal/)).toBeInTheDocument();
  });
});