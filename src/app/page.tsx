"use client";
import React, { useEffect, useState, JSX } from "react";

// Define the type for the status message object
interface StatusMessage {
  text: string;
  color: string;
}

// Define the types for the skills object
interface Skills {
  frontend: string[];
  backend: string[];
  languagesTools: string[];
}

// Main App component
const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null
  );
  const [heroText, setHeroText] = useState<string>("");
  const fullText =
    "A Full-Stack Developer with a passion for building responsive, high-performance web applications.";

  // Typing effect for the hero section
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setHeroText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed here
    return () => clearInterval(typingInterval);
  }, []);

  // Intersection Observer to handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".section-header, .animated-card")
      .forEach((element) => {
        observer.observe(element);
      });
  }, []);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    if (!name || !email || !message) {
      setStatusMessage({
        text: "Please fill out all fields.",
        color: "text-red-500",
      });
      return;
    }

    // Simulate form submission
    setStatusMessage({ text: "Sending message...", color: "text-yellow-500" });

    setTimeout(() => {
      setStatusMessage({
        text: "Message sent successfully!",
        color: "text-green-500",
      });
      form.reset();
    }, 2000);
  };

  const skills: Skills = {
    frontend: [
      "React.js",
      "Next.js",
      "Redux",
      "SCSS, HTML5, CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
    backend: ["Node.js", "Express.js", "REST API Integration"],
    languagesTools: [
      "JavaScript",
      "TypeScript",
      "Python",
      "MySQL",
      "Git",
      "Bitbucket",
      "Jira",
    ],
  };

  const renderSkillBadges = (skillArray: string[]): JSX.Element => (
    <div className="flex flex-wrap gap-2">
      {skillArray.map((skill, index) => (
        <span
          key={index}
          className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-teal-500"
        >
          {skill}
        </span>
      ))}
    </div>
  );

  return (
    <div className="antialiased font-inter bg-[#0a0a0a] text-[#E0E0E0] overflow-x-hidden">
      <style>{`
        .section-header {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .section-header.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .animated-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animated-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .hero-typing-text::after {
          content: '|';
          animation: blink-caret 1s step-end infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white; }
        }
        .glowing-card {
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
          transition: box-shadow 0.3s ease-in-out;
        }
        .glowing-card:hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 0.5rem;
          background-color: #1a1a1a;
          border: 1px solid #2a2a2a;
          transition: transform 0.3s ease, background-color 0.3s ease;
          cursor: pointer;
        }
        .contact-item:hover {
          transform: translateY(-5px);
          background-color: #262626;
        }
      `}</style>

      {/* Header & Navigation */}
      <header className="bg-gray-950 fixed top-0 inset-x-0 z-50 shadow-xl">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-teal-400">
            Hari.
          </a>
          <div className="space-x-4 hidden md:block">
            <a href="#about" className="hover:text-teal-400 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-teal-400 transition-colors">
              Skills
            </a>
            <a
              href="#experience"
              className="hover:text-teal-400 transition-colors"
            >
              Experience
            </a>
            <a
              href="#education"
              className="hover:text-teal-400 transition-colors"
            >
              Education
            </a>
            <a
              href="#contact"
              className="hover:text-teal-400 transition-colors"
            >
              Contact
            </a>
          </div>
          <button
            id="mobile-menu-button"
            onClick={toggleMobileMenu}
            className="md:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-4 6h4"
              ></path>
            </svg>
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-gray-950 px-4 py-2">
            <a
              href="#about"
              onClick={toggleMobileMenu}
              className="block py-2 hover:text-teal-400 transition-colors border-b border-gray-700"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={toggleMobileMenu}
              className="block py-2 hover:text-teal-400 transition-colors border-b border-gray-700"
            >
              Skills
            </a>
            <a
              href="#experience"
              onClick={toggleMobileMenu}
              className="block py-2 hover:text-teal-400 transition-colors border-b border-gray-700"
            >
              Experience
            </a>
            <a
              href="#education"
              onClick={toggleMobileMenu}
              className="block py-2 hover:text-teal-400 transition-colors border-b border-gray-700"
            >
              Education
            </a>
            <a
              href="#contact"
              onClick={toggleMobileMenu}
              className="block py-2 hover:text-teal-400 transition-colors border-b border-gray-700"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-4 py-16 bg-gradient-to-br from-gray-950 to-gray-800">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Hi, I&apos;m <span className="text-teal-400">Harikrishna</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 hero-typing-text">
            {heroText}
          </p>
          <a
            href="#contact"
            className="bg-teal-500 hover:bg-teal-600 transition-all text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 active:scale-95 duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 section-header">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-8 md:mb-0 glowing-card">
              <img
                src="https://placehold.co/192x192/475569/E2E8F0?text=HK"
                alt="Harikrishna K"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 text-lg text-gray-300 animated-card">
              <p className="mb-4">
                I am a full-stack developer with over 2 years of experience
                crafting dynamic and scalable web solutions. My expertise spans
                from building responsive user interfaces with <i>React.js</i>{" "}
                and <i>Next.js</i> to developing robust backend systems with{" "}
                <i>Node.js</i> and <i>Express.js</i>.
              </p>
              <p>
                I am proficient in database management using <i>MySQL</i> and
                adept at implementing REST APIs, ensuring seamless data flow. I
                thrive in Agile environments, committed to writing clean,
                maintainable code and collaborating with teams to deliver
                exceptional digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 section-header">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-xl font-semibold text-teal-400 mb-4">
                Frontend
              </h3>
              {renderSkillBadges(skills.frontend)}
            </div>
            {/* Backend */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-xl font-semibold text-teal-400 mb-4">
                Backend
              </h3>
              {renderSkillBadges(skills.backend)}
            </div>
            {/* Languages & Tools */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-xl font-semibold text-teal-400 mb-4">
                Languages & Tools
              </h3>
              {renderSkillBadges(skills.languagesTools)}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 section-header">
            Experience
          </h2>
          <div className="space-y-12">
            {/* Associate Engineer */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Associate Engineer - Full Stack Developer
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Dbiz.ai | Oct 2024 - Present
              </p>
              <p className="text-lg text-teal-400 font-medium mb-2">
                Project: Real Estate Property Listing Website
              </p>
              <p className="text-gray-300 mb-4">
                A platform for listing, filtering, and managing real estate
                properties for customers and agents. Resolved critical frontend
                issues and enhanced application stability. Addressed
                customer-reported issues, reducing support tickets by 25%.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Next.js
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  TypeScript
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Datadog
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Jira
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Azure DevOps
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Salesforce
                </span>
              </div>
            </div>

            {/* Junior Engineer */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Junior Engineer - Frontend Developer
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Dbiz.ai | Jan 2024 - Oct 2024
              </p>
              <p className="text-lg text-teal-400 font-medium mb-2">
                Project: Review Management Platform
              </p>
              <p className="text-gray-300 mb-4">
                A tool for collecting, displaying, and responding to customer
                reviews across various platforms. Contributed to building
                reusable <i>React</i> components and implemented <i>Redux</i>{" "}
                for efficient and scalable state management.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  React.js
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Redux
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  TypeScript
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  SCSS
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Bitbucket
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Storybook
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Ant Design
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Jira
                </span>
              </div>
            </div>

            {/* Graduate Engineer */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Graduate Engineer (JOE) - Training Phase
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Dbiz.ai | Jul 2023 - Jan 2024
              </p>
              <p className="text-gray-300 mb-4">
                Completed hands-on training in <i>JavaScript</i>,{" "}
                <i>React.js</i>, <i>Redux</i>, and Git, building over 3
                mini-projects to simulate real-world scenarios. Learned to work
                in an Agile environment and use version control tools.
              </p>
            </div>

            {/* Freelance Web Designer */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Freelance Web Designer
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Self-employed | Apr 2023 - 2023
              </p>
              <p className="text-gray-300 mb-4">
                Developed and customized WordPress sites using <i>HTML</i>,{" "}
                <i>CSS</i>, and Elementor. Collaborated with senior team members
                to deliver high-quality projects.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  HTML
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  CSS
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  JavaScript
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Figma
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Canva
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  WordPress
                </span>
                <span className="bg-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                  Elementor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 section-header">
            Education
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md animated-card glowing-card">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Sathyabama Institute of Science and Technology, Chennai
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Bachelor of Engineering - Computer Science and Engineering
            </p>
            <p className="text-sm text-gray-400">July 2019 - July 2023</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 section-header">
            Contact Me
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animated-card">
            <div className="contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-400 flex-shrink-0"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a
                href="mailto:k.harikris59@gmail.com"
                className="text-lg text-gray-300 hover:text-teal-400 transition-colors"
              >
                k.harikris59@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-400 flex-shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-4.62-4.62A19.79 19.79 0 0 1 2 3.18 2 2 0 0 1 4.18 1h3.18a2 2 0 0 1 2 1.72c.15.96.44 1.96.9 2.92a2 2 0 0 1-.98 2.3L7.75 11.25a17.6 17.6 0 0 0 6.56 6.56l1.53-1.54a2 2 0 0 1 2.3-.98c.96.46 1.96.75 2.92.9a2 2 0 0 1 1.72 2v3z" />
              </svg>
              <a
                href="tel:+917358882652"
                className="text-lg text-gray-300 hover:text-teal-400 transition-colors"
              >
                +91-7358882652
              </a>
            </div>
            <div className="contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-400 flex-shrink-0"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="3" />
              </svg>
              <span className="text-lg text-gray-300">
                Tirupur, Tamil nadu, India
              </span>
            </div>
          </div>

          <form
            id="contact-form"
            onSubmit={handleFormSubmit}
            className="space-y-6 animated-card max-w-3xl mx-auto"
          >
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your Message"
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 transition-all text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 duration-200"
            >
              Send Message
            </button>
          </form>
          <div
            className={`mt-6 text-center font-medium ${statusMessage?.color}`}
          >
            {statusMessage?.text}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-6 text-center text-gray-400">
        <p>Designed and Developed by Harikrishna</p>
      </footer>
    </div>
  );
};

export default App;
