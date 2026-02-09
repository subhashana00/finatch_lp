"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  TrendingUp,
  Wallet,
  Activity,
  PieChart,
  Zap,
  Bell,
  Search,
  Settings,
  ChevronDown,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Globe,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Layers,
  Shield,
  Banknote,
  Receipt,
  FileText,
  Target,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

/* ────────────────────────────────────────────────────────────────
   UTILITIES
   ──────────────────────────────────────────────────────────────── */

function useAnimatedNumber(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(Math.round(current * 100) / 100);
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return value;
}

function generateSparkline(points = 20, base = 50, variance = 20): number[] {
  const data: number[] = [];
  let current = base;
  for (let i = 0; i < points; i++) {
    current += (Math.random() - 0.45) * variance;
    current = Math.max(base - variance, Math.min(base + variance, current));
    data.push(current);
  }
  return data;
}

function toSVGPath(data: number[], width: number, height: number, padding = 2): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = padding + ((max - v) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");
}

/* ────────────────────────────────────────────────────────────────
   MINI COMPONENTS
   ──────────────────────────────────────────────────────────────── */

function SparklineSVG({
  data,
  width = 80,
  height = 32,
  color = "var(--accent)",
  filled = false,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
}) {
  const points = toSVGPath(data, width, height);
  return (
    <svg width={width} height={height} className="overflow-visible">
      {filled && (
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={color}
          fillOpacity={0.1}
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DonutChart({
  segments,
  size = 120,
  strokeWidth = 14,
}: {
  segments: { value: number; color: string; label: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulativeOffset = 0;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--glass-border)"
        strokeWidth={strokeWidth}
      />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dashLen = pct * circumference;
        const offset = cumulativeOffset;
        cumulativeOffset += dashLen;
        return (
          <motion.circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dashLen} ${circumference - dashLen}` }}
            transition={{ duration: 1, delay: 0.15 * i, ease: "easeOut" }}
          />
        );
      })}
    </svg>
  );
}

function AnimatedBar({
  height,
  delay,
  color = "var(--accent)",
  label,
  value,
}: {
  height: number;
  delay: number;
  color?: string;
  label?: string;
  value?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex-1 flex flex-col items-center gap-1 relative group">
      {hovered && value && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 bg-[#1a1a2e] border border-[var(--glass-border)] text-[10px] text-white px-2 py-0.5 rounded-md whitespace-nowrap z-10 font-mono"
        >
          {value}
        </motion.div>
      )}
      <div className="w-full flex items-end" style={{ height: "100%" }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full rounded-t-[4px] cursor-pointer transition-all duration-200"
          style={{
            background: hovered
              ? color
              : `linear-gradient(to top, ${color}66, ${color})`,
          }}
        />
      </div>
      {label && (
        <span className="text-[10px] text-[var(--text-secondary)] font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
    Completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: CheckCircle },
    Pending: { bg: "bg-amber-500/10", text: "text-amber-400", icon: Clock },
    Processing: { bg: "bg-[var(--accent)]/10", text: "text-[var(--accent)]", icon: RefreshCw },
    Failed: { bg: "bg-red-500/10", text: "text-red-400", icon: XCircle },
    Active: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: CheckCircle },
    Scheduled: { bg: "bg-amber-500/10", text: "text-amber-400", icon: Clock },
  };
  const c = config[status] || config.Pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${c.bg} ${c.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   DASHBOARD TAB
   ──────────────────────────────────────────────────────────────── */

function DashboardPreview() {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [refreshing, setRefreshing] = useState(false);

  const revenue = useAnimatedNumber(2847563);
  const users = useAnimatedNumber(14892);
  const transactions = useAnimatedNumber(98421);
  const avgValue = useAnimatedNumber(847.32);

  const sparklines = useMemo(
    () => ({
      revenue: generateSparkline(20, 70, 15),
      users: generateSparkline(20, 55, 12),
      transactions: generateSparkline(20, 60, 18),
      avg: generateSparkline(20, 45, 10),
    }),
    []
  );

  const chartData = useMemo(
    () => [
      { label: "Jan", value: 42, amount: "$186K" },
      { label: "Feb", value: 58, amount: "$245K" },
      { label: "Mar", value: 48, amount: "$198K" },
      { label: "Apr", value: 72, amount: "$312K" },
      { label: "May", value: 55, amount: "$238K" },
      { label: "Jun", value: 84, amount: "$368K" },
      { label: "Jul", value: 68, amount: "$294K" },
      { label: "Aug", value: 78, amount: "$342K" },
      { label: "Sep", value: 62, amount: "$268K" },
      { label: "Oct", value: 91, amount: "$402K" },
      { label: "Nov", value: 76, amount: "$328K" },
      { label: "Dec", value: 95, amount: "$418K" },
    ],
    []
  );

  const recentActivity = [
    { text: "Payment from Stripe connected", time: "2s ago", icon: Zap, color: "text-emerald-400" },
    { text: "Invoice #1847 auto-processed", time: "1m ago", icon: FileText, color: "text-[var(--accent)]" },
    { text: "Fraud alert resolved — safe", time: "3m ago", icon: Shield, color: "text-emerald-400" },
    { text: "Monthly report generated", time: "8m ago", icon: Download, color: "text-amber-400" },
  ];

  const donutSegments = [
    { value: 45, color: "#7167EA", label: "Subscriptions" },
    { value: 25, color: "#8B83EF", label: "Enterprise" },
    { value: 18, color: "#A59EF2", label: "One-time" },
    { value: 12, color: "#C4BFFA", label: "Other" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const metrics = [
    {
      label: "Total Revenue",
      value: `$${Math.round(revenue).toLocaleString()}`,
      change: "+12.5%",
      up: true,
      icon: Wallet,
      sparkline: sparklines.revenue,
    },
    {
      label: "Active Users",
      value: Math.round(users).toLocaleString(),
      change: "+8.2%",
      up: true,
      icon: Users,
      sparkline: sparklines.users,
    },
    {
      label: "Transactions",
      value: Math.round(transactions).toLocaleString(),
      change: "+24.1%",
      up: true,
      icon: CreditCard,
      sparkline: sparklines.transactions,
    },
    {
      label: "Avg. Value",
      value: `$${avgValue.toFixed(2)}`,
      change: "-2.3%",
      up: false,
      icon: PieChart,
      sparkline: sparklines.avg,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Dashboard Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-[var(--glass-border)] rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-secondary)]">Jan 1 – Dec 31, 2025</span>
            <ChevronDown className="w-3 h-3 text-[var(--text-secondary)]" />
          </div>
          <div className="flex items-center gap-1 bg-white/[0.03] border border-[var(--glass-border)] rounded-xl px-1 py-0.5">
            {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wide transition-all ${
                  selectedPeriod === p
                    ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/25"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-white/[0.03] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
          <button className="p-2 rounded-xl bg-white/[0.03] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent)]/90 transition-all shadow-lg shadow-[var(--accent)]/25">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4 hover:border-[var(--accent)]/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md ${
                      m.up
                        ? "text-emerald-400 bg-emerald-400/10"
                        : "text-red-400 bg-red-400/10"
                    }`}
                  >
                    {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {m.change}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold font-[family-name:var(--font-space)] text-white">
                    {m.value}
                  </span>
                  <SparklineSVG data={m.sparkline} width={72} height={28} color={m.up ? "#34d399" : "#f87171"} filled />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h4 className="text-sm font-semibold text-white">Revenue Overview</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Monthly revenue performance</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--text-secondary)]">Revenue</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]/40" />
                <span className="text-[var(--text-secondary)]">Target</span>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className="flex flex-col justify-between text-[10px] text-[var(--text-secondary)] font-mono pr-1"
              style={{ height: 176 }}
            >
              <span>$400K</span>
              <span>$300K</span>
              <span>$200K</span>
              <span>$100K</span>
              <span>$0</span>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((n) => (
                  <div key={n} className="border-b border-white/[0.04]" />
                ))}
              </div>
              <div className="flex items-end gap-1.5 relative" style={{ height: 176 }}>
                {chartData.map((bar, i) => (
                  <AnimatedBar
                    key={bar.label}
                    height={bar.value}
                    delay={0.04 * i}
                    label={bar.label}
                    value={bar.amount}
                    color="#7167EA"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Donut + Live Feed */}
        <div className="flex flex-col gap-3">
          <div className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white">Breakdown</h4>
              <MoreHorizontal className="w-4 h-4 text-[var(--text-secondary)]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <DonutChart segments={donutSegments} size={96} strokeWidth={10} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold font-[family-name:var(--font-space)] text-white">$2.8M</div>
                    <div className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">Total</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {donutSegments.map((seg) => (
                  <div key={seg.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                      <span className="text-[var(--text-secondary)]">{seg.label}</span>
                    </div>
                    <span className="text-white font-semibold font-mono">{seg.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xs font-semibold text-white">Live Activity</h4>
            </div>
            <div className="space-y-2.5">
              {recentActivity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-2.5"
                  >
                    <Icon className={`w-3.5 h-3.5 mt-0.5 ${a.color} shrink-0`} />
                    <div className="min-w-0">
                      <p className="text-xs text-white/80 leading-snug truncate">{a.text}</p>
                      <p className="text-[11px] text-[var(--text-secondary)]">{a.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   TRANSACTIONS TAB
   ──────────────────────────────────────────────────────────────── */

function TransactionsPreview() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "Credits", "Debits", "Pending"];

  const transactions = [
    { id: "TXN-4821", name: "Stripe Payment", from: "Acme Corp", amount: "+$12,450.00", status: "Completed", time: "2 min ago", type: "credit", method: "Wire" },
    { id: "TXN-4820", name: "AWS Services", from: "Amazon AWS", amount: "-$3,280.00", status: "Completed", time: "15 min ago", type: "debit", method: "Auto-pay" },
    { id: "TXN-4819", name: "Client Invoice #1847", from: "Tech Innovators", amount: "+$45,000.00", status: "Pending", time: "1 hr ago", type: "credit", method: "Invoice" },
    { id: "TXN-4818", name: "Payroll Batch", from: "Internal", amount: "-$128,500.00", status: "Processing", time: "2 hrs ago", type: "debit", method: "Batch" },
    { id: "TXN-4817", name: "Shopify Revenue", from: "Shopify Inc", amount: "+$8,920.00", status: "Completed", time: "3 hrs ago", type: "credit", method: "API" },
    { id: "TXN-4816", name: "Google Cloud", from: "Google LLC", amount: "-$1,842.00", status: "Completed", time: "5 hrs ago", type: "debit", method: "Auto-pay" },
    { id: "TXN-4815", name: "Consulting Fee", from: "GlobalTech", amount: "+$22,500.00", status: "Completed", time: "6 hrs ago", type: "credit", method: "Wire" },
  ];

  const filteredTx = transactions.filter((tx) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Credits") return tx.type === "credit";
    if (selectedFilter === "Debits") return tx.type === "debit";
    if (selectedFilter === "Pending") return tx.status === "Pending" || tx.status === "Processing";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === f
                  ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/25"
                  : "bg-white/[0.03] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white/[0.03] border border-[var(--glass-border)] rounded-xl px-3 py-1.5 w-full sm:w-auto">
          <Search className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <span className="text-xs text-[var(--text-secondary)]">Search transactions...</span>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl overflow-hidden">
        {/* Desktop table header */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-3 border-b border-[var(--glass-border)] text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Transaction</div>
          <div className="col-span-2">From</div>
          <div className="col-span-1">Method</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Time</div>
        </div>
        <div className="divide-y divide-[var(--glass-border)]">
          <AnimatePresence mode="popLayout">
            {filteredTx.map((tx, i) => (
              <motion.div
                key={tx.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-3">
                  <div className="col-span-1 text-[11px] font-mono text-[var(--text-secondary)]">
                    {tx.id.split("-")[1]}
                  </div>
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-400/10"
                      }`}
                    >
                      {tx.type === "credit" ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-white truncate">{tx.name}</span>
                  </div>
                  <div className="col-span-2 flex items-center text-xs text-[var(--text-secondary)] truncate">
                    {tx.from}
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span className="text-[10px] font-medium text-[var(--text-secondary)] bg-white/[0.04] px-1.5 py-0.5 rounded-md">
                      {tx.method}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span
                      className={`text-xs font-bold font-mono ${
                        tx.type === "credit" ? "text-emerald-400" : "text-white"
                      }`}
                    >
                      {tx.amount}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <StatusBadge status={tx.status} />
                  </div>
                  <div className="col-span-1 flex items-center justify-end text-[11px] text-[var(--text-secondary)]">
                    {tx.time}
                  </div>
                </div>
                {/* Mobile card */}
                <div className="md:hidden px-4 py-3 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-400/10"
                    }`}
                  >
                    {tx.type === "credit" ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white truncate">{tx.name}</span>
                      <span
                        className={`text-xs font-bold font-mono shrink-0 ml-2 ${
                          tx.type === "credit" ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {tx.amount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={tx.status} />
                      <span className="text-[11px] text-[var(--text-secondary)]">{tx.from}</span>
                      <span className="text-[11px] text-[var(--text-secondary)] ml-auto">{tx.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--glass-border)]">
          <span className="text-xs text-[var(--text-secondary)]">
            Showing {filteredTx.length} of {transactions.length} transactions
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-[11px] font-semibold transition-all ${
                  p === 1
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-white/5"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ANALYTICS TAB
   ──────────────────────────────────────────────────────────────── */

function AnalyticsPreview() {
  const areaData = useMemo(() => generateSparkline(30, 60, 20), []);
  const areaData2 = useMemo(() => generateSparkline(30, 45, 15), []);

  const kpis = [
    { label: "MRR", value: "$248K", change: "+23.4%", up: true, description: "Monthly recurring revenue" },
    { label: "ARR", value: "$2.98M", change: "+18.7%", up: true, description: "Annual run rate" },
    { label: "Churn", value: "0.8%", change: "-0.3%", up: true, description: "Monthly churn rate" },
    { label: "LTV:CAC", value: "8.2x", change: "+1.4x", up: true, description: "Lifetime value ratio" },
  ];

  const topChannels = [
    { name: "Direct API", value: 42, amount: "$1.2M" },
    { name: "Stripe Connect", value: 28, amount: "$784K" },
    { name: "Invoice Portal", value: 18, amount: "$504K" },
    { name: "Batch Import", value: 12, amount: "$336K" },
  ];

  const geoData = [
    { region: "North America", pct: 45, flag: "🇺🇸" },
    { region: "Europe", pct: 30, flag: "🇪🇺" },
    { region: "Asia Pacific", pct: 15, flag: "🌏" },
    { region: "Rest of World", pct: 10, flag: "🌍" },
  ];

  return (
    <div className="space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                {kpi.label}
              </span>
              <span className={`text-[11px] font-bold ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-xl font-bold font-[family-name:var(--font-space)] text-white">{kpi.value}</div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{kpi.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-white">Growth Trend</h4>
              <p className="text-xs text-[var(--text-secondary)]">Revenue vs. Target (30 days)</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--text-secondary)]">Actual</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[var(--text-secondary)]">Target</span>
              </span>
            </div>
          </div>
          <svg width="100%" height={140} viewBox="0 0 400 140" preserveAspectRatio="none" className="overflow-visible">
            {[0, 35, 70, 105, 140].map((y) => (
              <line key={y} x1={0} y1={y} x2={400} y2={y} stroke="var(--glass-border)" />
            ))}
            <motion.polygon
              points={`0,140 ${toSVGPath(areaData2, 400, 140)} 400,140`}
              fill="#34d399"
              fillOpacity={0.05}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.polyline
              points={toSVGPath(areaData2, 400, 140)}
              fill="none"
              stroke="#34d399"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.polygon
              points={`0,140 ${toSVGPath(areaData, 400, 140)} 400,140`}
              fill="#7167EA"
              fillOpacity={0.1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.polyline
              points={toSVGPath(areaData, 400, 140)}
              fill="none"
              stroke="#7167EA"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
          </svg>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-3">
          <div className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-white mb-3">Top Channels</h4>
            <div className="space-y-2.5">
              {topChannels.map((ch, i) => (
                <div key={ch.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[var(--text-secondary)]">{ch.name}</span>
                    <span className="text-white font-semibold font-mono">{ch.amount}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.value}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/60"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4 flex-1">
            <h4 className="text-xs font-semibold text-white mb-3">Revenue by Region</h4>
            <div className="space-y-2">
              {geoData.map((g) => (
                <div key={g.region} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span>{g.flag}</span>
                    <span className="text-[var(--text-secondary)]">{g.region}</span>
                  </div>
                  <span className="text-white font-semibold font-mono">{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   AUTOMATION TAB
   ──────────────────────────────────────────────────────────────── */

function AutomationPreview() {
  const workflows = [
    {
      name: "Invoice Processing",
      description: "Auto-process incoming invoices via OCR",
      status: "Active",
      runs: "2,847",
      success: "99.9%",
      lastRun: "2 min ago",
      icon: Receipt,
      trigger: "On receive",
    },
    {
      name: "Fraud Detection",
      description: "ML-powered transaction screening",
      status: "Active",
      runs: "12,483",
      success: "100%",
      lastRun: "Just now",
      icon: Shield,
      trigger: "Real-time",
    },
    {
      name: "Payroll Automation",
      description: "Monthly salary disbursement pipeline",
      status: "Active",
      runs: "156",
      success: "99.8%",
      lastRun: "3 days ago",
      icon: Banknote,
      trigger: "Scheduled",
    },
    {
      name: "Report Generation",
      description: "Weekly financial summary reports",
      status: "Scheduled",
      runs: "892",
      success: "100%",
      lastRun: "1 week ago",
      icon: FileText,
      trigger: "Weekly",
    },
    {
      name: "Compliance Check",
      description: "Regulatory compliance validation",
      status: "Active",
      runs: "5,291",
      success: "100%",
      lastRun: "5 min ago",
      icon: Target,
      trigger: "On change",
    },
  ];

  const stats = [
    { label: "Total Runs", value: "21,669", icon: Activity },
    { label: "Success Rate", value: "99.94%", icon: CheckCircle },
    { label: "Time Saved", value: "1,842 hrs", icon: Clock },
    { label: "Active Flows", value: "4 / 5", icon: Zap },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-lg font-bold font-[family-name:var(--font-space)] text-white">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold">{s.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Workflow Cards */}
      <div className="space-y-2">
        {workflows.map((wf, i) => {
          const Icon = wf.icon;
          return (
            <motion.div
              key={wf.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-4 hover:border-[var(--accent)]/20 hover:bg-white/[0.03] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-semibold text-white truncate">{wf.name}</h5>
                      <StatusBadge status={wf.status} />
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{wf.description}</p>
                  </div>
                </div>
                {/* Desktop detail columns */}
                <div className="hidden md:flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-white font-mono">{wf.runs}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">runs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400 font-mono">{wf.success}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">success</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[var(--text-secondary)]">{wf.lastRun}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">last run</div>
                  </div>
                  <span className="text-[10px] font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-lg">
                    {wf.trigger}
                  </span>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-secondary)] hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Mobile workflow stats row */}
              <div className="md:hidden mt-2 flex items-center gap-3 text-[11px]">
                <span className="text-[var(--text-secondary)]">{wf.runs} runs</span>
                <span className="text-emerald-400 font-semibold">{wf.success}</span>
                <span className="text-[var(--text-secondary)]">{wf.lastRun}</span>
                <span className="text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-md font-medium ml-auto">
                  {wf.trigger}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: wf.success }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-400"
                  />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">{wf.success}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN EXPORT
   ──────────────────────────────────────────────────────────────── */

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "automation", label: "Automation", icon: Zap },
];

const previews: Record<string, () => JSX.Element> = {
  dashboard: DashboardPreview,
  transactions: TransactionsPreview,
  analytics: AnalyticsPreview,
  automation: AutomationPreview,
};

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("dashboard");

  const ActivePreview = previews[activeTab];

  return (
    <section id="product" ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-glow-accent opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--accent)]/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6"
          >
            <Eye className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">Live Preview</span>
          </motion.div>
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            See Finatch in <span className="gradient-text">Action</span>
          </h2>
          <p className="section-subheading mt-4 max-w-2xl mx-auto">
            Explore our intuitive dashboard designed for speed, clarity, and actionable insights — all powered by real-time data
          </p>
        </ScrollReveal>

        {/* Browser Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-b from-[var(--accent)]/20 via-[var(--accent)]/5 to-transparent rounded-3xl blur-xl pointer-events-none" />

          <div className="relative bg-[#0a0a0f] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Browser Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/[0.04] rounded-lg px-3 py-1 sm:min-w-[180px] md:min-w-[280px]">
                  <div className="w-3 h-3 rounded-full border border-emerald-400/60 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono">app.finatch.io/dashboard</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="relative p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-secondary)] transition-colors">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-secondary)] transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center text-[10px] font-bold text-white">
                  JD
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 px-4 py-2 bg-white/[0.015] border-b border-white/[0.06] overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-[var(--accent)]/15 border border-[var(--accent)]/25 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-[var(--accent)]" : ""}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-5 lg:p-6 min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivePreview />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
        >
          {[
            { icon: Shield, text: "Bank-grade encryption" },
            { icon: Zap, text: "< 50ms response" },
            { icon: Globe, text: "99.99% uptime SLA" },
            { icon: Sparkles, text: "AI-powered insights" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-xs font-medium">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
