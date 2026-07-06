import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from './store/slices/authSlice';

// ─── Eager loads (critical path) ────────────────────────────────
import Home from './pages/Home';

// ─── Lazy loads ────────────────────────────────────────────────
const FeaturesIndex  = lazy(() => import('./pages/features/FeaturesIndex'));
const FeaturePage    = lazy(() => import('./pages/features/FeaturePage'));
const Pricing        = lazy(() => import('./pages/Pricing'));
const Industries     = lazy(() => import('./pages/Industries'));
const About          = lazy(() => import('./pages/About'));
const Blog           = lazy(() => import('./pages/Blog'));
const BlogPost       = lazy(() => import('./pages/BlogPost'));
const Contact        = lazy(() => import('./pages/Contact'));
const BookDemo       = lazy(() => import('./pages/BookDemo'));
const Privacy        = lazy(() => import('./pages/Privacy'));
const Terms          = lazy(() => import('./pages/Terms'));
const NotFound       = lazy(() => import('./pages/NotFound'));

// Admin (lazy)
const AdminLogin     = lazy(() => import('./admin/Login'));
const AdminRegister  = lazy(() => import('./admin/Register'));
const LeadsDashboard = lazy(() => import('./admin/LeadsDashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center">
      <div className="flex items-center gap-3 text-[var(--text-muted)]">
        <div className="w-5 h-5 border-2 border-[var(--brass)] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  );
}

// Protected route for admin
function AdminRoute({ children }) {
  const isAdmin = useSelector(selectIsAdmin);
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/"                     element={<Home />} />
          <Route path="/features"             element={<FeaturesIndex />} />
          <Route path="/features/:slug"       element={<FeaturePage />} />
          <Route path="/pricing"              element={<Pricing />} />
          <Route path="/industries"           element={<Industries />} />
          <Route path="/about"               element={<About />} />
          <Route path="/blog"                element={<Blog />} />
          <Route path="/blog/:slug"          element={<BlogPost />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/book-demo"           element={<BookDemo />} />
          <Route path="/privacy"             element={<Privacy />} />
          <Route path="/terms"               element={<Terms />} />

          {/* Admin */}
          <Route path="/admin/login"         element={<AdminLogin />} />
          <Route path="/admin/register"      element={<AdminRegister />} />
          <Route path="/admin/leads"         element={
            <AdminRoute><LeadsDashboard /></AdminRoute>
          } />

          {/* 404 */}
          <Route path="*"                    element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
