import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Key, Eye, EyeOff, Loader2, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setCredentials } from '../store/slices/authSlice';
import { useRegisterMutation } from '../store/api/authApi';
import { cn } from '../utils/cn';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', secretKey: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      dispatch(setCredentials({ user: response.data }));
      navigate('/admin/leads');
    } catch (err) {
      // Error handled by RTK Query and displayed via error state
    }
  };

  return (
    <PageWrapper title="Admin Setup | Parapet" className="bg-[var(--paper)]">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-[var(--ink)] text-[var(--brass-light)] rounded-xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105">
                P
              </div>
              <span className="text-2xl font-bold tracking-tight text-[var(--ink)]">Parapet</span>
            </Link>

            <h1 className="text-3xl font-bold text-[var(--ink)] mb-2">Admin Setup</h1>
            <p className="text-[var(--text-muted)] font-medium">Initialize your secure platform access.</p>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
            {/* Top decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brass)] to-[var(--brass-light)]" />

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-start gap-3"
                >
                  <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error.data?.error || 'Registration failed. Please verify your details and secret key.'}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="name"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[var(--brass)] focus:ring-1 focus:ring-[var(--brass)] outline-none transition-all font-medium placeholder:text-slate-400"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="username"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[var(--brass)] focus:ring-1 focus:ring-[var(--brass)] outline-none transition-all font-medium placeholder:text-slate-400"
                    placeholder="admin@parapet.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Secure Password</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    autoComplete="new-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[var(--brass)] focus:ring-1 focus:ring-[var(--brass)] outline-none transition-all font-medium placeholder:text-slate-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Setup Secret Key</label>
                <p className="text-xs text-slate-500 mb-2">Check your .env file for ADMIN_REGISTRATION_SECRET</p>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showSecret ? "text" : "password"}
                    required
                    value={formData.secretKey}
                    onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                    autoComplete="off"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[var(--brass)] focus:ring-1 focus:ring-[var(--brass)] outline-none transition-all font-medium placeholder:text-slate-400 mono text-sm"
                    placeholder="Secret Key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brass"
                  className="w-full justify-center py-3.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" /> Setup Account
                    </span>
                  ) : (
                    "Complete Setup"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                Already have access? <Link to="/admin/login" className="text-[var(--brass)] font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
