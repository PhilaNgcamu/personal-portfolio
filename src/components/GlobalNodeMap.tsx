import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function Nodes() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random points representing global nodes
  const points = useMemo(() => {
    const p = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366F1"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Connecting lines between some nodes to represent logistics paths */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Line
          key={i}
          points={[
            [points[i * 3], points[i * 3 + 1], points[i * 3 + 2]],
            [points[(i + 1) * 3], points[(i + 1) * 3 + 1], points[(i + 1) * 3 + 2]]
          ]}
          color="#0EA5E9"
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

export default function GlobalNodeMap() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Nodes />
      </Canvas>
    </div>
  );
}
