"use client"

// import React, { useState } from 'react';
// import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// export default function GeometricLoginPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted:', formData);
//   };

//   const AnimatedBackground = () => (
//     <div className="absolute inset-0 overflow-hidden">
//       {/* Floating Orbs */}
//       {Array.from({ length: 12 }, (_, i) => (
//         <div
//           key={`orb-${i}`}
//           className="absolute rounded-full opacity-20 animate-pulse"
//           style={{
//             width: `${Math.random() * 200 + 100}px`,
//             height: `${Math.random() * 200 + 100}px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             background: `linear-gradient(45deg, 
//               hsl(${Math.random() * 360}, 70%, 60%), 
//               hsl(${Math.random() * 360}, 70%, 80%))`,
//             animation: `float ${5 + Math.random() * 10}s ease-in-out infinite alternate`,
//             animationDelay: `${Math.random() * 5}s`
//           }}
//         />
//       ))}
      
//       {/* Gradient Waves */}
//       <div className="absolute inset-0">
//         <div 
//           className="absolute w-full h-full opacity-30"
//           style={{
//             background: `
//               radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
//               radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
//               radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.4) 0%, transparent 50%)
//             `,
//             animation: 'gradientShift 10s ease-in-out infinite alternate'
//           }}
//         />
//       </div>
      
//       {/* Mesh Pattern */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px'
//         }}
//       />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative">
//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0px) rotate(0deg); }
//           100% { transform: translateY(-20px) rotate(10deg); }
//         }
        
//         @keyframes gradientShift {
//           0% { transform: translateX(-10px) translateY(-10px); }
//           100% { transform: translateX(10px) translateY(10px); }
//         }
        
//         .glass-effect {
//           backdrop-filter: blur(20px);
//           background: rgba(255, 255, 255, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }
//       `}</style>
      
//       <AnimatedBackground />
      
//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
//             <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">
//             {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
//           </h1>
//           <p className="text-gray-300">
//             {isLogin ? 'Sign in to continue to your account' : 'Join us and start your journey'}
//           </p>
//         </div>

//         {/* Login/Signup Form */}
//         <div className="glass-effect rounded-2xl p-8 shadow-2xl">
//           <div className="space-y-6">
//             {!isLogin && (
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//             )}

//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email or phone number"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full pl-12 pr-12 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               {isLogin ? 'Sign In' : 'Sign Up'}
//             </button>
//           </div>

//           {/* Alternative Login Options */}
//           <div className="mt-8 space-y-3">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md">
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               <span>Sign in with Google</span>
//             </button>

//             <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md">
//               Login as Admin
//             </button>

//             <button className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md">
//               Skip Login
//             </button>
//           </div>

//           {/* Toggle Login/Signup */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <button
//                 type="button"
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="ml-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
//               >
//                 {isLogin ? 'Sign up now' : 'Sign in'}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = [heroRef, aboutRef, skillsRef, projectsRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = [
    { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', level: 88, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 82, color: 'from-indigo-400 to-indigo-600' },
    { name: 'UI/UX Design', level: 78, color: 'from-purple-400 to-purple-600' }
  ];

  const projects = [
    {
      title: 'AI-Powered Dashboard',
      description: 'Modern analytics dashboard with real-time data visualization and machine learning insights.',
      tech: ['React', 'D3.js', 'Python', 'TensorFlow'],
      gradient: 'from-cyan-400 via-blue-500 to-purple-600'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced filtering, payment integration, and admin panel.',
      tech: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
      gradient: 'from-pink-400 via-red-500 to-orange-500'
    },
    {
      title: 'Mobile Finance App',
      description: 'Cross-platform mobile app for personal finance management with biometric authentication.',
      tech: ['React Native', 'Firebase', 'Plaid API', 'Redux'],
      gradient: 'from-green-400 via-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cursor Glow Effect */}
      <div 
        className="fixed w-64 h-64 pointer-events-none z-50 transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)`,
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transform: `scale(${scrollY > 100 ? 0.8 : 1})`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio
          </div>
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(
                  section === 'home' ? heroRef :
                  section === 'about' ? aboutRef :
                  section === 'skills' ? skillsRef :
                  section === 'projects' ? projectsRef : contactRef
                )}
                className={`capitalize transition-all duration-300 hover:text-purple-400 ${
                  activeSection === section ? 'text-purple-400' : 'text-white/70'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-1 h-1 bg-white/30 rounded-full" />
            </div>
          ))}
        </div>

        <div 
          className="relative z-10 text-center transform transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 800
          }}
        >
          <div className="mb-8 transform transition-all duration-1000 delay-300">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="inline-block animate-bounce" style={{animationDelay: '0s'}}>H</span>
              <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>e</span>
              <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>l</span>
              <span className="inline-block animate-bounce" style={{animationDelay: '0.3s'}}>l</span>
              <span className="inline-block animate-bounce" style={{animationDelay: '0.4s'}}>o</span>
              <span className="mx-4">👋</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-light bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              I'm a Creative Developer
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with cutting-edge technology and stunning design
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection(aboutRef)}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef} 
        id="about" 
        className="py-32 px-6 relative"
      >
        <div className="max-w-6xl mx-auto">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-xl text-white/80 leading-relaxed">
                  I'm a passionate full-stack developer with over 5 years of experience creating 
                  digital solutions that combine beautiful design with powerful functionality.
                </p>
                <p className="text-xl text-white/80 leading-relaxed">
                  My journey in tech started with curiosity and has evolved into a deep love for 
                  crafting experiences that make a difference in people's lives.
                </p>
                <div className="flex gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">50+</div>
                    <div className="text-white/60">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400">5+</div>
                    <div className="text-white/60">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">100%</div>
                    <div className="text-white/60">Passion</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full animate-spin" 
                       style={{animationDuration: '10s'}} />
                  <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center">
                      <Code className="w-20 h-20 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={skillsRef} 
        id="skills" 
        className="py-32 px-6 bg-gradient-to-b from-purple-900/10 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 hover:scale-105 transition-transform duration-300">
                <Code className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2">Frontend</h3>
                <p className="text-white/70">React, Vue, Angular, TypeScript</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-white/10 hover:scale-105 transition-transform duration-300">
                <Smartphone className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold mb-2">Backend</h3>
                <p className="text-white/70">Node.js, Python, PostgreSQL</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-900/20 to-orange-900/20 border border-white/10 hover:scale-105 transition-transform duration-300">
                <Palette className="w-16 h-16 mx-auto mb-4 text-pink-400" />
                <h3 className="text-2xl font-bold mb-2">Design</h3>
                <p className="text-white/70">Figma, Adobe XD, UI/UX</p>
              </div>
            </div>

            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-semibold">{skill.name}</span>
                    <span className="text-white/70">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 delay-${index * 100}`}
                      style={{
                        width: isVisible.skills ? `${skill.level}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={projectsRef} 
        id="projects" 
        className="py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.title}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 ${
                    isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{transitionDelay: `${index * 200}ms`}}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="relative p-8 bg-black/50 backdrop-blur-sm h-full">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                        <Github className="w-5 h-5" />
                        Code
                      </button>
                      <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef} 
        id="contact" 
        className="py-32 px-6 bg-gradient-to-t from-purple-900/10 to-black"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <a 
                href="mailto:hello@portfolio.com"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Send Email
              </a>
              
              <div className="flex gap-4">
                <a 
                  href="#"
                  className="p-4 border-2 border-white/30 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="#"
                  className="p-4 border-2 border-white/30 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div className="text-white/50">
              © 2025 Portfolio. Crafted with ❤️ and React
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;