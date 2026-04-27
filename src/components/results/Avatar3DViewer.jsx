import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useProgress, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { Download, RefreshCw } from 'lucide-react';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-on-surface-variant text-sm font-medium">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}

function AvatarModel({ url }) {
  const obj = useLoader(OBJLoader, url);
  return (
    <group position={[0, -1.2, 0]} scale={1.8}>
      <Center>
        <primitive object={obj} rotation={[Math.PI, 0, 0]} />
      </Center>
    </group>
  );
}

export default function Avatar3DViewer({ modelUrl, onRegenerate }) {
  // ── No avatar — show fallback with regenerate button ─────────────────────
  if (!modelUrl) {
    return (
      <div className="w-full aspect-[3/4] sm:aspect-square lg:aspect-[3/4] relative flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-highest/50 flex items-center justify-center">
          <span className="text-2xl opacity-40">⬡</span>
        </div>
        <div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">3D Avatar Unavailable</p>
          <p className="text-xs text-on-surface-variant/50">
            Avatar generation failed or is still loading.
          </p>
        </div>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate Avatar
          </button>
        )}
      </div>
    );
  }

  // ── Download handler ─────────────────────────────────────────────────────
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = modelUrl;
    a.download = 'vds-avatar.obj';
    a.click();
  };

  // ── 3D viewer ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full aspect-[3/4] sm:aspect-square lg:aspect-[3/4] relative z-10 flex flex-col">
      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.2} />
          <Suspense fallback={<Loader />}>
            <AvatarModel url={modelUrl} />
          </Suspense>
          <OrbitControls
            autoRotate={true}
            autoRotateSpeed={1.5}
            enablePan={false}
            minDistance={2}
            maxDistance={20}
          />
        </Canvas>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="mt-3 mx-6 mb-2 flex items-center justify-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors py-2 border border-outline-variant/20 rounded-xl hover:bg-surface-highest/30"
      >
        <Download className="w-3.5 h-3.5" />
        Download .obj
      </button>
    </div>
  );
}
