export function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"
          role="status"
          aria-label="Carregando página"
        />
        <span className="text-sm text-muted-foreground">Carregando...</span>
      </div>
    </div>
  );
}