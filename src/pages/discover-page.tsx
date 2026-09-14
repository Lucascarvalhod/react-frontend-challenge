import { Header } from '@/components/header';
import { BookSearchResults } from '@/components/books/book-search-results';
import { DiscoverHero } from '@/components/books/discover-hero';
import { SearchControls } from '@/components/books/search-controls';
import { useBookSearch } from '@/hooks/use-book-search';

export function DiscoverPage() {
  const search = useBookSearch();

  return (
    <>
      <Header />
      <main className="shell">
        <DiscoverHero />
        <SearchControls
          input={search.input}
          printType={search.printType}
          orderBy={search.orderBy}
          onInputChange={search.setInput}
          onSubmit={search.submit}
          onPrintTypeChange={search.changePrintType}
          onOrderChange={search.changeOrderBy}
        />
        <BookSearchResults
          query={search.query}
          page={search.page}
          books={search.data?.books}
          isFetching={search.isFetching}
          isError={search.isError}
          error={search.error}
          onPreviousPage={search.previousPage}
          onNextPage={search.nextPage}
        />
      </main>
    </>
  );
}