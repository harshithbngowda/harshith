"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { AuroraBackground } from "@/components/ui/starfall-portfolio-landing";
import { cn } from "@/lib/utils";
import {
  Code,
  Database,
  Brain,
  Bot,
  Eye,
  Smartphone,
  Sprout,
  Stethoscope,
  GraduationCap,
  Medal,
  Mic,
  Music,
  Trophy,
  Dumbbell,
  Palette,
  Mail,
  Phone,
  Linkedin,
  Youtube,
  Instagram,
  Send,
  User,
  ChevronRight,
  FileText,
  Menu,
  X,
  Shield,
  Plane,
  ListTodo,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// --- GLOWING CARD COMPONENT ---
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowCard = ({ children, className }: GlowCardProps) => {
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

// Project Card with Glowing Effect
interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  ongoing?: boolean;
}

const ProjectCard = ({
  icon,
  title,
  description,
  tags,
  ongoing,
}: ProjectCardProps) => {
  return (
    <GlowCard className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          {ongoing && (
            <span className="px-2 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full animate-pulse border border-amber-500/30">
              Ongoing
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  );
};

// Achievement Card with Glowing Effect
interface AchievementCardProps {
  image?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: { icon: React.ReactNode; title: string; description: string }[];
}

const AchievementCard = ({
  image,
  icon,
  title,
  subtitle,
  items,
}: AchievementCardProps) => {
  return (
    <GlowCard className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          {image && (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-border">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground">
              {icon}
              {title}
            </h3>
            <p className="text-muted-foreground italic text-sm">{subtitle}</p>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-3 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors"
            >
              <div className="text-primary flex-shrink-0 mt-1">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            Harshith B N
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground dark">
      <AuroraBackground />
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-[float_6s_ease-in-out_infinite]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight whitespace-nowrap">
                  Hello, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Harshith B N
                  </span>
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground font-light">
                  AI & Data Science Enthusiast
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Passionate about Machine Learning, Deep Learning, and creating
                  innovative solutions that make a difference. Currently pursuing
                  B.E. in Artificial Intelligence and Data Science at Global
                  Academy of Technology, Bengaluru.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                  >
                    <User className="w-4 h-4" />
                    About Me
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted/50 transition-colors backdrop-blur-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Get In Touch
                  </Link>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-border/50">
                  <Image
                    src="/formalpic.jpg"
                    alt="Harshith B N"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              I&apos;m a dedicated B.E. student in Artificial Intelligence and Data
              Science at Global Academy of Technology, Bengaluru (2022-2026). My
              passion lies in exploring the frontiers of AI, machine learning,
              and data science to create meaningful solutions.
            </p>

            {/* Skills Grid with Glowing Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlowCard>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-fit rounded-lg border border-border bg-muted p-2">
                    <Code className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Programming Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "C", "Dart"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
              <GlowCard>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-fit rounded-lg border border-border bg-muted p-2">
                    <Database className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Databases</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["MySQL", "SQLite", "MongoDB"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
              <GlowCard>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-fit rounded-lg border border-border bg-muted p-2">
                    <Brain className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Machine Learning</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "RandomForest",
                    "Decision Tree",
                    "XGBoost",
                    "TensorFlow",
                    "PyTorch",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
              <GlowCard>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-fit rounded-lg border border-border bg-muted p-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Deep Learning</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["YOLO", "Computer Vision", "RNN", "CNN", "LSTM"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium border border-primary/20"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                icon={<Eye className="w-6 h-6 text-primary" />}
                title="Interactive Object Segmentation"
                description="Developed an object segmentation pipeline using YOLOv8 to detect and segment multiple objects with high precision. Integrated OpenCV and NumPy to crop segmented objects and export transparent-background images. Built an interactive Matplotlib-based GUI for real-time object selection."
                tags={["Python", "Computer Vision", "Deep Learning"]}
              />
              <ProjectCard
                icon={<Smartphone className="w-6 h-6 text-primary" />}
                title="Health Tracker Mobile Application"
                description="Developed a cross-platform mobile application to monitor daily health metrics including steps, hydration, and sleep patterns. Implemented dynamic dashboards and historical progress tracking. Utilized SharedPreferences for persistent storage with theme customization."
                tags={["Flutter", "Dart", "State Management"]}
              />
              <ProjectCard
                icon={<ListTodo className="w-6 h-6 text-primary" />}
                title="TaskMask: Secure Hybrid Task & Chat Platform"
                description="Engineered a dual-mode Progressive Web Application combining a functional task manager with concealed secure communication. Implemented trigger-based UI that switches between public To-Do list and private real-time messaging. Built low-latency communication using Node.js and Socket.io."
                tags={["PWA", "Node.js", "Socket.io", "WebRTC"]}
                ongoing
              />
              <ProjectCard
                icon={<GraduationCap className="w-6 h-6 text-primary" />}
                title="AI-Based Smart Assessment System"
                description="Developed a secure online assessment platform with facial and fingerprint authentication to ensure exam integrity. Integrated OCR and NLP models to evaluate handwritten and typed responses. Designed analytics dashboards providing performance insights and automated grading summaries."
                tags={["Python", "NLP", "OCR", "Secure Authentication"]}
              />
              <ProjectCard
                icon={<Plane className="w-6 h-6 text-primary" />}
                title="Emergency Landing Recommender System"
                description="Built an AI-driven decision support system recommending optimal emergency landing locations using aircraft, fuel, and terrain data. Developed a real-time prediction pipeline using scikit-learn and Flask. Improved decision reliability by incorporating weather conditions, terrain constraints, and runway suitability."
                tags={["Python", "Machine Learning", "Flask", "Geospatial"]}
              />
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Achievements & Recognition
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <AchievementCard
                image="/nccpic.jpg"
                icon={<Medal className="w-6 h-6 text-amber-500" />}
                title="NCC Army Wing Excellence"
                subtitle="Leadership & Dedication"
                items={[
                  {
                    icon: <FileText className="w-5 h-5" />,
                    title: "NCC Certificates",
                    description:
                      "Successfully achieved A Certificate, B Certificate, and C Certificate, demonstrating progressive excellence in physical training and discipline.",
                  },
                  {
                    icon: <Trophy className="w-5 h-5" />,
                    title: "CQMS Rank Achievement",
                    description:
                      "Achieved Company Quarter Master Sergeant (CQMS) rank by showcasing exceptional leadership skills, determination, and dedication to service.",
                  },
                ]}
              />
              <AchievementCard
                image="/mc.jpg"
                icon={<Mic className="w-6 h-6 text-amber-500" />}
                title="Master of Ceremonies"
                subtitle="Communication Excellence"
                items={[
                  {
                    icon: <Medal className="w-5 h-5" />,
                    title: "Army Day Celebration Medal",
                    description:
                      "Awarded medal for emceeing at Karnataka and Kerala Sub Area - Army Day Celebration 2025.",
                  },
                ]}
              />
            </div>

            {/* Certifications */}
            <GlowCard className="mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <Medal className="w-6 h-6 text-amber-500" />
                  Professional Certifications
                </h3>
                <p className="text-muted-foreground text-sm mb-8 max-w-2xl mx-auto">
                  Continuous learning and professional development through
                  industry-recognized certifications
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: <Code className="w-6 h-6" />, text: "NPTEL - Data Science for Engineering" },
                    { icon: <Database className="w-6 h-6" />, text: "IBM - Enterprise Data Science" },
                    { icon: <Brain className="w-6 h-6" />, text: "IBM - Machine Learning for Data Science" },
                    { icon: <Code className="w-6 h-6" />, text: "Infosys - Python Foundation" },
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center"
                    >
                      <div className="text-primary">{cert.icon}</div>
                      <span className="text-sm font-medium">{cert.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* Talents & Interests */}
            <GlowCard>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  Talents & Interests
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Creative & Athletic Pursuits
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-border">
                      <Image
                        src="/singing.jpg"
                        alt="Music"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Music className="w-4 h-4 text-primary" />
                        Music & Composition
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Singer, composer, and lyricist with a YouTube channel.
                        Songs available on all major music platforms.{" "}
                        <Link
                          href="https://www.youtube.com/@harshithbngowda"
                          target="_blank"
                          className="text-primary hover:underline"
                        >
                          Visit Channel
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-border">
                      <Image
                        src="/badminton.jpg"
                        alt="Sports"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Dumbbell className="w-4 h-4 text-primary" />
                        Sports & Athletics
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Multi-sport athlete excelling in badminton, athletics, and
                        chess. Active participant in various competitions,
                        tournaments, and inter-collegiate sports events.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-muted/50 rounded-xl md:col-span-2">
                    <div className="text-primary flex-shrink-0">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Hackathons & Innovation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Active participant in hackathons, bringing innovative
                        solutions to real-world problems through collaborative
                        coding and creative thinking.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-muted/50 rounded-xl md:col-span-2">
                    <div className="text-primary flex-shrink-0">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">2D Animation</h4>
                      <p className="text-sm text-muted-foreground">
                        Skilled in digital art and 2D animation, bringing stories
                        and concepts to life through creative visual storytelling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Let&apos;s Connect!</h3>
                  <p className="text-muted-foreground text-lg">
                    I&apos;m always open to discussing new opportunities,
                    collaborations, or just having a friendly chat about
                    technology and innovation.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <Link href="mailto:hbngowda@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        hbngowda@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <Link href="tel:+918722796999" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        +91-8722796999
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <Link href="https://linkedin.com/in/harshith-b-n-78b2692a5" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        linkedin.com/in/harshith-b-n
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Connect With Me</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="https://linkedin.com/in/harshith-b-n-78b2692a5" target="_blank" className="flex items-center gap-2 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:border-[#0077b5] hover:text-[#0077b5] transition-colors">
                      <Linkedin className="w-5 h-5" />
                      <span className="font-medium text-sm">LinkedIn</span>
                    </Link>
                    <Link href="https://www.youtube.com/@harshithbngowda" target="_blank" className="flex items-center gap-2 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:border-red-500 hover:text-red-500 transition-colors">
                      <Youtube className="w-5 h-5" />
                      <span className="font-medium text-sm">YouTube</span>
                    </Link>
                    <Link href="https://instagram.com/harshithbngowda" target="_blank" className="flex items-center gap-2 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:border-pink-500 hover:text-pink-500 transition-colors">
                      <Instagram className="w-5 h-5" />
                      <span className="font-medium text-sm">Instagram</span>
                    </Link>
                    <Link href="mailto:hbngowda@gmail.com" className="flex items-center gap-2 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:border-green-500 hover:text-green-500 transition-colors">
                      <Mail className="w-5 h-5" />
                      <span className="font-medium text-sm">Email</span>
                    </Link>
                  </div>
                </div>
              </div>

              <GlowCard>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Send Me a Message
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Let&apos;s create something amazing together!
                  </p>
                </div>

                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/success" className="space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="hidden">
                    <input name="bot-field" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 pl-12 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="relative">
                      <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 pl-12 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="relative">
                    <input type="text" name="subject" placeholder="Subject" required className="w-full px-4 py-3 pl-12 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="relative">
                    <textarea name="message" placeholder="Your Message" rows={5} required className="w-full px-4 py-3 pl-12 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
                    <Send className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  </div>

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">
              &copy; 2024 Harshith B N. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              Designed with passion for innovation.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

