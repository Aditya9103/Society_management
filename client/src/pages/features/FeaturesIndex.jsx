import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { featuresData } from '../../data/featuresData';
import PageWrapper from '../../components/layout/PageWrapper';
import SectionHeader from '../../components/ui/SectionHeader';
import CTASection from '../../components/sections/CTASection';
import Card from '../../components/ui/Card';

export default function FeaturesIndex() {
  return (
    <PageWrapper title="All Features | Parapet">
      <div className="pt-32 pb-16 bg-transparent min-h-screen">
        <div className="container">
          <SectionHeader
            eyebrow="Complete ERP"
            heading="Everything you need to run a modern society."
            subtext="From secure gate entry to automated billing and maintenance tracking, Parapet replaces 5 different apps with one unified platform."
            align="center"
            maxWidth="700px"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 mt-16">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-2">
                {Object.entries(featuresData).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <a
                      key={key}
                      href={`#category-${key}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-tx-secondary font-medium hover:bg-bg-subtle hover:text-tx-primary transition-colors"
                    >
                      <Icon size={18} className="text-[#C58A38]" />
                      {category.title}
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* Content Area */}
            <div className="space-y-24">
              {Object.entries(featuresData).map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <section key={key} id={`category-${key}`} className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-bd-subtle flex items-center justify-center">
                        <Icon size={20} className="text-tx-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-tx-primary">{category.title}</h2>
                        <p className="text-tx-secondary font-medium">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(category.items).map(([slug, feature]) => (
                        <Link
                          key={slug}
                          to={`/features/${slug}`}
                          className="block group"
                        >
                          <Card
                            glass
                            className="p-8 h-full relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C58A38]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-xl font-bold text-tx-primary mb-3 group-hover:text-[#C58A38] transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-tx-primary leading-relaxed">
                              {feature.description}
                            </p>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <CTASection />
    </PageWrapper>
  );
}
