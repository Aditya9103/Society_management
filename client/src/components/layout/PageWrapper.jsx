import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageWrapper({
  children,
  title = 'Parapet',
  description = 'The complete operating system for gated communities and housing societies.',
  ogImage = '/og-default.png',
}) {
  const fullTitle = title === 'Parapet' ? title : `${title} | Parapet`;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
