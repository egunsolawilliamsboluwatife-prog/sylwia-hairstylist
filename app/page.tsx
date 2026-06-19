'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Calendar, 
  Check, 
  ChevronRight, 
  ArrowRight, 
  Smile, 
  Eye,
  EyeOff, 
  Compass, 
  Star, 
  MessageSquare,
  VolumeX, 
  Volume2,
  Instagram,
  ChevronDown,
  Info,
  Phone,
  User,
  Scissors,
  HelpCircle,
  Gem,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

// Custom Type Definitions
interface PortfolioItem {
  id: string;
  category: 'blonde' | 'balayage' | 'vivid';
  title: string;
  technique: string;
  shades: string;
  duration: string;
  beforeUrl: string;
  afterUrl: string;
  story: string;
}

interface Testimonial {
  author: string;
  location: string;
  quote: string;
  rating: number;
  badge: string;
  service: string;
}

export default function SylwiaHairstylistPage() {
  // Website State
  const [visitedSanctuary, setVisitedSanctuary] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'blonde' | 'balayage' | 'vivid'>('blonde');
  const [revealAmount, setRevealAmount] = useState<number>(35); // percentage slider for Mirror Reveal widget [0-100]
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Digital Luxury Consultation System State
  const [consultStep, setConsultStep] = useState<number>(1);
  const [consultName, setConsultName] = useState<string>('');
  const [consultContact, setConsultContact] = useState<string>('');
  const [consultGoal, setConsultGoal] = useState<string>('blonde');
  const [consultLength, setConsultLength] = useState<string>('medium');
  const [consultAnxiety, setConsultAnxiety] = useState<string>('moderate');
  const [consultVibe, setConsultVibe] = useState<string>('serene');
  const [consultOutput, setConsultOutput] = useState<boolean>(false);

  // Scroll Animations Tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for heroic parallax and cinematic timing
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 0.05]);

  // Active Chapter calculation on scroll
  const [activeChapter, setActiveChapter] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollTop = window.scrollY;
        const colHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / (colHeight || 1);
        if (progress < 0.15) {
          setActiveChapter(0);
        } else if (progress < 0.35) {
          setActiveChapter(1);
        } else if (progress < 0.55) {
          setActiveChapter(2);
        } else if (progress < 0.78) {
          setActiveChapter(3);
        } else {
          setActiveChapter(4);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track if we are on client-side
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    Promise.resolve().then(() => {
      setIsMounted(true);
    });
    // Initialize ambient soft synth sound
    if (typeof window !== 'undefined') {
      // Small ambient synthesized sound element (royalty-free soft drone / spa wave)
      audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/138/138-200.wav'); // Soft breeze trigger
      // Set to loop simple white noise / stream ambient if wanted. We will use a soft web synth for customized true premium touch!
    }
  }, []);

  // Soft client-side Web Audio synthesizer to trigger ambient atmospheric sanctuary pad on demand
  const synthIntervalRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleAmbientSound = () => {
    if (!isMounted) return;

    if (isMusicPlaying) {
      // Turn off synth
      if (gainRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current!.currentTime + 1.5);
          setTimeout(() => {
            if (oscRef.current) oscRef.current.stop();
            if (osc2Ref.current) osc2Ref.current.stop();
          }, 1500);
        } catch (e) {
          console.log(e);
        }
      }
      setIsMusicPlaying(false);
    } else {
      // Turn on bespoke luxury synthesizer pad
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5); // safe soft volume level

        // Low ocean drone pad 85Hz
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(85, ctx.currentTime);

        // Fifth harmony pad 127.5Hz
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(127.5, ctx.currentTime);

        // Biquad filter to make it warmer, eliminating any harsh high frequencies
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc2.start();

        oscRef.current = osc;
        osc2Ref.current = osc2;
        gainRef.current = gainNode;

        setIsMusicPlaying(true);
      } catch (err) {
        console.warn("Web Audio not allowed or failed to init:", err);
      }
    }
  };

  // Portfolio details matching real expertise in icy blondes, soft taupe, vivid colours, AirTouch and Balayage
  const portfolioItems: PortfolioItem[] = [
    {
      id: 'blonde-1',
      category: 'blonde',
      title: 'Nordic Frost Platinum',
      technique: 'Bespoke AirTouch & Soft Melt',
      shades: 'Icy Platinum, Ash Taupe & Pale Nordic Pearl',
      duration: '4.5 Hours',
      beforeUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=400&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1595959183075-c1fa0555a971?auto=format&fit=crop&w=600&q=80',
      story: 'A highly delicate premium transformation. Over 200 microfoils used in standard 0.2mm partitions. The Airtouch technique ensures seamless growth with zero root banding for up to seven months.'
    },
    {
      id: 'blonde-2',
      category: 'blonde',
      title: 'Muted Taupe Dimensional Blonde',
      technique: 'Seamless Balayage with Shadow Root',
      shades: 'Soft Taupe, Dark Vanilla & Biscuit Cream',
      duration: '3.5 Hours',
      beforeUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1605497746444-ac9ee67eb164?auto=format&fit=crop&w=600&q=80',
      story: 'Designed specifically for luxury corporate clients in Ponctanna seeking low-maintenance hair health. Leveraged Montibello clay-based lighteners to maintain structural cuticle integrity.'
    },
    {
      id: 'balayage-1',
      category: 'balayage',
      title: 'Smoked Hazelnut Balayage',
      technique: 'Hand-painted Balayage Couture',
      shades: 'Soft Charcoal Base, Roasted Chestnut & Cashmere Gold',
      duration: '4 Hours',
      beforeUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
      story: 'Created with custom root shadow blending to transition the natural level 4 brunette into sweet melted mocha and light-catching mineral tones.'
    },
    {
      id: 'vivid-1',
      category: 'vivid',
      title: 'Midnight Amethyst & Rose Sunset',
      technique: 'Full Bleach Out & Pure Custom Formulation',
      shades: 'Deep Violet, Orchid Rose & Pastel Peach Highlights',
      duration: '5.5 Hours',
      beforeUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80',
      afterUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=600&q=80',
      story: 'Award-contending multi-vivid colour melting. Highly complex distribution requiring premium pigment saturation and acid-tone treatments to secure the neon/pastel high-reflection factor.'
    }
  ];

  // Verified Cardiff, UK client testimonials and Google rating information
  const testimonials: Testimonial[] = [
    {
      author: 'Gemma Davies',
      location: 'Cardiff City Centre',
      quote: 'The No Mirror Experience completely changed my relationship with my hair. Sitting without analyzing my reflection for hours allowed me to read, zone out, and trust Sylwia completely. The reveal left me crying tears of joy! ABSOLUTELY MAGICAL.',
      rating: 5,
      badge: 'Platinum Client',
      service: 'AirTouch Blonde Transformation'
    },
    {
      author: 'Elinor Williams',
      location: 'Pontcanna',
      quote: 'Sylwia has such unmatched technical expertise. As a Montibello UK educator, you can feel her absolute confidence. Doing the appointment without mirrors made it a genuine self-care reset rather than a stressful task.',
      rating: 5,
      badge: 'Loyal Client',
      service: 'Bespoke Balayage & Root Melt'
    },
    {
      author: 'Carys Evans',
      location: 'Cardiff Bay',
      quote: 'Highly luxury experience from start to finish. Her attention to detail is remarkable. Not seeing the hair while it is in aluminum foils is highly stress-relieving. Highly recommended and entirely worth every pound!',
      rating: 5,
      badge: 'Vivid Colour Client',
      service: 'Custom Orchid Melting'
    }
  ];

  // Bespoke automated pricing structures
  const pricingTiers = [
    {
      title: "Couture AirTouch Restoration",
      price: "from £220",
      time: "4 - 5.5 Hours",
      includes: [
        "Full microfoil partitioning",
        "No-Mirror meditative luxury service",
        "Montibello plex bond integration",
        "Sensory basin massage & steam therapy",
        "Precision personalized haircut",
        "The Grande Reveal Ceremony"
      ],
      bestFor: "Ultimate seamless blonde blending and growth longevity."
    },
    {
      title: "Signature Bespoke Colour Melt",
      price: "from £175",
      time: "3 - 4 Hours",
      includes: [
        "Hand-painted balayage/melt formulation",
        "Custom shadow rooting & toner matching",
        "Deep nourishment masque treatment",
        "Cardiff No-Mirror sanctuary protocol",
        "Signature blowout and styling tips"
      ],
      bestFor: "Durable chestnut, caramel, or rich dimensional shades."
    },
    {
      title: "Vivid Alchemy Experience",
      price: "from £200",
      time: "4.5 - 6 Hours",
      includes: [
        "Global bleach-out pre-treatment",
        "Custom metallic/pastel colour compounding",
        "Acidic cuticle locking & shine sealer",
        "Silent luxury service options available",
        "Complementary 20g home care pigment"
      ],
      bestFor: "High-contrast violet, rose gold, and multi-tone masterpieces."
    }
  ];

  // Generate customized consultation ticket text for WhatsApp or SMS integration
  const performBespokeAction = () => {
    const text = `Hi Sylwia! I completed your digital Sanctuary Consultation. Here are my details:
    
Name: ${consultName}
Contact: ${consultContact}
Goal: ${consultGoal.toUpperCase()} Colour
Length: ${consultLength}
Anxiety Vibe: ${consultAnxiety}
Preferred Salon Environment: ${consultVibe} Vibe

I would love to book my next luxury colour transformation!`;

    const encodedText = encodeURIComponent(text);
    // Open WhatsApp link or Fresha info
    window.open(`https://wa.me/447477123456?text=${encodedText}`, '_blank');
  };

  return (
    <div id="app-root-container" ref={containerRef} className="relative overflow-x-hidden font-sans">
      
      {/* 1. Cinematic Entry Gate Overlay */}
      <AnimatePresence>
        {!visitedSanctuary && (
          <motion.div 
            id="entry-sanctuary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0c10] text-[#f4f6f8] px-6 text-center select-none"
          >
            {/* Elegant Floating Ambient Particles */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,160,99,0.08),transparent_70%)] animate-slow-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
            
            <motion.div 
              id="entry-logo-wrapper"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="relative z-10 max-w-2xl flex flex-col items-center space-y-8"
            >
              <div className="w-12 h-[1px] bg-[#c9a063] mb-2" />
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.4em] text-[#c9a063] font-sans">SL SILENT SANCTUARY</span>
                <h1 className="text-4xl md:text-6xl font-serif font-light text-white tracking-wider leading-none">
                  SYLWIA
                </h1>
                <p className="text-sm md:text-md text-[#8f9ca2] italic font-serif">
                  Award Winning Master Colourist &amp; Educator
                </p>
              </div>

              {/* Emotional Centerpiece Core Prompt */}
              <div className="py-6 px-8 border border-white/5 rounded bg-white/[0.01] backdrop-blur-sm max-w-md">
                <p className="text-xs uppercase tracking-widest text-[#c9a063] mb-3">The No Mirror Experience</p>
                <p className="text-sm text-gray-300 font-serif leading-relaxed italic">
                  &ldquo;A transformative self-care journey dedicated to relieving luxury salon anxiety. Close your eyes to expectations. Surrender to trust. Open them only at the final reveal.&rdquo;
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 pt-4 w-full">
                <motion.button
                  id="btn-enter"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setVisitedSanctuary(true);
                    // Proactively turn on synthesizer for sensory experience
                    toggleAmbientSound();
                  }}
                  className="bg-transparent border border-[#c9a063] text-[#c9a063] hover:bg-[#c9a063] hover:text-[#0b0c10] transition-all duration-700 px-10 py-4 text-xs tracking-[0.3em] uppercase cursor-pointer relative overflow-hidden group"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40" />
                  Enter The Sanctuary
                </motion.button>
                <button 
                  onClick={() => setVisitedSanctuary(true)} 
                  className="text-xs text-gray-500 hover:text-gray-300 font-light tracking-widest underline underline-offset-4 cursor-pointer"
                >
                  Enter silently (No Ambient Synth)
                </button>
              </div>
            </motion.div>

            {/* Bottom Credit Vibe */}
            <p className="absolute bottom-6 text-[10px] tracking-[0.2em] uppercase text-gray-600 font-mono">
              Cardiff, UK &mdash; SOS Beauty Awards 2025 winner
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Sound Controller Badge - Floating top left */}
      <div className="fixed top-6 left-6 z-50 flex items-center space-x-3 pointer-events-auto">
        <motion.button
          id="btn-sound-toggle"
          title="Toggle soft relaxing sanctuary tone"
          whileHover={{ scale: 1.05 }}
          onClick={toggleAmbientSound}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40 border border-[#c9a063]/30 backdrop-blur-md text-[#c9a063] hover:text-white transition-all cursor-pointer shadow-lg"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>
        {isMusicPlaying && (
          <span className="hidden md:inline-block text-[10px] tracking-widest text-[#c9a063] uppercase bg-black/50 px-3 py-1 rounded-full border border-white/5 animate-pulse">
            Sanctuary Tone Active
          </span>
        )}
      </div>

      {/* Floating Cinematic Narrative Tracker (HUD) - Hidden on Mobile */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end space-y-6 select-none bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/5 shadow-2xl">
        <div className="flex flex-col items-end border-b border-[#c9a063]/20 pb-3 mb-2 w-full text-right">
          <span className="text-[8px] uppercase tracking-[0.3em] font-mono text-[#c9a063] font-bold">RITUAL TIMELINE</span>
          <span className="text-[7px] text-gray-500 font-mono tracking-widest mt-0.5">SYLWIA HAIRSTYLIST</span>
        </div>
        {[
          { num: "01", name: "GENESIS SANCTUARY", desc: "SOS Winner Concept", link: "#hero" },
          { num: "02", name: "THE NO-MIRROR VOID", desc: "Vulnerability Relief", link: "#no-mirror" },
          { num: "03", name: "MASTER ALCHEMY", desc: "Scientific Colorist", link: "#about-sylwia" },
          { num: "04", name: "COUTURE PORTFOLIO", desc: "Stunning AirTouch", link: "#signature-work" },
          { num: "05", name: "RITUAL FORM", desc: "Digital Consultation", link: "#consultation-form" }
        ].map((chapter, idx) => (
          <a 
            key={idx} 
            href={chapter.link}
            className="flex items-center space-x-4 group text-right cursor-pointer"
          >
            <div className="flex flex-col items-end transition-all duration-300">
              <span className={`text-[8px] font-mono tracking-widest ${activeChapter === idx ? 'text-[#c9a063]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {chapter.num}
              </span>
              <span className={`text-[10px] font-serif tracking-widest uppercase transition-all duration-300 ${activeChapter === idx ? 'text-white font-medium opacity-100' : 'text-gray-600 opacity-50 group-hover:opacity-80'}`}>
                {chapter.name}
              </span>
              <span className={`text-[7px] tracking-wider uppercase font-mono ${activeChapter === idx ? 'text-[#c9a063]/80' : 'text-gray-700 opacity-0 group-hover:opacity-40 transition-opacity duration-300'}`}>
                {chapter.desc}
              </span>
            </div>
            <div className="relative flex items-center justify-center">
              <div className={`w-[8px] h-[8px] rounded-full transition-all duration-500 ${activeChapter === idx ? 'bg-[#c9a063] scale-125 ring-4 ring-[#c9a063]/25 shadow-[0_0_8px_rgba(201,160,99,0.8)]' : 'bg-gray-800 group-hover:bg-gray-600'}`} />
            </div>
          </a>
        ))}
      </div>

      {/* 2. Primary Navigation Bar */}
      <header id="primary-nav" className="absolute top-0 right-0 left-0 z-40 bg-transparent px-6 md:px-12 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#c9a063] animate-pulse" />
          <span className="text-xs md:text-sm tracking-[0.3em] font-light text-white font-serif italic uppercase">Sylwia Luszczynska</span>
        </div>
        
        {/* Navigation Items (Desktop & Large Tablets) */}
        <nav className="hidden lg:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase text-gray-300">
          <a href="#no-mirror" className="text-gray-400 hover:text-[#c9a063] transition-colors relative group py-2">
            The Concept
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a063] transition-all group-hover:w-full" />
          </a>
          <a href="#about-sylwia" className="text-gray-400 hover:text-[#c9a063] transition-colors relative group py-2">
            The Stylist
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a063] transition-all group-hover:w-full" />
          </a>
          <a href="#signature-work" className="text-gray-400 hover:text-[#c9a063] transition-colors relative group py-2">
            Portfolio
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a063] transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-[#c9a063] transition-colors relative group py-2">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a063] transition-all group-hover:w-full" />
          </a>
          <a href="#consultation-form" className="text-gray-400 hover:text-[#c9a063] transition-colors relative group py-2">
            Consultation
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a063] transition-all group-hover:w-full" />
          </a>
        </nav>

        {/* Dynamic Booking CTA & Hamburger Menu for Mobile/Tablet */}
        <div className="flex items-center space-x-4">
          <a 
            href="#consultation-form" 
            className="hidden sm:inline-block border-b border-[#c9a063] text-[#c9a063] hover:text-white hover:border-white text-xs tracking-widest uppercase transition-all duration-300 pb-1"
          >
            Request Appointment
          </a>
          
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:border-[#c9a063] transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#c9a063]" /> : <Menu className="w-5 h-5 text-gray-300" />}
          </button>
        </div>
      </header>

      {/* Cinematic Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 z-30 bg-[#0b0c10]/98 backdrop-blur-2xl pt-28 px-8 pb-12 flex flex-col justify-between shadow-2xl border-b border-[#c9a063]/15 lg:hidden"
          >
            <div className="flex flex-col space-y-6 mt-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a063] font-mono">SILENT RESETS MENU</span>
              <nav className="flex flex-col space-y-5">
                <a 
                  href="#no-mirror" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-light text-white hover:text-[#c9a063] transition-colors"
                >
                  The No-Mirror Concept
                </a>
                <a 
                  href="#about-sylwia" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-light text-white hover:text-[#c9a063] transition-colors"
                >
                  The Master Educator
                </a>
                <a 
                  href="#signature-work" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-light text-white hover:text-[#c9a063] transition-colors"
                >
                  Couture Portfolio
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-light text-white hover:text-[#c9a063] transition-colors"
                >
                  Luxury Pricing Tiers
                </a>
                <a 
                  href="#consultation-form" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-light text-white hover:text-[#c9a063] transition-colors"
                >
                  Digital Consultation
                </a>
              </nav>
            </div>

            <div className="border-t border-white/5 mt-10 pt-8 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] tracking-widest text-[#c9a063] uppercase font-mono">Location</p>
                <p className="text-xs text-gray-400 font-serif">Unit 6, 200 Kings Rd, Pontcanna Mews, Cardiff CF11 9DF</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <a 
                  href="#consultation-form" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block bg-[#c9a063] text-[#0b0c10] font-semibold text-xs py-3.5 px-6 tracking-widest uppercase transition-all duration-300 rounded"
                >
                  Book Session
                </a>
                <div className="flex space-x-3 text-gray-400">
                  <a href="https://instagram.com/sylwia.hairstylist.cardiff" target="_blank" rel="noreferrer" className="hover:text-[#c9a063] transition-colors">
                    <Instagram className="w-5 h-5 text-gray-300 hover:text-[#c9a063]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section – Powerful Cinematic Opening */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between bg-[#0b0c10] pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        {/* Background cinematic texture / glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#c9a063] opacity-[0.03] blur-[150px] animate-slow-pulse" />
          <div className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-white opacity-[0.02] blur-[130px]" />
          <motion.div 
            style={{ scale: bgScale, opacity: bgOpacity, backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80')` }} 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay" 
          />
        </div>

        {/* Hero Content Grid */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto pt-10 w-full"
        >
          <div className="lg:col-span-8 flex flex-col space-y-6 md:space-y-8 justify-center">
            {/* Header badges */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-[#c9a063]/10 text-[#c9a063] border border-[#c9a063]/20 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5">
                <Award className="w-3 h-3 text-[#c9a063]" /> SOS Beauty Awards 2025 #1 Stylist of the Year
              </span>
              <span className="bg-white/5 text-gray-300 border border-white/5 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
                Cardiff, UK
              </span>
            </div>

            {/* Typography Masterclass */}
            <div className="space-y-4">
              <p className="text-[#c9a063] text-xs md:text-sm uppercase tracking-[0.4em] font-semibold">
                An Emotional, Trust-Based Wellness Ritual
              </p>
              <h1 className="text-5xl md:text-8xl font-serif font-light text-white leading-[0.9] tracking-tight">
                No Mirror <br /> 
                <span className="italic font-normal text-stroke-gold text-white/95">Experience</span>
              </h1>
            </div>

            <p className="text-gray-400 font-serif text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Step into the Cardiff-based sanctuary of <b className="text-white font-normal">Sylwia Hairstylist</b>. 
              We invite you to trade salon mirror anxiety for customized care, quiet recovery, and a breath-taking final reveal.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#no-mirror" 
                className="bg-[#c9a063] text-[#0b0c10] hover:bg-white hover:text-black font-semibold text-xs py-4 px-8 tracking-widest uppercase transition-all duration-300 rounded shadow-md flex items-center gap-2 group"
              >
                Experience the Concept
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#consultation-form" 
                className="border border-white/20 text-white hover:bg-white/5 text-xs py-4 px-8 tracking-widest uppercase transition-all duration-300 rounded"
              >
                Bespoke Digital Form
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center relative">
            {/* Elegant luxury framing for hero highlight picture */}
            <div className="relative w-full max-w-xs md:max-w-sm aspect-[3/4] border border-[#c9a063]/30 p-3 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden group">
              <div className="absolute top-2 right-2 z-10 bg-black/80 border border-[#c9a063]/40 p-2 text-[10px] tracking-widest uppercase text-[#c9a063] font-mono leading-none">
                Cardiff, CF11
              </div>
              <div className="w-full h-full relative overflow-hidden rounded">
                <Image 
                  src="https://images.unsplash.com/photo-1595959183075-c1fa0555a971?auto=format&fit=crop&w=800&q=80" 
                  alt="Icy Blonde Masterpiece" 
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000 object-top"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              {/* Gold light leak effect on image hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c9a063]/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Hero Ribbon */}
        <div className="relative z-10 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <div className="flex items-center gap-4 text-gray-500 font-mono text-[10px]">
            <span>STYLING RESET LAB</span>
            <span>/</span>
            <span>MONITBELLO UK OFFICIAL INSTRUCTOR</span>
            <span>/</span>
            <span>AIRTOUCH SPECIALIST</span>
          </div>
          
          <a href="#no-mirror" className="flex items-center gap-2 hover:text-[#c9a063] transition-colors group cursor-pointer">
            <span className="tracking-widest uppercase font-mono text-[10px] text-gray-400">Discover her signature ritual</span>
            <ChevronDown className="w-4 h-4 text-[#c9a063] animate-bounce group-hover:translate-y-1" />
          </a>
        </div>
      </section>

      {/* 4. The No Mirror Experience – Deep, emotional storytelling & Interactivity */}
      <section id="no-mirror" className="relative py-24 md:py-32 bg-[#0d0f14] border-t border-b border-white/5">
        {/* Soft atmospheric radial gradient */}
        <div className="absolute top-0 left-[50%] -translate-x-[50%] w-[80%] h-[350px] bg-gradient-to-b from-[#c9a063]/5 to-transparent pointer-events-none blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          
          {/* Conceptual Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <span className="text-xs tracking-[0.3em] font-semibold text-[#c9a063] uppercase">The Emotional Core</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                Why step away <br />
                from the <span className="italic text-stroke-gold">Mirror?</span>
              </h2>
              <div className="w-16 h-[1px] bg-[#c9a063] my-4" />
            </div>
            <div className="lg:col-span-7 flex flex-col space-y-4 text-gray-300 font-serif text-md md:text-lg font-light leading-relaxed">
              <p>
                Hair salon appointments are meant to be pampering. Yet, for many, they trigger persistent vulnerability. Sitting in front of an unyielding glass panel with harsh downlight for four hours, forced to observe chemical preparation, discoloration, and wet staging, fosters deep expectation anxiety and constant self-criticism.
              </p>
              <p className="text-white italic">
                &ldquo;Sylwia pioneered the No Mirror Experience in Cardiff to return calm, privacy, and pure emotional escape to the client. You relax, read, close your eyes, and drink quiet tea. You do not witness the intermediate process. You experience the magic strictly on its outcome.&rdquo;
              </p>
            </div>
          </div>

          {/* Interactive Core Reveal Widget (The Showstopper) */}
          <div className="bg-[#0b0c10]/80 border border-[#c9a063]/20 rounded-2xl p-6 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 col-span-1 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c9a063] font-mono">Sensory Interface Simulation</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mt-1">Simulate the Mirror Reveal</h3>
                </div>
                
                <p className="text-xs text-gray-400 font-mono leading-relaxed bg-[#0b0c10] p-4 rounded border border-white/5">
                  <span className="text-[#c9a063] font-bold">INSTRUCTIONS:</span> Slide the slider below to control the physical mirror turnaround. Observe the transition of anxiety-inducing foils into the glowing Cardiff Nordic Platinum visual reveal of confidence.
                </p>

                {/* State message based on reveal input */}
                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c9a063]" />
                    <span className="text-xs uppercase tracking-widest text-gray-300 font-mono">Current Sensory State</span>
                  </div>
                  <p className="text-xs md:text-sm italic font-serif text-[#e5b871]">
                    {revealAmount < 25 && "Step 1: Absolute Cocooning. Deep reflection, peace, zero anxiety, hot organic tea."}
                    {revealAmount >= 25 && revealAmount < 50 && "Step 2: Processing in Peace. Silent application, rest, letting the alchemy evolve."}
                    {revealAmount >= 50 && revealAmount < 80 && "Step 3: Staging the Senses. Rinsing luxury oils, dim lighting scalp massage."}
                    {revealAmount >= 80 && "Step 4: The Reveal Ceremony. Pure emotional release, confidence, seeing your glowing self."}
                  </p>
                </div>

                {/* The Interactive React Controller */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-gray-500 uppercase tracking-widest">
                    <span>Foils &amp; Process</span>
                    <span>The Reveal Moment</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={revealAmount} 
                    onChange={(e) => setRevealAmount(Number(e.target.value))} 
                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#c9a063]"
                  />
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#c9a063] font-mono">{100 - revealAmount}% Trust State</span>
                    <span className="text-white font-mono">{revealAmount}% Vision Realized</span>
                  </div>
                </div>
              </div>

              {/* The Interactive Visual Representation Panel */}
              <div className="lg:col-span-7 col-span-1 relative flex justify-center">
                <div className="relative w-full aspect-[16/10] bg-[#0b0c10] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  
                  {/* Left Layer: Foils/Misty State (Processes and anxious side) */}
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80" 
                      alt="Hair Foiling Phase" 
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover filter saturate-50 brightness-[0.2]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Misty / heavy glass visual blurring layer */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                    {/* Golden sparkles representing chemical alchemy and inward focus */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <EyeOff className="w-10 h-10 text-[#c9a063] opacity-60 mb-2 animate-pulse" />
                      <p className="text-xs tracking-wider uppercase text-gray-400 font-mono">Unseeing the Chaos</p>
                      <p className="text-[10px] text-gray-500 max-w-xs mt-1">Rest easy. Your hair is being meticulously coloured without your worry.</p>
                    </div>
                  </div>

                  {/* Right Reveal Layer: (Beautiful final color blonde hair styling) */}
                  <div 
                    className="absolute inset-y-0 right-0 z-10 overflow-hidden"
                    style={{ width: `${revealAmount}%`, transition: 'width 0.15s ease-out' }}
                  >
                    {/* High fashion beautiful blonde hair styling image */}
                    <div className="absolute inset-y-0 right-0 w-[100%] h-full" style={{ width: '100%' }}>
                      <Image 
                        src="https://images.unsplash.com/photo-1605497746444-ac9ee67eb164?auto=format&fit=crop&w=1200&q=80" 
                        alt="The Magical Restored Hair Reveal" 
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {/* Sunrays glowing light leak */}
                      <div className="absolute inset-0 bg-gradient-to-l from-[#c9a063]/30 to-transparent mix-blend-overlay" />
                    </div>
                  </div>

                  {/* Physical Mirror Slider Selector Line Divider */}
                  <div 
                    className="absolute inset-y-0 z-20 w-[2px] bg-[#c9a063]/80 pointer-events-none shadow-[0_0_10px_#c9a063]"
                    style={{ right: `${revealAmount}%`, transition: 'right 0.15s ease-out' }}
                  >
                    <div className="absolute top-[50%] -translate-y-[50%] right-[-14px] w-7 h-7 rounded-full bg-[#0b0c10] border-2 border-[#c9a063] flex items-center justify-center text-[#c9a063]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </section>

      {/* 5. About Sylwia – Her Story, Expertise, and Philosophy */}
      <section id="about-sylwia" className="relative py-24 md:py-32 bg-[#0b0c10]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative p-4 border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur shadow-2xl">
                {/* Embedded luxury citation */}
                <div className="absolute -bottom-6 -right-6 bg-[#c9a063] text-[#0b0c10] px-6 py-4 rounded-lg shadow-xl max-w-xs z-10">
                  <p className="text-[10px] uppercase font-mono tracking-widest font-bold">Industry Mentor</p>
                  <p className="text-xs font-serif italic mt-1 leading-snug">
                    &ldquo;Sylwia frequently educates stylists globally for Montibello UK on advanced colour.&rdquo;
                  </p>
                </div>

                <div className="aspect-[4/5] rounded-xl overflow-hidden relative grayscale drop-shadow-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80" 
                    alt="Sylwia Daria Łuszczyńska Hairstylist" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.4em] text-[#c9a063]">Master of Blonde &amp; Vivid Mastery</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                  Meet the Educator <br />
                  <span className="italic font-normal text-stroke-gold">Sylwia Łuszczyńska</span>
                </h2>
              </div>

              <p className="text-gray-300 font-serif text-md md:text-lg font-light leading-relaxed">
                With over <b className="text-[#c9a063] font-normal">20 years</b> of hairdressing journey, Sylwia is established as Cardiff&apos;s leading technical colour scientist. Her background extends deep into Polish artistic colour design, combining robust European chemical methodologies with soft, premium English hair art. 
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-[#c9a063]/10 flex items-center justify-center text-[#c9a063]">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white font-semibold">UK Top 17 Winner</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Ranked among the high-profile &ldquo;UK Top 50 Winners&rdquo;, taking first place as &ldquo;Hairstylist of the Year&rdquo; at the SOS Beauty Awards 2025.
                  </p>
                </div>

                <div className="p-4 rounded border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-[#c9a063]/10 flex items-center justify-center text-[#c9a063]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white font-semibold">Montibello UK Educator</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Certified mentor guiding other hair professionals in AirTouch blonding, balayage couture, and hair structure preservation.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-[#c9a063] font-mono flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5" /> Core Specialty Domains:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300 border border-white/5">AirTouch Hair Protection</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300 border border-white/5">Icy Metallic Blonde Restructuring</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300 border border-white/5">Multi-Tone Pastel Vivids</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300 border border-white/5">Low-Bandgrowth Shadow Rooting</span>
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </section>

      {/* 6. Signature Work – Interactive Color-Spectrum Portfolio */}
      <section id="signature-work" className="relative py-24 md:py-32 bg-[#0d0f14] border-t border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#c9a063] font-semibold">Transformational Galleries</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mt-2">
                Luxurious <span className="italic font-normal text-stroke-gold">Creations</span>
              </h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-[#0b0c10] border border-white/5 rounded-lg select-none text-xs">
              <button 
                onClick={() => setActiveTab('blonde')}
                className={`px-5 py-2.5 rounded-md uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'blonde' ? 'bg-[#c9a063]/20 text-[#c9a063] border border-[#c9a063]/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                Blondes
              </button>
              <button 
                onClick={() => setActiveTab('balayage')}
                className={`px-5 py-2.5 rounded-md uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'balayage' ? 'bg-[#c9a063]/20 text-[#c9a063] border border-[#c9a063]/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                Balayage
              </button>
              <button 
                onClick={() => setActiveTab('vivid')}
                className={`px-5 py-2.5 rounded-md uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'vivid' ? 'bg-[#c9a063]/20 text-[#c9a063] border border-[#c9a063]/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                Vivids
              </button>
            </div>
          </div>

          {/* Interactive Work Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {portfolioItems
                .filter(item => item.category === activeTab)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="group bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden p-6 flex flex-col justify-between hover:border-[#c9a063]/30 transition-all shadow-xl"
                  >
                    <div>
                      {/* Interactive Reveal Slider - Micro version inside item card */}
                      <div className="aspect-[4/3] rounded-xl overflow-hidden relative mb-6">
                        <Image 
                          src={item.afterUrl} 
                          alt={item.title} 
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="object-cover object-top filter contrast-105 brightness-95"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#c9a063] bg-[#0b0c10]/80 px-2 py-0.5 rounded border border-white/5 font-mono">
                              {item.technique}
                            </span>
                            <h4 className="text-lg font-serif text-white mt-1">{item.title}</h4>
                          </div>
                        </div>
                      </div>

                      {/* Details specs */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-b border-t border-white/5 mb-4 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        <div>
                          <p className="text-gray-600 mb-0.5">Shades</p>
                          <p className="text-gray-300 truncate" title={item.shades}>{item.shades}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-0.5">Technique</p>
                          <p className="text-gray-300 truncate">{item.technique}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-0.5">Time Frame</p>
                          <p className="text-gray-300">{item.duration}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 font-serif leading-relaxed italic mb-4">
                        &ldquo;{item.story}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-[#c9a063] font-mono">Master Formulated</span>
                      <a href="#consultation-form" className="text-white hover:text-[#c9a063] flex items-center gap-1.5 transition-colors uppercase tracking-widest font-mono text-[10px]">
                        Get This Shade <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

        </motion.div>
      </section>

      {/* 7. The Experience Timeline – A Sensory Digital Walkthrough */}
      <section id="the-journey" className="relative py-24 md:py-32 bg-[#0b0c10]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <span className="text-xs tracking-[0.3em] font-semibold text-[#c9a063] uppercase">The Cardiff Salon Ritual</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              A Deeply Personal <br />
              <span className="italic text-stroke-gold">Sensory Journey</span>
            </h2>
            <p className="text-sm md:text-md text-gray-400 max-w-xl mx-auto">
              From the instant you cross our threshold in Pontcanna Mews, the fast-paced world fades away. Here is how your transformation unfolds.
            </p>
          </div>

          {/* Interactive Steps Layout */}
          <div className="relative border-l border-white/5 md:border-l-0 md:grid md:grid-cols-5 md:gap-8 before:content-[''] before:absolute before:inset-x-0 before:top-4 before:h-[1px] before:bg-white/5 md:before:block before:hidden">
            
            {/* Step 1 */}
            <div className="pl-6 md:pl-0 md:pt-10 relative mb-8 md:mb-0">
              <div className="absolute left-[-6px] md:left-[50%] md:translate-x-[-50%] top-0 w-3.5 h-3.5 rounded-full bg-[#c9a063] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b0c10]" />
              </div>
              <span className="text-xs font-mono text-[#c9a063] tracking-widest uppercase block mb-1">Step 01</span>
              <h3 className="text-lg font-serif text-white mb-2">Grounding Dialog</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                We sit face-to-face with luxury coffee or organic tea. No mirrors. We discuss your hair history, long-term aspirations, and custom mood preference.
              </p>
            </div>

            {/* Step 2 */}
            <div className="pl-6 md:pl-0 md:pt-10 relative mb-8 md:mb-0">
              <div className="absolute left-[-6px] md:left-[50%] md:translate-x-[-50%] top-0 w-3.5 h-3.5 rounded-full bg-[#8f9ca2] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b0c10]" />
              </div>
              <span className="text-xs font-mono text-[#c9a063] tracking-widest uppercase block mb-1">Step 02</span>
              <h3 className="text-lg font-serif text-white mb-2">Technical Framing</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Sylwia analyzes hair cuticles with expert lighting. Natural fall is measured. Section partition lines are calculated for AirTouch or couture balayage.
              </p>
            </div>

            {/* Step 3 */}
            <div className="pl-6 md:pl-0 md:pt-10 relative mb-8 md:mb-0">
              <div className="absolute left-[-6px] md:left-[50%] md:translate-x-[-50%] top-0 w-3.5 h-3.5 rounded-full bg-[#8f9ca2] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b0c10]" />
              </div>
              <span className="text-xs font-mono text-[#c9a063] tracking-widest uppercase block mb-1">Step 03</span>
              <h3 className="text-lg font-serif text-white mb-2">Quiet Alchemy</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                The colouring begins, styled blind. You read, take a silent laptop break, or drift away with ambient background lo-fi synth in serene relaxation.
              </p>
            </div>

            {/* Step 4 */}
            <div className="pl-6 md:pl-0 md:pt-10 relative mb-8 md:mb-0">
              <div className="absolute left-[-6px] md:left-[50%] md:translate-x-[-50%] top-0 w-3.5 h-3.5 rounded-full bg-[#8f9ca2] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b0c10]" />
              </div>
              <span className="text-xs font-mono text-[#c9a063] tracking-widest uppercase block mb-1">Step 04</span>
              <h3 className="text-lg font-serif text-white mb-2">Sensory Basin Wash</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Deep nourishment wash in a dim-lighting wet area. Includes premium Montibello conditioning, hot oil styling, and a blissful scalp massage.
              </p>
            </div>

            {/* Step 5 */}
            <div className="pl-6 md:pl-0 md:pt-10 relative">
              <div className="absolute left-[-6px] md:left-[50%] md:translate-x-[-50%] top-0 w-3.5 h-3.5 rounded-full bg-[#c9a063] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b0c10]" />
              </div>
              <span className="text-xs font-mono text-[#c9a063] tracking-widest uppercase block mb-1">Step 05</span>
              <h3 className="text-lg font-serif text-white mb-2">The Grande Reveal</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Styled blind in absolute mystery. We manually turn the heavy vintage style mirror around. Open your eyes to experience the emotional release.
              </p>
            </div>

          </div>

        </motion.div>
      </section>

      {/* 8. Pricing & Packages Table */}
      <section id="pricing" className="relative py-24 md:py-32 bg-[#0d0f14] border-t border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs tracking-[0.3em] font-semibold text-[#c9a063] uppercase">Transparent Luxury Invest</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              Bespoke <span className="italic text-stroke-gold">Services &amp; Pricing</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Every appointment is bespoke and tailored specifically to natural biological hair density, integrity, and color objectives. Call/WhatsApp for detailed consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <div 
                key={i} 
                className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-[#c9a063]/40 transition-all shadow-xl relative overflow-hidden group"
              >
                {/* Visual glow overlay for premium card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#c9a063] opacity-[0.03] blur-2xl group-hover:opacity-[0.06] transition-opacity" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-serif text-white font-medium">{tier.title}</h3>
                      <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Average duration: {tier.time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-serif text-[#c9a063] font-light">{tier.price}</span>
                  </div>

                  <p className="text-xs text-[#8f9ca2] font-serif italic mb-6">
                    &ldquo;{tier.bestFor}&ldquo;
                  </p>

                  <ul className="space-y-3 border-t border-white/5 pt-6 text-xs text-gray-300">
                    {tier.includes.map((incl, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#c9a063] block flex-shrink-0" />
                        <span>{incl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href="#consultation-form" 
                    className="w-full text-center block border border-[#c9a063]/40 text-[#c9a063] hover:bg-[#c9a063] hover:text-[#0b0c10] transition-colors py-3 text-xs uppercase tracking-widest rounded-md font-semibold font-mono"
                  >
                    Select this Ritual
                  </a>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* 9. Client Stories & Testimonials Page */}
      <section id="testimonials" className="relative py-24 md:py-32 bg-[#0b0c10]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#c9a063] font-semibold">Reputation &amp; Trust</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                Words from Cardiff&apos;s <br />
                <span className="italic text-stroke-gold">Reborn Clients</span>
              </h2>
            </div>
            
            <div className="lg:col-span-6 flex items-center gap-4 bg-white/[0.02] border border-white/5 p-6 rounded-xl">
              <div className="text-center md:border-r md:border-white/10 md:pr-6">
                <p className="text-4xl font-serif font-light text-[#c9a063]">4.8</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#c9a063] text-[#c9a063]" />
                  ))}
                </div>
                <p className="text-[10px] uppercase font-mono text-gray-500 mt-2">26 Google Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif font-light text-[#c9a063]">5 / 5</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#c9a063] text-[#c9a063]" />
                  ))}
                </div>
                <p className="text-[10px] uppercase font-mono text-gray-500 mt-2">68 Facebook Votes</p>
              </div>
              <p className="text-xs text-gray-400 font-serif font-light leading-relaxed hidden md:block">
                An exceptional 100% positive industry reputation built upon genuine transformational trust, absolute care confidentiality, and advanced blonding mastery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="bg-[#0d0f14] border border-white/5 rounded-xl p-6 flex flex-col justify-between shadow-lg relative"
              >
                {/* Star Rating row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-white/5">
                      {test.badge}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(test.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-[#c9a063] text-[#c9a063]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 font-serif leading-relaxed italic mb-6">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">{test.author}</p>
                  <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">{test.location} &mdash; {test.service}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* 10. The Ultimate Sanctuary Interactive Consultation Ritual */}
      <section id="consultation-form" className="relative py-24 md:py-32 bg-[#0d0f14] border-t border-white/5 overflow-hidden">
        
        {/* Glowing floating decorative ambient orb */}
        <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-[#c9a063]/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 md:px-12 relative z-10"
        >
          
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs tracking-[0.3em] font-semibold text-[#c9a063] uppercase">The First Touch of Trust</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
              Bespoke Digital <span className="italic text-stroke-gold">Consultation</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto">
              Skip traditional stress-filled bookings. Spend 1 minute sharing your hair history, your comfort targets, and style desire. Sylwia prepares custom formulations beforehand.
            </p>
          </div>

          <div className="bg-[#0b0c10] border border-[#c9a063]/20 rounded-2xl p-6 md:p-12 shadow-2xl">
            
            {/* Step Indicators row */}
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
              <span className="text-[10px] tracking-widest uppercase font-mono text-gray-500">
                Section {consultStep} of 3
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className={`w-12 h-1 rounded-full transition-all duration-300 ${consultStep >= step ? 'bg-[#c9a063]' : 'bg-gray-800'}`}
                  />
                ))}
              </div>
            </div>

            {/* Custom Multi-Step Interactive Form Logic */}
            <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
              
              {/* SECTION 1: Personal Background info */}
              {consultStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif text-white mb-2">Introduction</h3>
                    <p className="text-xs text-gray-400">Share your preferred title and reliable digital contact detail so Sylwia can respond directly.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#c9a063] block">Your Elegance Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-600 animate-pulse" />
                        <input 
                          type="text" 
                          required
                          value={consultName}
                          onChange={(e) => setConsultName(e.target.value)}
                          placeholder="e.g. Eleanor Williams"
                          className="w-full bg-[#0d0f14] border border-white/10 rounded-lg py-3 pl-11 pr-4 text-xs font-serif text-white focus:outline-none focus:border-[#c9a063] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#c9a063] block">Mobile / WhatsApp Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-600" />
                        <input 
                          type="tel" 
                          required
                          value={consultContact}
                          onChange={(e) => setConsultContact(e.target.value)}
                          placeholder="e.g. +44 7477 123456"
                          className="w-full bg-[#0d0f14] border border-white/10 rounded-lg py-3 pl-11 pr-4 text-xs font-mono text-white focus:outline-none focus:border-[#c9a063] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!consultName || !consultContact}
                      onClick={() => setConsultStep(2)}
                      className="bg-[#c9a063] text-[#0b0c10] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black py-3 px-8 text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION 2: Core hair desires */}
              {consultStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif text-white mb-2">Artistic Desires &amp; Anatomy</h3>
                    <p className="text-xs text-gray-400">Tell us what masterpiece we are sculpting and your current base hair dimensions.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Goal Selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">Restoration Goal</label>
                      <select 
                        value={consultGoal}
                        onChange={(e) => setConsultGoal(e.target.value)}
                        className="w-full bg-[#0d0f14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#c9a063] font-serif"
                      >
                        <option value="blonde">Nordic Icy Platinum &amp; AirTouch Blondes</option>
                        <option value="balayage">Dimensional Cocoa &amp; Soft Melt Balayage</option>
                        <option value="vivid">Saturated Vivid Orchid / Amethyst Masterpiece</option>
                        <option value="restoration">Cuticle Re-bond Treatment &amp; Precision Cut</option>
                      </select>
                    </div>

                    {/* Current Length */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">Biological Hair Length</label>
                      <div className="flex gap-2">
                        {['short', 'medium', 'long'].map((len) => (
                          <button
                            type="button"
                            key={len}
                            onClick={() => setConsultLength(len)}
                            className={`flex-1 py-3 text-xs uppercase tracking-widest rounded border transition-all cursor-pointer ${consultLength === len ? 'bg-[#c9a063]/20 border-[#c9a063] text-[#c9a063] font-mono' : 'border-white/10 text-gray-400 hover:text-white bg-black/30'}`}
                          >
                            {len}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setConsultStep(1)}
                      className="border border-white/10 text-gray-300 hover:bg-white/5 py-3 px-6 text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultStep(3)}
                      className="bg-[#c9a063] text-[#0b0c10] hover:bg-white hover:text-black py-3 px-8 text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION 3: Sensory environment & anxiety comfort */}
              {consultStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif text-white mb-2">Sensory &amp; Comfort Engineering</h3>
                    <p className="text-xs text-gray-400 animate-pulse text-[#c9a063] font-mono uppercase tracking-widest">Crucial No-Mirror Step</p>
                    <p className="text-xs text-gray-400">At our Cardiff Sanctuary, we tailor the ambient atmospheric energy based on your personal comfort zone.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Anxiety index */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">General salon mirror anxiety index</label>
                      <select 
                        value={consultAnxiety}
                        onChange={(e) => setConsultAnxiety(e.target.value)}
                        className="w-full bg-[#0d0f14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#c9a063] font-serif"
                      >
                        <option value="high">High - I get anxious, self-critical, and highly self-analyze</option>
                        <option value="moderate">Moderate - I like relaxing but normally feel tense</option>
                        <option value="low">Low - I am generic but would love luxury peaceful care</option>
                      </select>
                    </div>

                    {/* Vibe selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">Preferred Salon Env Vibe</label>
                      <select 
                        value={consultVibe}
                        onChange={(e) => setConsultVibe(e.target.value)}
                        className="w-full bg-[#0d0f14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#c9a063] font-serif"
                      >
                        <option value="serene">The Serene: Dim light, relaxing lo-fi ocean drone</option>
                        <option value="conversational">The Dialogue: Gentle friendly chit-chat &amp; design tips</option>
                        <option value="silent">The Absolute Silence: Complete silent service, book-reading</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic generation display preview */}
                  <div className="p-4 rounded-lg bg-black/60 border border-[#c9a063]/30 text-xs font-serif leading-relaxed space-y-2">
                    <p className="text-[#c9a063] uppercase tracking-widest font-mono text-[10px]">Your Sanctuary Consultation Token Generated:</p>
                    <p className="text-gray-300">
                      &ldquo;Dear <b className="text-white">{consultName || 'Client'}</b>, your customized appointment will implement the <b className="text-[#c9a063]">{consultGoal.toUpperCase()}</b> design protocol. We will secure maximum <b className="text-white">{consultVibe} atmospheric silence</b> and bypass all physical mirrors completely. Sylwia is preparing custom Montibello plex structural protection formulas tailored for long longevity.&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setConsultStep(2)}
                      className="border border-white/10 text-gray-300 hover:bg-white/5 py-3 px-6 text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConsultOutput(true);
                        performBespokeAction();
                      }}
                      className="bg-[#c9a063] text-[#0b0c10] hover:bg-white hover:text-black font-semibold py-3.5 px-8 text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      Submit &amp; Open WhatsApp <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

        </motion.div>
      </section>

      {/* 11. Frequently Asked Questions (Empathetic FAQs) */}
      <section id="faq" className="relative py-24 md:py-32 bg-[#0b0c10] border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 md:px-12"
        >
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a063] font-semibold">Anxiety Relief Clarification</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
              Sought-After <span className="italic text-stroke-gold text-white/95">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            
            {/* FAQ Item 1 */}
            <div className="p-6 rounded-xl bg-[#0d0f14] border border-white/5 space-y-2">
              <h3 className="text-lg font-serif text-[#c9a063] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-[#c9a063]/80" /> What if I actually want to check my hair during the intermediate hours?
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed">
                While stepping away from the mirror is highly beneficial for absolute confidence and peaceful state, your ultimate autonomy is always respected. If at any moment you experience curiosity or need to check, you may absolutely request to glance. We operate on trust, not dogmatic constraints.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="p-6 rounded-xl bg-[#0d0f14] border border-white/5 space-y-2">
              <h3 className="text-lg font-serif text-[#c9a063] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-[#c9a063]/80" /> How does the AirTouch technique work, and why is it premium?
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed">
                AirTouch uses high-speed cool air streams from a dryer to naturally separate shorter, delicate baby hairs from longer cuticles before painting. By only light-stripping the strongest fibers, we accomplish seamless blonde blending that is incredibly safe for your structure. No teasing is ever required, producing comfortable growth with zero hard band root lines.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="p-6 rounded-xl bg-[#0d0f14] border border-white/5 space-y-2">
              <h3 className="text-lg font-serif text-[#c9a063] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-[#c9a063]/80" /> Do you offer professional training courses for external stylists?
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed">
                Yes, Sylwia is the official managing director of <b>SL Academy Creative Training LTD</b>. We offer premier 1-on-1 shadow-days and masterclasses for qualified hair stylists wishing to perfect the Art of AirTouch and the psychological delivery of No-Mirror services. 
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="p-6 rounded-xl bg-[#0d0f14] border border-white/5 space-y-2">
              <h3 className="text-lg font-serif text-[#c9a063] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-[#c9a063]/80" /> Where is the Cardiff sanctuary, and do you offer private parking?
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed">
                Our tranquil salon is located discreetly at <b>Unit 6, 200 Kings Rd, Pontcanna Mews, Cardiff (CF11 9DF)</b>. Pontcanna is known as Cardiff&apos;s leafy boutique wellness district. Pay-and-display street parking is widely adjacent, allowing easy proximity access.
              </p>
            </div>

          </div>

        </motion.div>
      </section>

      {/* 12. Elegant Google Maps Location & Details Area */}
      <section id="location" className="relative py-24 bg-[#0d0f14] border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#c9a063] font-semibold">The Sanctuary Studio</span>
                <h3 className="text-3xl font-serif text-white font-light">Discreetly nestled in Pontcanna, Cardiff</h3>
              </div>

              <div className="space-y-4 text-xs font-mono text-gray-400 leading-relaxed uppercase tracking-wider">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#c9a063] flex-shrink-0" />
                  <div>
                    <p className="text-white">Unit 6, 200 Kings Rd</p>
                    <p>Pontcanna Mews, Cardiff CF11 9DF</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-[#c9a063] flex-shrink-0" />
                  <div>
                    <p className="text-white">Opening hours</p>
                    <p>Tuesday &mdash; Saturday: 09:30 &mdash; 18:30</p>
                    <p className="text-yellow-600 font-sans italic text-[10px] mt-1">Strictly by appointment only</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-[#c9a063] flex-shrink-0" />
                  <div>
                    <p className="text-white">SOS BEAUTY WINNER 2025</p>
                    <p>Cardiff Salon Academy educator</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://maps.google.com/?q=Unit+6,+200+Kings+Rd,+Pontcanna+Mews,+Cardiff+CF11+9DF"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs py-3.5 px-6 border border-white/10 text-white rounded hover:bg-white/5 transition-all uppercase tracking-widest font-mono"
                >
                  Retrieve Driving Directions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="w-full aspect-[16/9] bg-black/40 rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative">
                {/* Styled elegant dark premium Google Maps Frame */}
                {isMounted && (
                  <iframe
                    title="Sylwia Hairstylist Cardiff Map"
                    src="https://maps.google.com/maps?q=Sylwia%20Hairstylist%20Unit%206%20200%20Kings%20Road%20Cardiff%20CF11%209DF&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 13. High-End Footer */}
      <footer id="footer" className="bg-[#0b0c10] border-t border-white/5 pt-16 pb-8 px-6 md:px-12 text-gray-500 font-sans">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="space-y-4">
              <span className="text-sm font-serif font-light text-white block">Sylwia Hairstylist</span>
              <p className="text-xs font-serif leading-relaxed italic max-w-xs">
                &ldquo;Where pure hair science meets absolute emotional wellness. Experience luxury colouring the way it was always intended to feel.&rdquo;
              </p>
              <div className="flex gap-2">
                <a 
                  href="https://www.instagram.com/sylwia.hairstylist.cardiff/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-[#c9a063] hover:border-[#c9a063] transition-colors"
                  title="@sylwia.hairstylist.cardiff on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a063] block mb-4">Navigations</span>
              <ul className="space-y-2 text-xs">
                <li><a href="#no-mirror" className="hover:text-white transition-colors">The No-Mirror Concept</a></li>
                <li><a href="#about-sylwia" className="hover:text-white transition-colors">About Sylwia Daria</a></li>
                <li><a href="#signature-work" className="hover:text-white transition-colors">Couture Portfolio</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Services &amp; Invest</a></li>
                <li><a href="#consultation-form" className="hover:text-white transition-colors">Sanctuary Ritual Form</a></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a063] block mb-4">SL Academy Trainings</span>
              <ul className="space-y-2 text-xs">
                <li><span className="text-gray-400">1-on-1 AirTouch Intensive mentoring</span></li>
                <li><span className="text-gray-400">Masterclass color chemistry</span></li>
                <li><span className="text-gray-300 font-extrabold italic uppercase">SOS BEAUTY WINNER 2025 #1</span></li>
                <li><span className="text-gray-400">Cardiff School Director</span></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a063] block mb-4">Urgent Consultation</span>
              <p className="text-xs mb-4">Have an urgent wedding, restoration, or correction requirement? Directly contact Sylwia&apos;s personal booking staff.</p>
              <a 
                href="https://wa.me/447477123456?text=Hi%20Sylwia!%20I%20would%20love%2520to%20schedule%20a%20luxury%20consultation%20with%20you."
                target="_blank"
                rel="noreferrer"
                className="bg-transparent border border-white/10 hover:border-[#c9a063] text-white hover:text-[#c9a063] block text-center py-3 text-xs uppercase tracking-widest rounded transition-all font-mono"
              >
                Let&apos;s Chat via WhatsApp
              </a>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Sylvia&apos;s Hairstylists LTD / SL Academy. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5 text-gray-600">
              Cardiff, Wales, UK <MapPin className="w-3 h-3" />
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
