"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Check,
  Github,
  Chrome,
  ShieldCheck,
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

/* ── Password strength meter ── */
function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { label: "Weak", color: "bg-red-400" },
      { label: "Fair", color: "bg-amber-400" },
      { label: "Good", color: "bg-[var(--accent)]" },
      { label: "Strong", color: "bg-green-400" },
    ];

    return { score, ...levels[Math.min(score, 4) - 1] };
  }, [password]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="space-y-1.5 mt-2"
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              level <= strength.score
                ? strength.color
                : "bg-white/[0.06]"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] text-[var(--text-tertiary)]">
        Password strength:{" "}
        <span
          className={`font-medium ${
            strength.score <= 1
              ? "text-red-400"
              : strength.score === 2
              ? "text-amber-400"
              : strength.score === 3
              ? "text-[var(--accent)]"
              : "text-green-400"
          }`}
        >
          {strength.label}
        </span>
      </p>
    </motion.div>
  );
}

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submit
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
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

        {/* Full Name */}
        <InputField
          icon={User}
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChange={setFullName}
          delay={0.5}
        />

        {/* Email */}
        <InputField
          icon={Mail}
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={setEmail}
          delay={0.55}
        />

        {/* Password */}
        <div>
          <InputField
            icon={Lock}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={setPassword}
            delay={0.6}
            showToggle
            toggleVisible={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <PasswordStrength password={password} />
        </div>

        {/* Password requirements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { label: "8+ characters", met: password.length >= 8 },
            { label: "Uppercase letter", met: /[A-Z]/.test(password) },
            { label: "Number", met: /[0-9]/.test(password) },
            { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
          ].map((req) => (
            <div
              key={req.label}
              className="flex items-center gap-1.5"
            >
              <div
                className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  req.met
                    ? "bg-[var(--accent)]"
                    : "bg-white/[0.06]"
                }`}
              >
                {req.met && <Check className="w-2 h-2 text-white" />}
              </div>
              <span
                className={`text-[11px] transition-colors duration-300 ${
                  req.met
                    ? "text-[var(--text-secondary)]"
                    : "text-[var(--text-tertiary)]"
                }`}
              >
                {req.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            type="button"
            onClick={() => setAgreeTerms(!agreeTerms)}
            className="flex items-start gap-2.5 group text-left"
          >
            <div
              className={`w-4 h-4 mt-0.5 rounded border transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                agreeTerms
                  ? "bg-[var(--accent)] border-[var(--accent)]"
                  : "border-white/[0.15] group-hover:border-white/[0.25]"
              }`}
            >
              {agreeTerms && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
              I agree to the{" "}
              <Link
                href="#"
                className="text-[var(--accent)] hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-[var(--accent)] hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>
            </span>
          </button>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <button
            type="submit"
            disabled={loading || !agreeTerms}
            className="btn-primary btn-glow w-full text-sm flex items-center justify-center gap-2 !py-3.5 !rounded-xl group disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </motion.div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex items-center justify-center gap-2 text-[var(--text-tertiary)]"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]/50" />
          <span className="text-[11px]">
            256-bit SSL encryption · SOC 2 certified
          </span>
        </motion.div>

        {/* Sign in link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-[var(--text-secondary)]"
        >
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[var(--accent)] hover:text-[var(--secondary)] transition-colors duration-200"
          >
            Sign in
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  );
}
