import PageWrapper from '../components/layout/PageWrapper';

export default function Privacy() {
  return (
    <PageWrapper 
      title="Privacy Policy | Parapet"
      description="Learn how Parapet protects and manages your society data."
    >
      <div className="pt-32 pb-24 bg-transparent min-h-screen">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-tx-primary mb-4">Privacy Policy</h1>
            <p className="text-tx-secondary font-medium font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none text-tx-secondary font-medium leading-relaxed">
            <h2 className="text-2xl font-bold text-tx-primary mt-10 mb-4">1. Introduction</h2>
            <p className="mb-6">
              At Parapet, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our society management platform.
            </p>

            <h2 className="text-2xl font-bold text-tx-primary mt-10 mb-4">2. Information We Collect</h2>
            <p className="mb-6">
              We collect information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products, or otherwise contact us.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and residential address.</li>
              <li><strong>Society Data:</strong> Flat numbers, vehicle details, and visitor logs (managed securely on behalf of the society RWA).</li>
              <li><strong>Financial Data:</strong> Transaction histories for maintenance payments (we do not store full credit card numbers).</li>
            </ul>

            <h2 className="text-2xl font-bold text-tx-primary mt-10 mb-4">3. How We Use Your Information</h2>
            <p className="mb-6">
              We use the information we collect or receive:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To manage resident billing and society accounts.</li>
              <li>To operate the visitor management system securely.</li>
              <li>To send administrative information to you.</li>
            </ul>

            <h2 className="text-2xl font-bold text-tx-primary mt-10 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-tx-primary mt-10 mb-4">5. Contact Us</h2>
            <p className="mb-6">
              If you have questions or comments about this policy, you may email us at privacy@parapet.com.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
