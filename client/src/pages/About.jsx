import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, ShieldCheck, Heart } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import CTASection from '../components/sections/CTASection';

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust First',
    desc: 'We are stewards of your most sensitive community data. We build everything with privacy and security as the baseline, not an afterthought.'
  },
  {
    icon: Users,
    title: 'Community Centric',
    desc: 'Technology should bring people together. Every feature we build is designed to foster harmony and reduce friction among neighbors.'
  },
  {
    icon: Heart,
    title: 'Empathy in Support',
    desc: 'We know that managing a society is a thankless, 24/7 volunteer job. Our support team treats committee members with the respect they deserve.'
  },
  {
    icon: Trophy,
    title: 'Relentless Excellence',
    desc: 'We refuse to accept the status quo of clunky, outdated software. We bring consumer-grade, beautiful design to enterprise operations.'
  }
];

const team = [
  { name: 'Aditya Kumar Singh', role: 'Founder & CEO' },
  { name: 'Sarah Chen', role: 'Head of Product' },
  { name: 'Rahul Sharma', role: 'VP Engineering' },
  { name: 'Priya Patel', role: 'Customer Success' }
];

export default function About() {
  return (
    <PageWrapper 
      title="About Us | Parapet"
      description="The story behind Parapet and our mission to modernize society management."
    >
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        
        {/* Mission Section */}
        <section className="container mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 text-sm font-bold text-slate-700 mb-8"
            >
              Our Mission
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-[1.1]"
            >
              We're building the <br/>
              <span className="text-[var(--brass)]">operating system</span> <br/>
              for modern living.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto"
            >
              Parapet was born out of frustration. We saw managing committees struggling with 5 different tools for billing, gate security, and communication. We knew there had to be a better, more beautiful way.
            </motion.p>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-24 border-y border-slate-200">
          <div className="container">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What drives us</h2>
              <p className="text-xl text-slate-600 font-medium">These core values dictate every product decision we make.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div 
                    key={val.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon size={28} className="text-[var(--brass)]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{val.title}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">{val.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-slate-600 font-medium">Built by a passionate team of engineers and community builders.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-40 h-40 mx-auto rounded-3xl bg-slate-200 mb-6 overflow-hidden">
                  {/* Placeholder for team photos */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-slate-500 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
      
      <CTASection />
    </PageWrapper>
  );
}
