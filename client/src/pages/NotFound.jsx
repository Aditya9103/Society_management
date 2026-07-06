import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
export default function NotFound() {
  return (
    <PageWrapper title="404 — Page Not Found">
      <div className="min-h-screen bg-[var(--ink)] flex items-center justify-center text-white text-center pt-20">
        <div>
          <p className="mono text-[var(--brass-light)] mb-3">404</p>
          <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
          <p className="text-[rgba(244,245,241,0.6)] mb-8">This page doesn't exist or has been moved.</p>
          <Button as={Link} to="/" variant="brass" size="lg">Go Home</Button>
        </div>
      </div>
    </PageWrapper>
  );
}
