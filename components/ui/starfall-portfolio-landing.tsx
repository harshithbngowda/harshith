"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GlowingEffect } from "./glowing-effect";
import { cn } from "@/lib/utils";

// --- TYPE DEFINITIONS FOR PROPS ---
interface NavLink {
  label: string;
  href: string;
}
interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: React.ReactNode;
}
interface Stat {
  value: string;
  label: string;
}

export interface PortfolioPageProps {
  logo?: { initials: React.ReactNode; name: React.ReactNode };
  navLinks?: NavLink[];
  resume?: { label: string; onClick?: () => void };
  hero?: {
    titleLine1: React.ReactNode;
    titleLine2Gradient: React.ReactNode;
    subtitle: React.ReactNode;
  };
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

// --- INTERNAL ANIMATED BACKGROUND COMPONENT ---
const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.display = "block";
    currentMount.appendChild(renderer.domElement);
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float iTime; uniform vec2 iResolution;
        #define NUM_OCTAVES 2
        float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
        float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
        float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
        void main() {
            vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*3.,0.))*.5;
            for(float i=0.;i++<20.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.02+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.3,i))*.3*(1.-(i/20.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.3),.3+.5*cos(i*.3+iTime*.4),.7+.3*sin(i*.4+iTime*.2),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.6))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/20.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
            o=tanh(pow(o/60.,vec4(1.6)));gl_FragColor=o*1.2;
        }`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    let animationFrameId: number;
    let lastTime = 0;
    let isVisible = true;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (!isVisible) return;
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);
      material.uniforms.iTime.value += 0.033;
      renderer.render(scene, camera);
    };
    
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);
    animate(0);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement))
        currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);
  return <div ref={mountRef} />;
};

// --- DEFAULT DATA ---
const defaultData: PortfolioPageProps = {
  logo: { initials: "HB", name: "Harshith B N" },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
  ],
  resume: { label: "Resume", onClick: undefined },
  hero: {
    titleLine1: "AI & Data Science",
    titleLine2Gradient: "Student & Developer",
    subtitle:
      "Passionate about Machine Learning, Deep Learning, and creating innovative solutions that make a difference. Currently pursuing B.E. in Artificial Intelligence and Data Science.",
  },
  ctaButtons: {
    primary: { label: "View My Work", onClick: undefined },
    secondary: { label: "Get In Touch", onClick: undefined },
  },
  projects: [
    {
      title: "Interactive Object Segmentation",
      description:
        "Advanced image processing pipeline using YOLOv8 with OpenCV and NumPy for object detection and segmentation.",
      tags: ["Python", "YOLO", "Computer Vision"],
      imageContent: undefined,
    },
    {
      title: "Health Tracker Mobile App",
      description:
        "Cross-platform Flutter application for logging daily health metrics with interactive charts.",
      tags: ["Flutter", "Dart", "Mobile Dev"],
      imageContent: undefined,
    },
    {
      title: "Medical Chatbot",
      description:
        "GPT-2 based medical Q&A chatbot fine-tuned on medical dataset for accurate information.",
      tags: ["Python", "NLP", "Hugging Face"],
      imageContent: undefined,
    },
  ],
  stats: [
    { value: "5+", label: "Projects Completed" },
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Certifications" },
  ],
};

// --- GLOWING CARD COMPONENT ---
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative rounded-xl border-[0.75px] bg-background/90 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
        {children}
      </div>
    </div>
  );
};

// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT ---
const PortfolioPage: React.FC<PortfolioPageProps> = (props) => {
  // Merge props with defaults
  const {
    logo = defaultData.logo,
    navLinks = defaultData.navLinks,
    resume = defaultData.resume,
    hero = defaultData.hero,
    ctaButtons = defaultData.ctaButtons,
    projects = defaultData.projects,
    stats = defaultData.stats,
    showAnimatedBackground = true,
  } = props;
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {showAnimatedBackground && <AuroraBackground />}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="w-full px-6 py-4 border-b border-border/50 backdrop-blur-sm sticky top-0 bg-background/80">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {logo!.initials}
                </span>
              </div>
              <span className="text-lg font-medium text-foreground">
                {logo!.name}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks!.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={resume!.onClick}
              className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium border border-border hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {resume!.label}
            </button>
          </div>
        </nav>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Hero Section */}
        <main
          id="about"
          className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Title with Float Animation */}
            <div className="mb-8 animate-[float_6s_ease-in-out_infinite]">
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-tight mb-4">
                <span className="text-foreground">{hero!.titleLine1}</span>
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
                  {hero!.titleLine2Gradient}
                </span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl leading-relaxed font-light text-muted-foreground mx-auto">
                {hero!.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={ctaButtons!.primary.onClick}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm min-w-[160px] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                {ctaButtons!.primary.label}
              </button>
              <button
                onClick={ctaButtons!.secondary.onClick}
                className="min-w-[160px] font-medium text-foreground rounded-lg px-6 py-3 border border-border hover:bg-muted transition-colors"
              >
                {ctaButtons!.secondary.label}
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

            {/* Projects Grid with Glowing Cards */}
            <div
              id="projects"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
            >
              {projects!.map((project, index) => (
                <GlowCard key={index}>
                  {project.imageContent && (
                    <div className="h-24 mb-4 flex items-center justify-center">
                      {project.imageContent}
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

            {/* Stats Section */}
            <div
              id="skills"
              className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center"
            >
              {stats!.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <div>
                    <div className="text-3xl md:text-4xl font-light text-foreground mb-1 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm font-normal">
                      {stat.label}
                    </div>
                  </div>
                  {index < stats!.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { PortfolioPage, GlowCard, AuroraBackground };
