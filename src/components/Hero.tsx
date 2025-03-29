import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text3D, useTexture, PerspectiveCamera, Float, Environment, Sparkles, useCursor } from "@react-three/drei";
import * as THREE from "three";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Cpu,
  Terminal,
  Database,
  GitBranch,
  Server
} from "lucide-react";
import {
  SiPhp,
  SiLaravel,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiUbuntu,
  SiDocker,
  SiAmazon,
  SiMysql
} from "react-icons/si";

import "./styles.css";

import fontData from '../../public/fonts/helvetiker_regular.typeface.json';



// 1️⃣ Three.js Background Component
const FuturisticBackground = () => {
  const { viewport } = useThree();

  const particles = useRef();
  const count = 500;

  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 20;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    const { clock } = state;
    particles.current.rotation.x = clock.getElapsedTime() * 0.1;
    particles.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <>
      {/* Grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10, 10, 10]} />
          <meshBasicMaterial wireframe color="#00ffaa" />
        </mesh>
      </mesh>

      {/* Floating particles */}
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00ffaa"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Glowing lines */}
      <group position={[0, 0, -5]}>
        {[...Array(8)].map((_, i) => (
          <line key={i}>
            <bufferGeometry attach="geometry"
              attributes={{
                position: new THREE.BufferAttribute(
                  new Float32Array([
                    Math.sin(i) * 5, Math.cos(i) * 5, 0,
                    Math.sin(i + 1) * 5, Math.cos(i + 1) * 5, 0
                  ]),
                  3
                )
              }}
            />
            <lineBasicMaterial attach="material" color="#00ffaa" linewidth={1} />
          </line>
        ))}
      </group>
    </>
  );
};

// 3️⃣ 3D Skill Icons
const SkillOrbit = ({ icon, name, index, total }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // ألوان متناسقة مع باقي الصفحة
  const colors = {
    base: "#e0f7fa",         // أزرق فاتح (للمكعبات العادية)
    hover: "#4dd0e1",        // أزرق سماوي (لحالة hover)
    text: "#ffffff",         // أبيض (للنص)
    emissive: "#00acc1",     // أزرق متوسط (للإشعاع)
    bgEmissive: "#00838f"    // أزرق غامق (للإشعاع الخلفي)
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = (index / total) * Math.PI * 2;
    const radius = hovered ? 3.3 : 3;

    ref.current.position.x = Math.cos(angle + time * 0.15) * radius;
    ref.current.position.z = Math.sin(angle + time * 0.15) * radius;
    ref.current.position.y = Math.sin(time * 0.4) * 0.4;

    ref.current.rotation.y += 0.008;
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z =
      THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1);
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={hovered ? colors.hover : colors.base}
          emissive={hovered ? colors.emissive : "#37474f"}
          emissiveIntensity={hovered ? 1.2 : 0.25}
          metalness={0.7}      // تقليل اللمعان المعدني قليلاً
          roughness={0.25}    // زيادة الخشونة للتقليل من الوهج
          transparent
          opacity={0.95}
        />
        {hovered && (
          <Text3D
            font={fontData}
            size={0.28}
            height={0.04}
            position={[0, -1.1, 0]}
            bevelEnabled
            bevelSize={0.01}
          >
            {name}
            <meshStandardMaterial
              color={colors.text}
              emissive={colors.bgEmissive}
              emissiveIntensity={0.8}
            />
          </Text3D>
        )}
      </mesh>
    </group>
  );
};

// 4️⃣ Futuristic Typing Effect with Glitch
const CyberTypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        // Random glitch effect
        if (Math.random() > 0.9) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200);
        }

        setDisplayedText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, [text]);

  return (
    <div className="relative">
      <motion.div
        className={`font-mono ${glitchActive ? 'text-red-400' : 'text-green-400'}`}
        animate={{
          x: glitchActive ? [0, 5, -5, 0] : 0,
          textShadow: glitchActive
            ? ['0 0 5px #00ffaa', '5px 0 10px #ff00aa', '-5px 0 10px #00aaff', '0 0 5px #00ffaa']
            : '0 0 5px #00ffaa'
        }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
        <motion.span
          className="inline-block w-2 h-6 bg-green-500 ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      </motion.div>

      {/* Scan line effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-green-400 opacity-10 pointer-events-none"
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

// 5️⃣ Holographic Card Component
const HolographicCard = ({ title, content }) => {
  const [flipped, setFlipped] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative w-64 h-32 cursor-pointer perspective-1000"
      onClick={() => setFlipped(!flipped)}
      onHoverStart={() => setGlitch(true)}
      onHoverEnd={() => setGlitch(false)}
      animate={{
        rotateY: flipped ? 180 : 0,
        scale: glitch ? [1, 1.05, 1] : 1
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Front side */}
      <motion.div
        className="absolute w-full h-full backface-hidden bg-gray-900 bg-opacity-70 rounded-lg p-4 border border-green-400 border-opacity-30 flex flex-col justify-center items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,170,0.1) 0%, rgba(0,0,0,0.8) 100%)',
          boxShadow: '0 0 20px rgba(0,255,170,0.3)'
        }}
        animate={{
          opacity: flipped ? 0 : 1,
          display: flipped ? 'none' : 'flex'
        }}
      >
        <h3 className="text-green-400 text-lg font-mono mb-2">{title}</h3>
        <div className="text-white text-sm font-mono">{content}</div>
      </motion.div>

      {/* Back side */}
      <motion.div
        className="absolute w-full h-full backface-hidden bg-gray-900 bg-opacity-70 rounded-lg p-4 border border-green-400 border-opacity-30 flex flex-col justify-center items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(0,170,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
          boxShadow: '0 0 20px rgba(0,170,255,0.3)',
          transform: 'rotateY(180deg)'
        }}
        animate={{
          opacity: flipped ? 1 : 0,
          display: flipped ? 'flex' : 'none'
        }}
      >

        <h3 className="text-blue-400 text-lg font-mono mb-2">Backend Laravel Expert</h3>
        <div className="text-white text-sm font-mono text-center">
          Laravel | PHP | MySQL | API Design | Scalability | Performance Optimization
        </div>

      </motion.div>

      {/* Glitch effect overlay */}
      {glitch && (
        <motion.div
          className="absolute inset-0 bg-white bg-opacity-10 mix-blend-screen"
          animate={{ opacity: [0.3, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// 6️⃣ Futuristic Social Button
const FuturisticButton = ({ Icon, href, tooltip }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const rippleRef = useRef(null);

  // ألوان متناسقة
  const colors = {
    primary: '#4dd0e1',    // أزرق سماوي
    secondary: '#00838f',  // أزرق غامق
    accent: '#e0f7fa',     // أزرق فاتح
    background: 'rgba(0, 0, 0, 0.3)'
  };

  const handleClick = (e) => {
    setClicked(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rippleRef.current) {
      rippleRef.current.style.left = `${x}px`;
      rippleRef.current.style.top = `${y}px`;
      rippleRef.current.classList.add("animate-ripple");

      setTimeout(() => {
        if (rippleRef.current) {
          rippleRef.current.classList.remove("animate-ripple");
        }
        setClicked(false);
      }, 800); // تقليل مدة الريبل
    }
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden rounded-full p-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{
        scale: 1.15,
        backgroundColor: 'rgba(77, 208, 225, 0.2)',
        borderColor: colors.primary
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: colors.background,
        border: `1px solid ${colors.secondary}`,
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Icon className="text-white" size={22} style={{
        filter: hovered ? 'drop-shadow(0 0 4px rgba(224, 247, 250, 0.7))' : 'none',
        transition: 'all 0.3s ease'
      }} />

      {/* Ripple effect */}
      <div
        ref={rippleRef}
        className="absolute w-3 h-3 bg-white rounded-full opacity-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`
        }}
      />

      {/* Hover effect */}
      {hovered && (
        <>
          <motion.div
            className="absolute inset-0 border-2 rounded-full pointer-events-none"
            style={{ borderColor: colors.primary }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-white rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.05, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}

      {/* Tooltip */}
      {hovered && (
        <motion.span
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs px-3 py-1 rounded whitespace-nowrap"
          style={{
            backgroundColor: colors.secondary,
            boxShadow: `0 2px 10px ${colors.primary}40`
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          {tooltip}
        </motion.span>
      )}
    </motion.a>
  );
};

const Hero = () => {
  const skills = [
    { icon: <SiPhp className="text-purple-500" size={24} />, name: "PHP" },
    { icon: <SiLaravel className="text-red-500" size={24} />, name: "Laravel" },
    { icon: <SiMysql className="text-blue-500" size={24} />, name: "MySQL" },
    { icon: <SiJavascript className="text-yellow-400" size={24} />, name: "JavaScript" },
    { icon: <SiHtml5 className="text-orange-500" size={24} />, name: "HTML" },
    { icon: <SiCss3 className="text-blue-400" size={24} />, name: "CSS" },
    { icon: <SiPython className="text-blue-600" size={24} />, name: "Python" },
    { icon: <GitBranch className="text-orange-600" size={24} />, name: "Git" },
    { icon: <SiDocker className="text-blue-300" size={24} />, name: "Docker" },
    { icon: <SiAmazon className="text-yellow-600" size={24} />, name: "AWS" },
    { icon: <SiUbuntu className="text-orange-800" size={24} />, name: "Ubuntu" },
    { icon: <Server className="text-gray-400" size={24} />, name: "Server" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900"
    >
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          <ambientLight intensity={0.5} color="#00ffaa" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffaa" />
          <FuturisticBackground />

          {/* Render 3D skill icons */}
          {skills.map((skill, i) => (
            <SkillOrbit
              key={i}
              icon={skill.icon}
              name={skill.name}
              index={i}
              total={skills.length}
            />
          ))}
        </Canvas>
      </div>

      {/* Lens flare effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-green-400 opacity-10 filter blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-blue-400 opacity-10 filter blur-xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6 sm:space-y-8">
        {/* Typing effect with glitch */}
        <motion.div
          className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-mono bg-gray-900 bg-opacity-70 p-4 sm:p-5 rounded-lg border border-green-400 border-opacity-30 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
          style={{
            boxShadow: '0 0 20px rgba(21, 64, 156, 0.2)',
            textShadow: '0 0 5px rgba(0,255,170,0.5)'
          }}
        >
          <CyberTypingEffect text="</?php // Hi, I'm Mohamed Ahmed, a Backend Laravel Developer." />
        </motion.div>

        {/* Holographic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center"
        >
          <HolographicCard
            title="Backend Developer"
            content="Passionate about building robust backend systems with Laravel and PHP"
          />
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { Icon: Github, href: "https://github.com/MohamedAhmed479", tooltip: "GitHub" },
            { Icon: Linkedin, href: "http://www.linkedin.com/in/mohamed-ahmed-354a572a3", tooltip: "LinkedIn" },
            { Icon: Mail, href: "mailto:mohamedahmeddev333@gmail.com", tooltip: "Email" },
          ].map((item, index) => (
            <FuturisticButton
              key={index}
              Icon={item.Icon}
              href={item.href}
              tooltip={item.tooltip}
            />
          ))}
        </motion.div>
      </div>


      {/* Global styles for ripple effect */}
      {/* Correct way to write global styles in Next.js */}

    </section>

  );
};

export default Hero;  