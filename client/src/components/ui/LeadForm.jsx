import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from './Button';
import { useSubmitLeadMutation } from '../../store/api/leadsApi';

export default function LeadForm({ source = 'book-demo', className }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitLead, { isLoading }] = useSubmitLeadMutation();
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await submitLead({ ...data, source }).unwrap();
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-900 mb-2">Request Received!</h3>
        <p className="text-emerald-700 max-w-sm">
          Thank you for your interest in Parapet. One of our product specialists will reach out to you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => setStatus('idle')}
        >
          Submit another request
        </Button>
      </motion.div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={cn("bg-white/80 backdrop-blur-xl border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden", className)}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C58A38]/5 rounded-full blur-[80px] z-0 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <div className="space-y-4">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name *</label>
            <input
              type="text"
              placeholder="Jane Doe"
              {...register('name', { required: 'Name is required' })}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none",
                errors.name 
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-slate-200 focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10"
              )}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Work Email *</label>
            <input
              type="email"
              placeholder="jane@society.com"
              {...register('workEmail', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none",
                errors.workEmail 
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-slate-200 focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10"
              )}
            />
            <AnimatePresence>
              {errors.workEmail && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.workEmail.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2: Society & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Society Name *</label>
            <input
              type="text"
              placeholder="Lotus Panache"
              {...register('societyName', { required: 'Society Name is required' })}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white transition-all outline-none",
                errors.societyName 
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-slate-200 focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10"
              )}
            />
            <AnimatePresence>
              {errors.societyName && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.societyName.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Phone Number (Optional)</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              {...register('phone')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Row 3: Units & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Total Units</label>
            <select
              {...register('unitCount')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10 transition-all outline-none appearance-none"
            >
              <option value="">Select size...</option>
              <option value="50">1 - 50</option>
              <option value="200">51 - 200</option>
              <option value="500">201 - 500</option>
              <option value="1000">501 - 1000</option>
              <option value="1001">1000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Preferred Date</label>
            <input
              type="date"
              {...register('preferredDate')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#C58A38] focus:ring-4 focus:ring-[#C58A38]/10 transition-all outline-none text-slate-700"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100"
          >
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        type="submit" 
        variant="brass" 
        size="lg" 
        className="w-full relative shadow-lg shadow-[#C58A38]/20"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin absolute left-1/2 -ml-2.5 opacity-0 group-hover:opacity-100" />
            <span className="opacity-0">Requesting Demo...</span>
          </>
        ) : (
          "Request Demo"
        )}
        {isLoading && <span className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-5 h-5 animate-spin" /></span>}
      </Button>

      <p className="text-center text-xs font-medium text-slate-400 mt-4">
        By submitting, you agree to our Privacy Policy and Terms of Service.
      </p>
    </form>
  );
}
