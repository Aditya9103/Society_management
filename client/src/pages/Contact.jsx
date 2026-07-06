import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { cn } from '../utils/cn';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { useSubmitContactMessageMutation } from '../store/api/contactApi';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitContact, { isLoading }] = useSubmitContactMessageMutation();
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await submitContact(data).unwrap();
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <PageWrapper 
      title="Contact Us | Parapet"
      description="Get in touch with the Parapet team for support, partnerships, or general inquiries."
    >
      <div className="min-h-screen pt-32 pb-24 bg-[var(--paper)] relative overflow-hidden">
        
        <div className="container relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Get in <span className="text-[var(--brass)]">touch</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-700 leading-relaxed font-medium"
            >
              Whether you have a question about features, pricing, or need technical support, our team is ready to answer all your questions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex gap-6">
                <div className="w-14 h-14 bg-[var(--ink)]/5 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-[var(--ink)]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Headquarters</h3>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    100 Feet Road, Indiranagar<br/>
                    Bengaluru, Karnataka 560038<br/>
                    India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Phone className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Sales</h3>
                    <a href="tel:+919876543210" className="text-lg font-medium text-slate-700 hover:text-[var(--brass)] transition-colors">+91 98765 43210</a>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Support</h3>
                    <a href="mailto:support@parapet.com" className="text-lg font-medium text-slate-700 hover:text-[var(--brass)] transition-colors">support@parapet.com</a>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brass)]/5 rounded-full blur-[80px] z-0 pointer-events-none translate-x-1/3 -translate-y-1/3" />
              
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>

              {status === 'success' ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600 mb-8 max-w-xs mx-auto">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setStatus('idle')}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name *</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none",
                        errors.name ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10"
                      )}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address *</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email" }
                      })}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none",
                        errors.email ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10"
                      )}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Society Name (Optional)</label>
                    <input
                      type="text"
                      {...register('societyName')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Message *</label>
                    <textarea
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none resize-none",
                        errors.message ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-slate-200 focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10"
                      )}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.message.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 border border-red-100 text-sm font-medium">
                      <AlertCircle size={16} /> {errorMsg}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    variant="ink" 
                    size="lg" 
                    className="w-full relative"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
