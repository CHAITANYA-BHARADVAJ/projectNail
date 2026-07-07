import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ── Nail Polish Bottle ─────────────────────────────────── */
function NailPolishBottle({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const capGroupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      
      // Interactive scale based on hover
      const targetScale = hovered ? 1.08 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Rotate the entire bottle very slowly when not hovered, just to keep it dynamic
      if (!hovered) {
        groupRef.current.rotation.y += 0.002;
      }
    }

    if (capGroupRef.current) {
      // Create a repeating cycle of 8 seconds
      const cycle = state.clock.elapsedTime % 8;
      
      // The cap should be open if we are in the middle of the cycle (2s to 6s)
      // OR if the user is actively hovering their mouse over the bottle!
      const isOpen = (cycle > 2 && cycle < 6) || hovered;

      const targetY = isOpen ? 0.9 : 0;
      const targetRotY = isOpen ? Math.PI * 4 : 0; // 2 full spins
      const targetRotX = isOpen ? -0.2 : 0; // tilt backward

      capGroupRef.current.position.y = THREE.MathUtils.lerp(
        capGroupRef.current.position.y,
        targetY,
        0.05
      );
      capGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        capGroupRef.current.rotation.y,
        targetRotY,
        0.04
      );
      capGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        capGroupRef.current.rotation.x,
        targetRotX,
        0.03
      );
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Glass Bottle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 1.4, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          opacity={1}
          metalness={0}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>

      {/* Inner Polish Liquid */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.31, 0.36, 1.25, 32]} />
        <meshPhysicalMaterial
          color="#E8B4B8"
          metalness={0.1}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>

      {/* Bottle neck */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 0.4, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          roughness={0.1}
          ior={1.5}
          thickness={0.2}
        />
      </mesh>
      
      {/* Neck inner liquid */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.3, 32]} />
        <meshPhysicalMaterial
          color="#E8B4B8"
          roughness={0.2}
        />
      </mesh>

      {/* Label band (Rose Gold) */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.3, 32]} />
        <meshStandardMaterial
          color="#D4A98C"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* The Animated Cap Group */}
      <group ref={capGroupRef}>
        {/* Cap */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.55, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Cap top (rounded) */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Wand / Brush handle */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 16]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
        </mesh>

        {/* Polish Brush tip soaked in polish */}
        <mesh position={[0, -0.05, 0]}>
          <capsuleGeometry args={[0.045, 0.12, 16, 16]} />
          <meshPhysicalMaterial
            color="#E8B4B8"
            metalness={0.1}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Floating Nail Shape ────────────────────────────────── */
function NailShape({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      ref.current.rotation.x = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.1;
      
      const targetScale = hovered ? scale * 1.1 : scale;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh 
        ref={ref} 
        position={position} 
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <capsuleGeometry args={[0.15, 0.35, 16, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

/* ── Polish Drop ────────────────────────────────────────── */
function PolishDrop({ position, color, scale = 1 }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
      
      const baseScale = scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      const targetScale = hovered ? baseScale * 1.2 : baseScale;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh 
      ref={ref} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.12 * scale, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        speed={3}
        distort={0.4}
        radius={1}
        metalness={0.4}
        roughness={0.1}
        clearcoat={1}
      />
    </mesh>
  );
}

/* ── Main Scene ─────────────────────────────────────────── */
function Scene() {
  const { width } = useThree((state) => state.viewport);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const positionX = isMobile ? 0 : 1.5;
  const positionY = isMobile ? -0.1 : 0;
  const scale = isMobile ? 0.8 : 1.0;

  return (
    <>
      {/* Realistic Environment Lighting */}
      <Environment preset="city" />
      
      {/* Studio Lighting to complement the HDRI */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#FFF5F0" />
      <pointLight position={[-3, 0, -3]} intensity={0.5} color="#F2D1D4" />

      {/* Interactive Controls wrapper */}
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1.5}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        {/* Main Group shifted to right for desktop layout, centered & scaled down for mobile */}
        <group position={[positionX, positionY, 0]} scale={scale}>
          {/* Nail Polish Bottle */}
          <NailPolishBottle position={[0, -0.2, 0]} rotation={[0.1, -0.2, 0.05]} />

          {/* Floating Nail Shapes */}
          <NailShape position={[-1.2, 1.2, -0.5]} color="#E8B4B8" scale={0.7} speed={0.8} />
          <NailShape position={[1.5, -0.8, 0.5]} color="#D4A98C" scale={0.6} speed={1} />

          {/* Polish Drops */}
          <PolishDrop position={[-0.8, 1.5, 0.2]} color="#E8B4B8" scale={1} />
          <PolishDrop position={[1.2, -1.2, -0.2]} color="#D4949A" scale={0.8} />

          {/* Soft shadow plane underneath */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#8c7879"
          />
        </group>
      </PresentationControls>

      {/* Sparkle Particles */}
      <Sparkles count={25} scale={8} size={2} speed={0.4} color="#F2D1D4" opacity={0.6} />
      <Sparkles count={15} scale={6} size={3} speed={0.3} color="#D4A98C" opacity={0.5} />
    </>
  );
}

/* ── Exported Component ─────────────────────────────────── */
export default function NailScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
