import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { featuresData } from '../../data/featuresData';
import PageWrapper from '../../components/layout/PageWrapper';
import CTASection from '../../components/sections/CTASection';
import Button from '../../components/ui/Button';
import MermaidDiagram from '../../components/ui/MermaidDiagram';

export default function FeaturePage() {
  const { slug } = useParams();

  // Find the feature across all categories
  let feature = null;
  let categoryName = '';
  let categoryKey = '';

  for (const [key, category] of Object.entries(featuresData)) {
    if (category.items[slug]) {
      feature = category.items[slug];
      categoryName = category.title;
      categoryKey = key;
      break;
    }
  }

  if (!feature) {
    return <Navigate to="/features" replace />;
  }

  return (
    <PageWrapper title={`${feature.title} | Parapet`}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#1E293B] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C58A38]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-[#E4B876] mb-6 tracking-wider uppercase">
              <Link to="/features" className="hover:text-white transition-colors">Features</Link>
              <span>/</span>
              <Link to={`/features#category-${categoryKey}`} className="hover:text-white transition-colors">{categoryName}</Link>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {feature.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl"
            >
              {feature.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <Button as={Link} to="/book-demo" variant="brass" size="lg">
                Book a Free Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image / Interactive Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square md:aspect-video lg:aspect-square bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex items-center justify-center relative group"
            >
              {feature.previewImage ? (
                <img 
                  src={feature.previewImage} 
                  alt={`${feature.title} Preview`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-slate-50/50" />
                  <div className="relative text-center p-8">
                    <div className="w-16 h-16 bg-[#C58A38]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[#C58A38]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Interactive Preview</h3>
                    <p className="text-slate-500">UI placeholder for {feature.title}</p>
                  </div>
                </>
              )}
            </motion.div>

            {/* Benefits List */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Why use {feature.title}?</h2>
                <div className="space-y-6">
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="mt-1 shrink-0">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckCircle2 size={14} className="text-emerald-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">How it works</h3>
                <div className="space-y-4">
                  {feature.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <p className="font-medium text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {feature.diagram && (
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Workflow Architecture</h2>
                <p className="text-slate-600 text-lg">Understanding the core operational flow behind this feature.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <MermaidDiagram chart={feature.diagram} />
              </div>
            </div>
          </div>
        </section>
      )}

      <CTASection 
        heading={`Ready to implement ${feature.title}?`} 
        subtext="See it in action with a personalized demo for your society."
      />
    </PageWrapper>
  );
}
