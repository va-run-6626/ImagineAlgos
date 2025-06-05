import React, { useState, useEffect } from "react";
import {
  Github,
  Code,
  Heart,
  Zap,
  Terminal,
  User,
  Target,
  Coffee,
  Send,
  Mail,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm text-center">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-400 mb-2 font-mono">
            Message.Sent()
          </h3>
          <p className="text-gray-400 font-mono">
            // Thanks for reaching out! We'll get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-8 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">
                // Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                placeholder="Enter your name..."
              />
            </div>
            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">
                // Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-green-400 font-mono text-sm mb-2">
              // Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300"
            >
              <option value="">Select a topic...</option>
              <option value="bug-report">🐛 Bug Report</option>
              <option value="feature-request">✨ Feature Request</option>
              <option value="algorithm-suggestion">
                🔄 Algorithm Suggestion
              </option>
              <option value="collaboration">🤝 Collaboration</option>
              <option value="general-question">❓ General Question</option>
              <option value="feedback">💭 Feedback</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-green-400 font-mono text-sm mb-2">
              // Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-700 text-black disabled:text-gray-400 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-green-500/25 flex items-center gap-2 font-mono mx-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black animate-spin rounded-full"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send_Message()
                </>
              )}
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-green-500/20">
          <div className="grid md:grid-cols-2 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Mail size={16} className="text-cyan-400" />
              <span className="text-gray-400 font-mono text-sm">
                Response within 24hrs
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MessageSquare size={16} className="text-green-400" />
              <span className="text-gray-400 font-mono text-sm">
                Open to collaborations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [terminalText, setTerminalText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Making algorithms fun and accessible for everyone...";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  const makers = [
    {
      name: "Varun Bhutada",
      github: "https://github.com/va-run-6626",
      username: "va-run-6626",
      role: "Algorithm Architect",
      bio: "Passionate about making complex algorithms simple and visual. Loves turning mathematical concepts into interactive experiences.",
      skills: ["React", "Algorithm Design", "Data Visualization", "JavaScript"],
      commits: "342+",
    },
    {
      name: "Abhishek Soni",
      github: "https://github.com/abhisoni1921",
      username: "abhisoni1921",
      role: "Visualization Engineer",
      bio: "Expert in creating smooth, intuitive user interfaces. Dedicated to crafting beautiful animations that make learning enjoyable.",
      skills: ["Frontend Development", "Animation", "UX Design", "TypeScript"],
      commits: "298+",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 0, 0.1) 0%, transparent 50%)`,
            transition: "background-image 0.1s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-900/5 to-cyan-900/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Code Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/20 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {
              [
                "class{",
                "merge()",
                "O(log n)",
                "sort[]",
                "search()",
                "while",
                "const",
                "return",
                "if()",
                "async",
                "await",
                "===",
              ][i]
            }
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Terminal size={18} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold text-green-400 font-mono tracking-wider">
            &gt; ImagineAlgo_
          </h2>
        </div>
        <nav className="flex items-center space-x-8">
          <a
            href="/"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/sorting"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./sorting
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/searching"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./searching
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/about"
            className="text-green-400 hover:text-cyan-400 transition-colors duration-300 font-mono relative group"
          >
            ./about
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Terminal Introduction */}
          <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-6 mb-12 font-mono text-sm backdrop-blur-sm max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400">about@imaginealgo:~$</span>
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">$</span> cat about.txt
              <br />
              <span className="text-cyan-400">→</span> {terminalText}
              {showCursor && <span className="animate-pulse">|</span>}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 font-mono">
              <span className="text-white">&lt;</span>
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                About
              </span>
              <span className="text-white">/&gt;</span>
            </h1>

            <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900/60 to-black/60 border border-green-500/20 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-6">
                <Target size={32} className="text-cyan-400 mr-3" />
                <h2 className="text-3xl font-bold text-white font-mono">
                  Our Mission
                </h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-mono">
                <span className="text-cyan-400">//</span> We believe algorithms
                shouldn't be intimidating.
                <br />
                <span className="text-cyan-400">//</span> Our goal is to
                transform complex sorting & searching
                <br />
                <span className="text-cyan-400">//</span> algorithms into{" "}
                <span className="text-green-400 font-bold">
                  fun, visual experiences
                </span>
                <br />
                <span className="text-cyan-400">//</span> that make learning
                intuitive and enjoyable.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Heart size={20} className="text-red-400" />
                  <span className="text-gray-400 font-mono">
                    Made with passion
                  </span>
                </div>
                <div className="text-gray-500">|</div>
                <div className="flex items-center space-x-2">
                  <Zap size={20} className="text-yellow-400" />
                  <span className="text-gray-400 font-mono">
                    Powered by curiosity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 font-mono">
                <span className="text-green-400">&gt;</span> Meet.TheMakers()
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {makers.map((maker, index) => (
                <div key={index} className="group relative">
                  <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-8 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-103 backdrop-blur-sm">
                    {/* Profile Header */}
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                        <User size={32} className="text-black" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white font-mono">
                          {maker.name}
                        </h3>
                        <p className="text-cyan-400 font-mono text-sm">
                          {maker.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {maker.bio}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <div className="text-green-400 font-mono text-sm mb-2">
                        // Skills:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {maker.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Code size={16} className="text-cyan-400" />
                          <span className="text-gray-400 font-mono text-sm">
                            {maker.commits} commits
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Coffee size={16} className="text-yellow-600" />
                          <span className="text-gray-400 font-mono text-sm">
                            ∞ coffee
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* GitHub Link */}
                    <a
                      href={maker.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-green-600 hover:to-cyan-600 border border-gray-600 hover:border-green-400 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-mono"
                    >
                      <Github size={20} className="mr-2" />@{maker.username}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8 font-mono">
              <span className="text-green-400">&gt;</span> Built_With()
            </h2>
            <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-8 max-w-3xl mx-auto backdrop-blur-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["React", "JavaScript", "Tailwind CSS", "Lucide Icons"].map(
                  (tech, i) => (
                    <div key={i} className="text-center group">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                        <Code size={24} className="text-green-400" />
                      </div>
                      <span className="text-gray-400 font-mono text-sm">
                        {tech}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 text-cyan-400 font-mono">
                → Crafted with modern web technologies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 font-mono">
            <span className="text-green-400">&gt;</span> Contact.Us()
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded"></div>
          <p className="text-gray-400 mt-4 font-mono">
            // Got questions? Want to contribute? We'd love to hear from you!
          </p>
        </div>

        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/20 bg-black/80 backdrop-blur-sm p-6 mt-16">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-gray-400 font-mono text-sm">
            ©️ 2025 ImagineAlgo | Making Algorithms Fun Since 2025
          </div>
          <div className="text-green-400 font-mono text-sm">
            <span className="animate-pulse">●</span> Developers: Online
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
