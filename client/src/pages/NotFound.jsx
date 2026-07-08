import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
export default function NotFound() {
  return (
    <PageWrapper title="404 — Page Not Found">
      <div className="min-h-screen bp-grid-dark flex items-center justify-center text-center pt-20 px-4">
        <div className="relative z-10">
          <p className="mono text-[var(--brass-300)] mb-3 text-lg tracking-widest uppercase">Error 404</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--text-on-dark)]">Page Not Found</h1>
          <p className="text-[var(--text-on-dark-muted)] mb-10 max-w-md mx-auto text-lg leading-relaxed">
            The schematic you're looking for doesn't exist or has been moved to a new set of blueprints.
          </p>
          <Button as={Link} to="/" variant="brass" size="lg">
            Return to Blueprint
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
