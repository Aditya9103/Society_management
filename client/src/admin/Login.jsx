import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from '../components/ui/Button';
import { useLoginMutation } from '../store/api/authApi';
import { setCredentials, selectIsAdmin } from '../store/slices/authSlice';

export default function AdminLogin() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect to leads dashboard
  if (isAdmin) {
    return <Navigate to="/admin/leads" replace />;
  }

  const onSubmit = async (data) => {
    try {
      setErrorMsg('');
      const response = await login(data).unwrap();
      dispatch(setCredentials({ user: response.data }));
      navigate('/admin/leads');
    } catch (err) {
      setErrorMsg(err?.data?.error || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-dark)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-[var(--surface-dark-raised)] backdrop-blur-xl border border-[var(--line-on-dark)] p-8 rounded-3xl shadow-2xl relative">

          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--brass)] flex items-center justify-center shadow-[0_4px_16px_rgba(192,138,62,0.4)] mb-4">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-on-dark)] mb-1">Parapet Admin</h1>
            <p className="text-[var(--text-on-dark-muted)] text-sm">Sign in to manage society operations</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-on-dark)] mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="admin@parapet.com"
                autoComplete="username"
                {...register('email', { required: 'Email is required' })}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:bg-white/10 transition-all outline-none",
                  errors.email ? "border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-[var(--line-on-dark)] focus:border-[var(--brass)] focus:ring-4 focus:ring-[var(--brass)]/20"
                )}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-on-dark)] mb-1.5 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register('password', { required: 'Password is required' })}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:bg-white/10 transition-all outline-none",
                  errors.password ? "border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-[var(--line-on-dark)] focus:border-[var(--brass)] focus:ring-4 focus:ring-[var(--brass)]/20"
                )}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">{errors.password.message}</p>}
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 text-red-400 p-3 rounded-lg flex items-center gap-2 border border-red-500/20 text-sm font-medium"
                >
                  <AlertCircle size={16} /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="brass"
              className="w-full relative"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Sign in to Dashboard"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-[var(--text-on-dark-faint)]">
              Don't have an account? <Link to="/admin/register" className="text-[var(--brass)] font-bold hover:underline">Register</Link>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[rgba(244,245,241,0.4)]">
            <ShieldCheck size={14} />
            Secure Encrypted Connection
          </div>
        </div>
      </motion.div>
    </div>
  );
}
