import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaNodeJs, FaPython, FaGitAlt, FaJira, FaCloud, FaSun, FaMoon, FaGithub, FaLinkedin
} from 'react-icons/fa'
import { 
  SiJavascript, SiRedux, SiMui, SiExpress, SiMysql, SiMongodb, 
  SiReact, SiFlutter, SiNotion,
  SiTypescript
} from 'react-icons/si'


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [activeSection, setActiveSection] = useState('about')

  // Theme toggle effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Add this useEffect for handling active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2 // Changed to center of viewport

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const offsetTop = rect.top + window.scrollY
          const offsetBottom = offsetTop + rect.height

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check for active section
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    console.log(activeSection)
  }

  const skillsData = {
    frontend: [
      { name: 'HTML', icon: <FaHtml5 className="text-[#E34F26]" /> },
      { name: 'CSS', icon: <FaCss3Alt className="text-[#1572B6]" /> },
      { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-[#007ACC]" /> },
      { name: 'React.js', icon: <FaReact className="text-[#61DAFB]" /> },
      { name: 'Redux', icon: <SiRedux className="text-[#764ABC]" /> },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-[#7952B3]" /> },
      { name: 'Material-UI', icon: <SiMui className="text-[#007FFF]" /> },
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" /> },
      { name: 'Express.js', icon: <SiExpress className="text-white" /> },
      { name: 'Python', icon: <FaPython className="text-[#3776AB]" /> },
      { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
    ],
    mobile: [
      { name: 'React Native', icon: <SiReact className="text-[#61DAFB]" /> },
      { name: 'Flutter', icon: <SiFlutter className="text-[#02569B]" /> },
    ],
    tools: [
      { name: 'Git', icon: <FaGitAlt className="text-[#F05032]" /> },
      { name: 'Jira', icon: <FaJira className="text-[#0052CC]" /> },
      { name: 'Notion', icon: <SiNotion className="text-white" /> },
      { name: 'Azure', icon: <FaCloud className="text-[#0078D4]" /> },
    ],
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-primary' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed w-full ${isDarkMode ? 'bg-primary/90' : 'bg-white/90'} backdrop-blur-sm z-50 transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-2xl font-bold ${isDarkMode ? 'text-secondary' : 'text-primary'}`}
            >
              Kiran.tech
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`${
                      isDarkMode 
                        ? 'text-textPrimary hover:text-secondary font-semibold' 
                        : 'text-primary hover:text-blue-800 font-semibold'
                    } transition-colors`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-tertiary text-secondary' : 'bg-gray-200 text-primary'} transition-colors duration-300`}
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/Kiran19122001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl ${isDarkMode ? 'text-textPrimary hover:text-secondary' : 'text-primary hover:text-secondary'} transition-colors`}
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/kiran-bandla-a1b16b241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl ${isDarkMode ? 'text-textPrimary hover:text-secondary' : 'text-primary hover:text-secondary'} transition-colors`}
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden ${isDarkMode ? 'text-textPrimary' : 'text-primary'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`block ${
                      isDarkMode 
                        ? 'text-textPrimary hover:text-secondary' 
                        : 'text-primary hover:text-secondary'
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
              {/* Mobile Theme Toggle and Social Links */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary/20">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-tertiary text-secondary' : 'bg-gray-200 text-primary'} transition-colors duration-300`}
                >
                  {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                </button>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/Kiran19122001/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl ${isDarkMode ? 'text-textPrimary hover:text-secondary' : 'text-primary hover:text-secondary'} transition-colors`}
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kiran-bandla-a1b16b241/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl ${isDarkMode ? 'text-textPrimary hover:text-secondary' : 'text-primary hover:text-secondary'} transition-colors`}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16">
        <div className="container text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl sm:text-6xl font-bold mb-4 ${isDarkMode ? 'text-textPrimary' : 'text-primary'}`}>
              Hi, I'm <span className={`${isDarkMode ? 'text-secondary' : 'text-blue-800'}`}>Kiran Bandla</span>
            </h1>
            <p className={`text-xl sm:text-2xl mb-8 ${isDarkMode ? 'text-textSecondary' : 'text-gray-600'}`}>
              Software Development Engineer
            </p>
            <div className='flex justify-center gap-4'>
               <div className="flex justify-center gap-4">
              <a
                href="#contact"
                className={`${isDarkMode ? 'bg-secondary text-primary inline-block px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors' : 'bg-primary text-secondary inline-block px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'}`}
              >
                Get in Touch
              </a>
            </div>
            <div className="flex justify-center gap-5">
              <a href="https://drive.google.com/file/d/1LmsHodvsgdoblVMJijzLcWWJ3b3_Bz7E/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <button className={`${isDarkMode ? 'bg-secondary text-primary inline-block px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors' : 'bg-primary text-secondary inline-block px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'}`}>
                  Download Resume
                </button>
              </a>
            </div>
           </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${isDarkMode ? 'bg-tertiary' : 'bg-gray-100'} section`}>
        <div className="container">
          <h2 className={`${isDarkMode ? 'text-textPrimary' : 'text-primary'} heading`}>About Me</h2>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className={`text-lg ${isDarkMode ? 'text-textSecondary' : 'text-gray-600'} leading-relaxed`}>
                As a recent MCA (Master of Computer Applications) graduate from the class of 2024, I bring a fresh perspective and strong foundation in modern software development practices.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-textSecondary' : 'text-gray-600'} leading-relaxed`}>
                I'm a passionate tech enthusiast with an insatiable curiosity for emerging technologies. My goal is to push the boundaries of what's possible in software development while continuously expanding my expertise across different domains and technologies.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-textSecondary' : 'text-gray-600'} leading-relaxed`}>
                What drives me is the opportunity to tackle challenging problems and create innovative solutions. I believe in the power of continuous learning and staying ahead of industry trends to deliver cutting-edge solutions that make a real impact.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {['Problem Solving', 'Quick Learner', 'Simplification', 'Innovative Thinking'].map((trait) => (
                  <span
                    key={trait}
                    className={`px-4 py-2 ${isDarkMode ? 'bg-primary rounded-full border border-secondary/20 text-textPrimary' : 'bg-grey-700 rounded-full border border-primary/20 text-primary'}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="container">
          <h2 className={`${isDarkMode ? 'text-textPrimary' : 'text-primary'} heading`}>Experience</h2>
          <div className="space-y-12">
            {/* Experience Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative pl-8 ${isDarkMode ? 'border-l-2 border-secondary' : 'border-l-2 border-primary'}`}
            >
              <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-secondary' : 'bg-primary'}`}></div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-textPrimary' : 'text-primary'}`}>Software Development Engineer</h3>
              <p className={`${isDarkMode ? 'text-secondary' : 'text-primary'}`}>Mitt Arv Technologies • 2024 - Present</p>
              <ul className={`mt-4 space-y-2 ${isDarkMode ? 'text-textSecondary' : 'text-primary'}`}>
                <li>• Implemented <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>lockedIn</span> security feature for locking sensitive data with a <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>password</span>, including a password reset option using <span className={`${isDarkMode ? 'text-white font-medium':'text-black font-medium'}`}>security questions</span>.</li>
                
                <li>• Architected and implemented comprehensive <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>payment systems</span> integrating <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>Google Play Console</span>, <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>Apple App Store</span>, and <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>BillDesk</span>, including complex backend logic, intuitive frontend UI, and optimized MySQL database schemas, resulting in seamless <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>transaction processing</span>.</li>
                
                <li>• Engineered robust authentication systems with SSO implementation and enhanced security protocols, while managing <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>Google Play</span> and <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>Apple App Store subscriptions</span> to ensure reliable user access and smooth <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>in-app purchase</span> flows.</li>
                
                <li>• Developed and integrated Google Cloud Real-Time Developer Notifications (RTDN) system for <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>subscription</span> event monitoring, improving real-time tracking and automated handling of <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>subscription lifecycles</span>.</li>
                
                <li>• Worked on <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>backend services</span> and created heigh level <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>database schemas</span> for the app and website.</li>
              </ul>
            </motion.div>

            {/* Experience Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`relative pl-8 ${isDarkMode ? 'border-l-2 border-secondary' : 'border-l-2 border-primary'}`}
            >
              <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full ${isDarkMode ? 'bg-secondary' : 'bg-primary'}`}></div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-textPrimary' : 'text-primary'}`}>Software Engineer Intern</h3>
              <p className={`${isDarkMode ? 'text-secondary':'text-primary'}`}>Mitt Arv Technologies • 2024 March - September</p>
              <ul className={`mt-4 space-y-2 ${isDarkMode ? 'text-textSecondary' : 'text-primary'}`}>
                <li>• Worked on <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>splash screen</span> and <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>onboarding screens</span> of the app and website</li>
                <li>• Implemented a new feature for adding <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>multiple email accounts</span> to the user's account</li>
                <li>• Developed a feature to track user <span className={`${isDarkMode ? 'text-white font-medium':'text-primary font-bold'}`}>storage usage</span> across different products on the platform</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className={`${isDarkMode?'heading':'text-primary heading'}`}>My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Travel Ticket Booking App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${isDarkMode?'bg-tertiary':'bg-gray-200'} rounded-xl overflow-hidden group`}
              // className="bg-tertiary rounded-xl overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-secondary mb-2">
                  <SiReact className="text-2xl" />
                  <h3 className={`text-xl font-bold ${isDarkMode?'text-textPrimary':'text-primary'}`}>Travel Ticket Booking App</h3>
                </div>
                <p className={`${isDarkMode?'text-textSecondary':'text-primary'} leading-relaxed`}>
                  A cross-platform mobile application built with React Native that enables users to book travel tickets seamlessly. Features include user authentication, real-time seat selection, secure payment integration, and booking management.
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                  {['React Native', 'Node.js', 'MongoDB', 'Express.js', 'Redux'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary rounded-full text-sm text-textPrimary border border-secondary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="https://github.com/kiranwork000/ramkholidays"
                    target="_blank"
                    className={`${isDarkMode?'text-secondary hover:text-secondary/80 ':'text-primary'} transition-colors flex items-center gap-2`}
                  >
                    <span>View Project</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* E-commerce Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${isDarkMode?'bg-tertiary':'bg-gray-200'} rounded-xl overflow-hidden group`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-secondary mb-2">
                  <FaReact className="text-2xl" />
                  <h3 className={`text-xl font-bold ${isDarkMode?'text-textPrimary':'text-primary'}`}>Foodie</h3>
                </div>
                <p className={`${isDarkMode?'text-textSecondary':'text-primary'} leading-relaxed`}>
                  A full-stack Recipes platform built with React.js featuring a responsive design, product catalog, cart functionality, user authentication. Implements modern UI/UX practices for an optimal user experience.
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Redux', 'Material-UI'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary rounded-full text-sm text-textPrimary border border-secondary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="https://github.com/Kiran19122001/foodie-frontend"
                    target="_blank"
                    className={`${isDarkMode?'text-secondary hover:text-secondary/80 ':'text-primary'} transition-colors flex items-center gap-2`}
                  >
                    <span>View Project</span> 
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`${isDarkMode?'section bg-tertiary':'section bg-gray-100'}`}>
        <div className="container">
          <h2 className={`${isDarkMode?'text-textPrimary':'text-primary'} heading`}>Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Object.entries(skillsData).flatMap(([category, skills]) =>
              skills.map((skill, index) => (
                <motion.div
                  key={`${category}-${skill.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group ${isDarkMode?'bg-primary p-6 rounded-xl border border-secondary/20 hover:border-secondary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-secondary/20':'bg-gray-200 p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20'}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`text-4xl transition-transform duration-300 ${isDarkMode?'group-hover:scale-110':'group-hover:scale-110'}`}>
                      {skill.icon}
                    </div>
                    <p className={`${isDarkMode?'text-textPrimary':'text-primary'} text-center font-medium`}>{skill.name}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className={`${isDarkMode?'text-textPrimary':'text-primary'} heading`}>Get in Touch</h2>
          <p className={`${isDarkMode?'text-textSecondary':'text-primary'} mb-8`}>
            I'm currently open to new opportunities and collaborations.
          </p>
          <a
            href="mailto:kiranban0011@gmail.com"
            className={`${isDarkMode?'inline-block bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors':'inline-block bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors'}`}
          >
            Send me an email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-tertiary' : 'bg-gray-200'} py-8 transition-colors duration-300`}>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${isDarkMode ? 'text-textSecondary' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Kiran Bandla. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Kiran19122001/"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${isDarkMode ? 'text-textPrimary hover:text-secondary' : 'text-primary hover:text-secondary'} transition-colors`}
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/kiran-bandla-a1b16b241/"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${isDarkMode ? 'text-textPrimary hover:text-secondary' : 'text-primary hover:text-secondary'} transition-colors`}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
