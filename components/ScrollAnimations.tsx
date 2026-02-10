"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

/* ─── Fade-up on scroll into view ─── */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  y = 60,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger children on scroll ─── */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax wrapper (vertical shift on scroll) ─── */
export function Parallax({
  children,
  className = "",
  speed = 0.2,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Scale-in on scroll ─── */
export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Slide from left/right ─── */
export function SlideIn({
  children,
  className = "",
  direction = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const x = direction === "left" ? -80 : 80;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Blur fade in ─── */
export function BlurFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Text reveal character by character ─── */
export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.5,
              delay: delay + wi * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Horizontal scroll progress bar ─── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--success)] origin-left z-[100]"
    />
  );
}

/* ─── Magnetic hover effect ─── */
export function MagneticHover({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Multi-layer Parallax (for hero backgrounds) ─── */
export function ParallaxLayer({
  children,
  className = "",
  speed = 0.3,
  direction = "vertical",
  rotate = 0,
  scale: scaleRange,
  opacity: opacityRange,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
  rotate?: number;
  scale?: [number, number];
  opacity?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [speed * 150, speed * -150] : [0, 0]
  );
  const xRange = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal" ? [speed * 150, speed * -150] : [0, 0]
  );
  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, rotate]);
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange ? [scaleRange[0], 1, scaleRange[1]] : [1, 1, 1]
  );
  const opacityValue = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    opacityRange ? [opacityRange[0], 1, 1, opacityRange[1]] : [1, 1, 1, 1]
  );

  const smoothY = useSpring(yRange, { stiffness: 80, damping: 25 });
  const smoothX = useSpring(xRange, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{
        y: smoothY,
        x: smoothX,
        rotate: rotateRange,
        scale: scaleValue,
        opacity: opacityValue,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal Scroll Section (vertical scroll → horizontal movement) ─── */
export function HorizontalScrollSection({
  children,
  className = "",
  contentClassName = "",
  speed = 1,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const measure = () => {
        const totalWidth = scrollRef.current!.scrollWidth;
        const viewWidth = scrollRef.current!.offsetWidth;
        setScrollWidth(totalWidth - viewWidth);
      };
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth * speed]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 30 });

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${Math.max(200, scrollWidth * 0.6)}px` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x: smoothX }}
          className={`flex ${contentClassName}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Parallax Background (full-section depth parallax) ─── */
export function ParallaxBackground({
  children,
  className = "",
  intensity = 0.3,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [intensity * 200, intensity * -200]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
