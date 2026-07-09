import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, User, Mail, Phone, Building2 } from 'lucide-react';
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
      className={cn("bg-white border border-[var(--line-on-light)] p-6 sm:p-8 rounded-3xl shadow-[var(--shadow-lg)] space-y-6 relative overflow-hidden", className)}
    >

      <div className="space-y-4">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1.5 ml-1">Full Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-[var(--text-on-light-faint)]" />
              </div>
              <input
                type="text"
                placeholder="Your Name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 3, message: "Name must be at least 3 characters long" }
                })}
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] transition-all outline-none placeholder-[var(--input-placeholder)]",
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)]"
                )}
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1.5 ml-1">Work Email *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-[var(--text-on-light-faint)]" />
              </div>
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
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] transition-all outline-none placeholder-[var(--input-placeholder)]",
                  errors.workEmail
                    ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)]"
                )}
              />
            </div>
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
            <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1.5 ml-1">Society Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building2 size={18} className="text-[var(--text-on-light-faint)]" />
              </div>
              <input
                type="text"
                placeholder="Lotus Panache"
                {...register('societyName', { required: 'Society Name is required' })}
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] transition-all outline-none placeholder-[var(--input-placeholder)]",
                  errors.societyName
                    ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)]"
                )}
              />
            </div>
            <AnimatePresence>
              {errors.societyName && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.societyName.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1.5 ml-1">Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone size={18} className="text-[var(--text-on-light-faint)]" />
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                {...register('phone', {
                  required: 'Phone Number is required',
                  minLength: { value: 10, message: "Phone Number must be at least 10 digits long" },
                  maxLength: { value: 10, message: "Phone Number must be at most 10 digits long" },
                  pattern: { value: /^[6-9]\d{9}$/, message: "Invalid Phone Number" }
                })}
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] transition-all outline-none placeholder-[var(--input-placeholder)]",
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)]"
                )}
              />
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.phone.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 3: Units & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1.5 ml-1">Total Units</label>
            <select
              {...register('unitCount')}
              className="w-full px-4 py-3 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-text)] focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] transition-all outline-none appearance-none"
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
            <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1.5 ml-1">Preferred Date</label>
            <input
              type="date"
              {...register('preferredDate')}
              className="w-full px-4 py-3 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-text)] focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] transition-all outline-none"
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
        className="w-full relative shadow-lg shadow-primary/20"
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

      <p className="text-center text-xs font-medium text-[var(--text-on-light-muted)] mt-4">
        By submitting, you agree to our Privacy Policy and Terms of Service.
      </p>
    </form>
  );
}
