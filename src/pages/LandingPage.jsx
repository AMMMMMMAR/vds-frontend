import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Shield, Star, ArrowDown } from 'lucide-react';
import heroImg from '../assets/hero-dark.png';
import quickScanImg from '../assets/quick-scan.png';
import aiAnalysisImg from '../assets/ai-analysis.png';
import tryOnImg from '../assets/try-on.png';
import yoloLandmarksImg from '../assets/yolo-landmarks.png';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Quick Scan',
    description: 'Upload front, side, and back photos. High-precision capture processed entirely on-device in seconds.',
    img: quickScanImg,
    color: 'from-primary-container/20 to-primary/5',
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Neural reconstruction maps 33 body landmarks with sub-millimeter accuracy to build your digital twin.',
    img: aiAnalysisImg,
    color: 'from-tertiary/20 to-tertiary/5',
  },
  {
    step: '03',
    title: 'Virtual Try-On',
    description: 'Physically accurate garment draping matched to your exact measurements and colour profile.',
    img: tryOnImg,
    color: 'from-secondary-container/30 to-secondary-container/5',
  },
];

const TECH_STEPS = [
  {
    number: '01',
    title: 'Geometric Landmark Extraction',
    desc: 'We pinpoint 33 key body landmarks with sub-millimeter precision to understand your unique posture and frame.',
    img: yoloLandmarksImg,
  },
  {
    number: '02',
    title: 'Mathematical 3D Slicing',
    desc: 'Our algorithm performs cross-sectional slicing of the 3D body volume to calculate circumference, not just height/width.',
  },
  {
    number: '03',
    title: 'Chromatic Skin Tone Sampling',
    desc: 'Privacy-safe sampling: we analyse skin-tone histograms in-memory to generate a matched colour palette.',
  },
  {
    number: '04',
    title: 'Digital Twin Assembly',
    desc: 'A mathematically accurate Digital Twin, ready for virtual fitting — without ever storing your personal photo.',
  },
];

const VALUES = [
  { icon: <Zap className="w-5 h-5" />, title: 'Precision Engineering', desc: 'Sub-millimeter accuracy ensuring every stitch aligns with your unique profile.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Privacy by Design', desc: 'Your data is yours. Localised processing means your biometric data never leaves your control.' },
  { icon: <Star className="w-5 h-5" />, title: 'Ethical AI', desc: 'Inclusive algorithms that recognise and celebrate every body type and identity.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const howRef = useRef(null);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Ambient orbs */}
        <div className="orb w-[600px] h-[600px] bg-primary/8 top-[-200px] right-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-tertiary/6 bottom-[-150px] left-[-100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="container-main relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)]">

            {/* Left: Text */}
            <div className="flex flex-col justify-center py-16 lg:py-0">
              <motion.div {...fadeUp(0.05)} className="mb-6">
                <span className="label-tag">The Digital Atelier</span>
              </motion.div>

              <motion.h1 {...fadeUp(0.15)} className="text-display text-on-surface mb-6">
                Precision{' '}
                <span className="gradient-text block">Engineered</span>
                Fitting.
              </motion.h1>

              <motion.p {...fadeUp(0.25)} className="text-body text-lg max-w-lg mb-10">
                Step into the Digital Atelier. Our advanced AI maps your unique measurements in seconds,
                delivering a flawless virtual wardrobe experience that celebrates your form.
              </motion.p>

              <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/upload')}
                  className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8"
                >
                  Start Your Scan
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => howRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary flex items-center justify-center gap-2 text-base py-4 px-8"
                >
                  <ArrowDown className="w-5 h-5" />
                  How It Works
                </button>
              </motion.div>


            </div>

            {/* Right: Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md lg:max-w-xl">
                <img
                  src={heroImg}
                  alt="VDS AI Fitting System"
                  className="relative z-10 w-full object-contain drop-shadow-2xl animate-float max-h-[70vh] mix-blend-screen"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" ref={howRef} className="section-pad bg-surface-low">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="label-tag mb-4 inline-block">The Process</span>
            <h2 className="text-headline text-on-surface mt-4">
              Seamless Integration.<br />
              <span className="gradient-text">Flawless Fit.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div key={item.step} {...fadeUp(i * 0.12)}
                className="card card-hover p-0 overflow-hidden group relative h-[420px]"
              >
                {/* Image Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081425] via-[#081425]/60 to-transparent opacity-90" />
                </div>

                <span className="absolute top-5 left-5 text-label text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs z-10 backdrop-blur-md">
                  Step {item.step}
                </span>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                  <h3 className="text-title text-on-surface mb-2">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.4)} className="text-center mt-14">
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary inline-flex items-center gap-2 text-base py-4 px-10"
            >
              Begin Your Scan
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── OUR VISION ────────────────────────────────────────── */}
      <section id="our-vision" className="section-pad bg-surface-lowest">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp(0)}>
              <span className="label-tag mb-4 inline-block">Our Vision</span>
              <h2 className="text-headline text-on-surface mt-4 mb-6">
                Redefining the Future<br />
                <span className="gradient-text">of Retail.</span>
              </h2>
              <p className="text-body text-base leading-loose">
                VDS was born from a singular obsession: merging the timeless craftsmanship of high-fashion ateliers
                with the limitless precision of cutting-edge AI. We are building the Digital Atelier — a space where
                every garment fits perfectly and every user is celebrated.
              </p>
              <p className="text-body text-base leading-loose mt-4">
                By digitising human geometry with neural reconstruction, we eliminate the guesswork of online shopping
                and return to the roots of bespoke tailoring, empowered by technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5">
              {VALUES.map((v, i) => (
                <motion.div key={v.title} {...fadeUp(i * 0.1 + 0.1)}
                  className="card card-hover p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface mb-1">{v.title}</h4>
                    <p className="text-body text-sm">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH DEEP DIVE ────────────────────────────────────── */}
      <section id="tech-deep-dive" className="section-pad bg-surface-low">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="mb-20">
            <span className="label-tag mb-4 inline-block">Inside the Engine</span>
            <h2 className="text-headline text-on-surface mt-4">Technical Deep Dive</h2>
          </motion.div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {TECH_STEPS.map((t, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={t.number} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image container */}
                  <motion.div 
                    {...fadeUp(0.1)} 
                    className="w-full lg:w-1/2"
                  >
                    <div className="w-full aspect-[16/10] rounded-2xl bg-surface-highest/20 border border-outline-variant/10 flex flex-col items-center justify-center relative overflow-hidden shadow-sm group">
                      {/* Grid bg for empty state */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                      
                      <div className="flex flex-col items-center gap-3 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-surface-highest/50 flex items-center justify-center">
                          <span className="text-lg text-on-surface-variant/50 font-mono">{t.number}</span>
                        </div>
                        <span className="text-on-surface-variant/40 font-mono text-xs">Image Slot: {t.title}</span>
                      </div>

                      {/* TODO: Place your image here */}
                      {t.img && (
                        <img 
                          src={t.img} 
                          alt={t.title} 
                          className="absolute inset-0 w-full h-full object-cover z-20 group-hover:scale-105 transition-transform duration-700" 
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Text container */}
                  <motion.div 
                    {...fadeUp(0.2)}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                  >
                    <div className="w-8 h-[2px] bg-primary/60 mb-6 rounded-full" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
                      {t.title}
                    </h3>
                    <p className="text-body text-base leading-relaxed mb-8 max-w-lg">
                      {t.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-main text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-headline text-on-surface mb-6">
              Ready to Enter<br />
              <span className="gradient-text">The Digital Atelier?</span>
            </h2>
            <p className="text-body mb-10 max-w-xl mx-auto">
              Upload your photos and receive a precise digital twin in under 5 seconds.
              No account required. No data stored.
            </p>
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary inline-flex items-center gap-2 text-lg py-5 px-12"
            >
              Start for Free
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
