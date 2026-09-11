import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginForm } from '@/components/auth/login-form';
import { BookDetailPage } from '@/pages/book-detail-page';
import { DiscoverPage } from '@/pages/discover-page';
import { ShelfPage } from '@/pages/shelf-page';
import { hasSession } from '@/services/login-service';

function Protected({ children }: { children: ReactNode }) {
  return hasSession() ? children : <Navigate to="/login" replace />;
}
export function App() {
  return (
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
  );
}