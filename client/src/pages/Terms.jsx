import PageWrapper from '../components/layout/PageWrapper';

export default function Terms() {
  return (
    <PageWrapper 
      title="Terms of Service | Parapet"
      description="Read the terms and conditions for using the Parapet platform."
    >
      <div className="pt-32 pb-24 bg-surface-light text-text-primary-on-light min-h-screen">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[var(--text-on-light)] mb-4">Terms of Service</h1>
            <p className="text-[var(--text-on-light-muted)] font-medium font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none text-[var(--text-on-light-muted)] font-medium leading-relaxed">
            <h2 className="text-2xl font-bold text-[var(--text-on-light)] mt-10 mb-4">1. Agreement to Terms</h2>
            <p className="mb-6">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Parapet ("we", "us", or "our"), concerning your access to and use of the Parapet platform and website.
            </p>

            <h2 className="text-2xl font-bold text-[var(--text-on-light)] mt-10 mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-6">
              Unless otherwise indicated, the platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us.
            </p>

            <h2 className="text-2xl font-bold text-[var(--text-on-light)] mt-10 mb-4">3. User Representations</h2>
            <p className="mb-6">
              By using the platform, you represent and warrant that: 
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[var(--text-on-light)] mt-10 mb-4">4. Subscriptions and Payments</h2>
            <p className="mb-6">
              We bill you through an online billing account for purchases made via the Site. You agree to pay all charges or fees at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such amounts upon making your purchase.
            </p>

            <h2 className="text-2xl font-bold text-[var(--text-on-light)] mt-10 mb-4">5. Contact Information</h2>
            <p className="mb-6">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: legal@parapet.com.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
