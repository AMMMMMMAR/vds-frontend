import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useProgress, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

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

export default function Avatar3DViewer({ modelUrl }) {
  return (
    <div className="w-full aspect-[3/4] sm:aspect-square lg:aspect-[3/4] relative z-10 flex items-center justify-center p-6">
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
  );
}
