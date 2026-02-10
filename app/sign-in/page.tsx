"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Github,
  Chrome,
} from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

/* ── Social button ── */
function SocialButton({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      type="button"
      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[var(--accent)]/20 transition-all duration-300 group"
    >
      <Icon className="w-4.5 h-4.5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
        {label}
      </span>
    </motion.button>
  );
}

/* ── Text input field ── */
function InputField({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  delay,
  showToggle,
  toggleVisible,
  onToggle,
}: {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  delay: number;
  showToggle?: boolean;
  toggleVisible?: boolean;
  onToggle?: () => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 tracking-wide uppercase">
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-300 ${
          focused
            ? "border-[var(--accent)]/50 bg-white/[0.04] shadow-[0_0_0_3px_rgba(113,103,234,0.08)]"
            : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12]"
        }`}
      >
        <Icon className="absolute left-3.5 w-4 h-4 text-[var(--text-tertiary)]" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pl-10 pr-10 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none font-[family-name:var(--font-inter)]"
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-200"
          >
            {toggleVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submit
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Social Logins */}
        <div className="flex gap-3">
          <SocialButton icon={Chrome} label="Google" delay={0.3} />
          <SocialButton icon={Github} label="GitHub" delay={0.4} />
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <span className="text-xs text-[var(--text-tertiary)] font-medium">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </motion.div>

        {/* Email */}
        <InputField
          icon={Mail}
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={setEmail}
          delay={0.5}
        />

        {/* Password */}
        <InputField
          icon={Lock}
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          delay={0.55}
          showToggle
          toggleVisible={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />

        {/* Remember & Forgot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <button
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className="flex items-center gap-2 group"
          >
            <div
              className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
                rememberMe
                  ? "bg-[var(--accent)] border-[var(--accent)]"
                  : "border-white/[0.15] group-hover:border-white/[0.25]"
              }`}
            >
              {rememberMe && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-xs text-[var(--text-secondary)]">
              Remember me
            </span>
          </button>
          <Link
            href="#"
            className="text-xs font-medium text-[var(--accent)] hover:text-[var(--secondary)] transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <button
            type="submit"
            disabled={loading}
            className="btn-primary btn-glow w-full text-sm flex items-center justify-center gap-2 !py-3.5 !rounded-xl group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </motion.div>

        {/* Sign up link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-center text-sm text-[var(--text-secondary)]"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[var(--accent)] hover:text-[var(--secondary)] transition-colors duration-200"
          >
            Create one
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  );
}
