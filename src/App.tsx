import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { hasSession } from '@/services/session-service';
import { useTheme } from '@/hooks/use-theme';
import { PageLoader } from '@/components/ui/page-loader';

const LoginForm = lazy(() =>
  import('@/components/auth/login-form').then((m) => ({ default: m.LoginForm })),
);
const BookDetailPage = lazy(() =>
  import('@/pages/book-detail-page').then((m) => ({ default: m.BookDetailPage })),
);
const DiscoverPage = lazy(() =>
  import('@/pages/discover-page').then((m) => ({ default: m.DiscoverPage })),
);
const ShelfPage = lazy(() =>
  import('@/pages/shelf-page').then((m) => ({ default: m.ShelfPage })),
);

function Protected({ children }: { children: ReactNode }) {
  return hasSession() ? children : <Navigate to="/login" replace />;
}
export function App() {
  useTheme();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <Protected>
            <DiscoverPage />
          </Protected>
        }
      />
      <Route
        path="/shelf"
        element={
          <Protected>
            <ShelfPage />
          </Protected>
        }
      />
      <Route
        path="/book/:bookId"
        element={
          <Protected>
            <BookDetailPage />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
  );
}