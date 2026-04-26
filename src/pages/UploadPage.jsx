import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DropZone from '../components/upload/DropZone';
import PhotoGuidelines from '../components/upload/PhotoGuidelines';
import PersonalCalibration from '../components/upload/PersonalCalibration';

const STEPS = [
  { label: 'Upload', active: true, done: false },
  { label: 'Processing', active: false, done: false },
  { label: 'Results', active: false, done: false },
  { label: 'Try-On', active: false, done: false },
];

export default function UploadPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-main">

          {/* Back + breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.label}>
                  <span className={`text-xs font-semibold ${s.active ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="text-outline-variant/40 text-xs">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-10"
          >
            <span className="label-tag mb-3 inline-block">Step 1 of 4</span>
            <h1 className="text-4xl sm:text-5xl font-black text-on-surface tracking-tight mt-3 mb-3">
              Upload Your <span className="gradient-text">Photo</span>
            </h1>
            <p className="text-body max-w-xl">
              Upload two side front and side of your  full-body photo and a face selfie.
              Our AI extracts your body measurements and
              detects your skin tone automatically.
              Nothing is stored or transmitted.
            </p>
          </motion.div>

          {/* Step progress bar */}
          <div className="flex gap-1.5 mb-12">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className={`h-1 flex-1 rounded-full ${n === 1 ? 'bg-primary' : 'bg-surface-highest'}`} />
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Uploader — takes 2/3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <DropZone onProceed={() => navigate('/processing')} />
            </motion.div>

            {/* Right Column: Calibration & Guidelines — takes 1/3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="flex flex-col gap-8"
            >
              <PersonalCalibration />
              <PhotoGuidelines />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
