import { motion } from 'framer-motion';
import { Home, Building, Building2, Users2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import CTASection from '../components/sections/CTASection';

const segments = [
  {
    id: 'housing-societies',
    title: 'Housing Societies',
    icon: Home,
    desc: 'The complete digital upgrade for standard residential apartments and RWA-managed complexes.',
    features: ['Visitor Management', 'Maintenance Billing', 'Resident Helpdesk', 'Amenities Booking']
  },
  {
    id: 'gated-townships',
    title: 'Gated Townships',
    icon: Building2,
    desc: 'Scalable infrastructure for sprawling townships with multiple gates, phases, and complex security needs.',
    features: ['Multi-gate Sync', 'RFID Boom Barriers', 'Internal Transport Tracking', 'Phase-wise Billing']
  },
  {
    id: 'commercial',
    title: 'Commercial Complexes',
    icon: Building,
    desc: 'Enterprise-grade visitor and facility management for IT parks, malls, and corporate office spaces.',
    features: ['Employee Attendance', 'Delivery Hub Routing', 'Meeting Room Booking', 'Vendor SLA Tracking']
  },
  {
    id: 'co-living',
    title: 'Co-living Spaces',
    icon: Users2,
    desc: 'Streamlined tenant onboarding, rent collection, and community building for modern PG/co-living providers.',
    features: ['Digital KYC', 'Rent Collection', 'Room Allocation', 'Community Events Feed']
  }
];

export default function Industries() {
  return (
    <PageWrapper 
      title="Industries | Parapet"
      description="Tailored society management solutions for apartments, townships, and commercial spaces."
    >
      <div className="pt-32 pb-24 bg-transparent min-h-screen">
        <div className="container">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-tx-primary mb-6"
            >
              Built for every <span className="text-[var(--brass)]">community</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-tx-primary leading-relaxed font-medium"
            >
              Parapet's flexible architecture adapts perfectly to the unique operational challenges of different real estate asset classes.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {segments.map((segment, idx) => {
              const Icon = segment.icon;
              return (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-bg-surface p-10 rounded-[2rem] border border-bd-subtle shadow-xl relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C58A38]/5 rounded-full blur-[80px] z-0 translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-[#C58A38]/10 transition-colors" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-bg-subtle flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#C58A38]/10 transition-all duration-300">
                    <Icon size={32} className="text-tx-primary group-hover:text-[var(--brass)] transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-tx-primary mb-4">{segment.title}</h3>
                  <p className="text-tx-primary leading-relaxed font-medium mb-8">
                    {segment.desc}
                  </p>
                  
                  <div className="space-y-3 mb-10">
                    {segment.features.map(feat => (
                      <div key={feat} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--brass)]" />
                        <span className="text-tx-primary font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to="/book-demo" 
                    className="inline-flex items-center gap-2 text-[var(--brass)] font-bold hover:text-[var(--brass-dark)] transition-colors"
                  >
                    View solution <ArrowRight size={18} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
      
      <CTASection />
    </PageWrapper>
  );
}
