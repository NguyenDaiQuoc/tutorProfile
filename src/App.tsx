/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Calculator, 
  Code, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  GraduationCap, 
  ChevronRight,
  Star,
  CheckCircle2,
  ExternalLink,
  X,
  Send,
  Heart,
  Sun,
  Moon,
  Download,
  Quote,
  Languages
} from "lucide-react";

const translations = {
  vi: {
    nav: {
      about: "Về tôi",
      skills: "Kỹ năng",
      awards: "Giải thưởng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      testimonials: "Đánh giá",
      contact: "Liên hệ"
    },
    hero: {
      badge: "Gia sư & Kỹ sư Phần mềm",
      title: "Chào phụ huynh, tôi là Quốc.",
      desc: "Gia sư Toán tâm huyết cho học sinh K-8 và Kỹ sư phần mềm tương lai từ Đại học Sài Gòn. Tôi kết hợp tư duy logic lập trình vào việc giảng dạy Toán học.",
      downloadCV: "Tải CV"
    },
    about: {
      title: "Về tôi",
      desc1: "Tôi hiện là sinh viên năm 3 ngành Kỹ thuật Phần mềm tại Đại học Sài Gòn. Với nền tảng kiến thức vững chắc về Toán học và Lập trình, tôi đã có hơn 2 năm kinh nghiệm dạy kèm cho học sinh từ mầm non đến lớp 8.",
      desc2: "Phương pháp giảng dạy của tôi tập trung vào việc khơi gợi sự tò mò, rèn luyện tư duy phản biện và giải quyết vấn đề thay vì chỉ học thuộc lòng công thức.",
      university: "Đại học Sài Gòn",
      major: "Kỹ sư Phần mềm (2022 — 2027)",
      stats: [
        { val: "2+", label: "Năm kinh nghiệm" },
        { val: "20+", label: "Học sinh đã dạy" },
        { val: "100%", label: "Tận tâm" },
        { val: "B", label: "Kết quả học tập" }
      ]
    },
    skills: {
      title: "Kỹ năng giảng dạy & Công nghệ",
      subtitle: "Sự kết hợp giữa tư duy Toán học và kỹ năng lập trình hiện đại.",
      teaching: "Giảng dạy & Tư duy",
      tech: "Công nghệ & Lập trình"
    },
    awards: {
      title: "Giải thưởng & Thành tích",
      subtitle: "Minh chứng cho sự nỗ lực và khả năng học thuật xuất sắc."
    },
    experience: {
      title: "Kinh nghiệm giảng dạy",
      tutor: "Gia sư Toán (Math Tutor)",
      freelance: "Tự do",
      present: "Hiện tại",
      lifeSkills: "Hướng dẫn Kỹ năng sống & Sinh tồn",
      lifeSkillsOrg: "Tổ chức Giáo dục Kỹ năng",
      methodology: {
        title: "Phương pháp giảng dạy",
        items: [
          "Ưu tiên phát triển tư duy, rèn luyện khả năng tự giải quyết vấn đề.",
          "Không dạy lý thuyết suông, luôn đi kèm ví dụ thực tiễn và ứng dụng.",
          "Kết hợp công nghệ thông tin vào giảng dạy để tăng tính trực quan và hứng thú.",
          "Theo dõi sát sao tiến độ và điều chỉnh giáo án phù hợp với từng năng lực học sinh."
        ]
      },
      survivalItems: [
        "Hướng dẫn trẻ em các kỹ năng sinh tồn cơ bản trong môi trường tự nhiên.",
        "Giáo dục kỹ năng sống, rèn luyện tính tự lập và kỷ luật cho trẻ.",
        "Xây dựng các hoạt động ngoại khóa kết hợp học tập và trải nghiệm thực tế."
      ]
    },
    skills_list: {
      teaching: [
        { name: "Toán học K-8", level: 95 },
        { name: "Giải quyết vấn đề", level: 90 },
        { name: "Tư duy logic", level: 90 },
        { name: "Kiên nhẫn", level: 100 },
        { name: "Giao tiếp", level: 85 },
        { name: "Lập kế hoạch", level: 80 }
      ],
      tech: [
        { name: "C/C++", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "TypeScript", level: 75 },
        { name: "React", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "Git/GitHub", level: 85 }
      ]
    },
    awards_list: [
      { title: "Giải Violympic Toán & Tin học", level: "Cấp Quận | Khuyến khích", year: "2013 — 2015" },
      { title: "Cuộc thi Vở sạch chữ đẹp", level: "Cấp Trường | Khuyến khích", year: "2013 — 2015" },
      { title: "Cuộc thi “Vườn Ươm”", level: "Cấp Quận | Khuyến khích", year: "2017 — 2018" },
      { title: "Cuộc thi Robot chữa cháy", level: "Cấp Thành phố | Khuyến khích", year: "2018 — 2019" }
    ],
    projects: {
      title: "Dự án công nghệ",
      subtitle: "Các ứng dụng thực tế thể hiện kỹ năng lập trình và tư duy hệ thống.",
      viewGithub: "Xem trên GitHub"
    },
    testimonials: {
      title: "Phụ huynh nói gì?",
      subtitle: "Sự tin tưởng của phụ huynh là động lực lớn nhất để tôi không ngừng hoàn thiện phương pháp giảng dạy."
    },
    testimonials_list: [
      {
        quote: "Thầy Quốc dạy rất tận tâm, con tôi từ sợ môn Toán đã trở nên yêu thích và tự tin hơn hẳn.",
        author: "Chị Lan",
        role: "Phụ huynh bé Gia Bảo"
      },
      {
        quote: "Phương pháp dạy của thầy rất hiện đại, giúp bé tư duy logic tốt hơn thay vì chỉ học thuộc lòng.",
        author: "Anh Hùng",
        role: "Phụ huynh bé Minh Anh"
      },
      {
        quote: "Con tôi tiến bộ rõ rệt sau 3 tháng học cùng thầy. Thầy không chỉ dạy kiến thức mà còn truyền cảm hứng học tập.",
        author: "Chị Mai",
        role: "Phụ huynh bé Phương Vy"
      }
    ],
    contact: {
      title: "Bạn đang tìm gia sư cho con?",
      desc: "Hãy liên hệ với tôi để trao đổi về lộ trình học tập phù hợp nhất cho bé. Tôi luôn sẵn sàng lắng nghe và chia sẻ.",
      sendEmail: "Gửi Email",
      orConnect: "Hoặc kết nối qua",
      modalTitle: "Gửi tin nhắn",
      modalDesc: "Tôi sẽ phản hồi bạn sớm nhất có thể.",
      labelName: "Họ tên",
      labelEmail: "Email",
      labelSubject: "Chủ đề",
      labelMessage: "Nội dung",
      placeholderName: "Nguyễn Văn A",
      placeholderEmail: "email@vidu.com",
      placeholderSubject: "Gia sư Toán lớp 5",
      placeholderMessage: "Chào Quốc, tôi muốn tìm hiểu về...",
      submit: "Gửi tin nhắn",
      submitting: "Đang gửi...",
      successTitle: "Cảm ơn đã tin tưởng!",
      successDesc: "Tin nhắn của bạn đã được gửi thành công. Tôi sẽ liên hệ lại với bạn qua email sớm nhất có thể.",
      close: "Đóng"
    },
    footer: "© 2026 Nguyễn Đại Quốc. Thiết kế dựa trên Portfolio Template."
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      awards: "Awards",
      experience: "Experience",
      projects: "Projects",
      testimonials: "Reviews",
      contact: "Contact"
    },
    hero: {
      badge: "Tutor & Software Engineer",
      title: "Hi Parents, I'm Quoc.",
      desc: "Dedicated Math tutor for K-8 students and future Software Engineer from Saigon University. I integrate programming logic into Mathematics teaching.",
      downloadCV: "Download CV"
    },
    about: {
      title: "About Me",
      desc1: "I am currently a 3rd-year Software Engineering student at Saigon University. With a solid foundation in Mathematics and Programming, I have over 2 years of experience tutoring students from preschool to grade 8.",
      desc2: "My teaching method focuses on sparking curiosity, training critical thinking, and problem-solving rather than just memorizing formulas.",
      university: "Saigon University",
      major: "Software Engineering (2022 — 2027)",
      stats: [
        { val: "2+", label: "Years Experience" },
        { val: "20+", label: "Students Taught" },
        { val: "100%", label: "Dedicated" },
        { val: "B", label: "Academic Results" }
      ]
    },
    skills: {
      title: "Teaching Skills & Technology",
      subtitle: "The combination of Mathematical thinking and modern programming skills.",
      teaching: "Teaching & Thinking",
      tech: "Tech & Programming"
    },
    awards: {
      title: "Awards & Achievements",
      subtitle: "Evidence of effort and excellent academic ability."
    },
    experience: {
      title: "Teaching Experience",
      tutor: "Math Tutor",
      freelance: "Freelance",
      present: "Present",
      lifeSkills: "Life Skills & Survival Instructor",
      lifeSkillsOrg: "Skills Education Organization",
      methodology: {
        title: "Teaching Methodology",
        items: [
          "Prioritize critical thinking and self-problem-solving skills.",
          "No rote learning; always accompanied by practical examples and applications.",
          "Integrate IT into teaching to increase visualization and interest.",
          "Closely monitor progress and adjust lesson plans to suit each student's ability."
        ]
      },
      survivalItems: [
        "Guide children on basic survival skills in natural environments.",
        "Educate life skills, training independence and discipline for children.",
        "Build extracurricular activities combining learning and practical experience."
      ]
    },
    skills_list: {
      teaching: [
        { name: "K-8 Mathematics", level: 95 },
        { name: "Problem Solving", level: 90 },
        { name: "Logical Thinking", level: 90 },
        { name: "Patience", level: 100 },
        { name: "Communication", level: 85 },
        { name: "Lesson Planning", level: 80 }
      ],
      tech: [
        { name: "C/C++", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "TypeScript", level: 75 },
        { name: "React", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "Git/GitHub", level: 85 }
      ]
    },
    awards_list: [
      { title: "Violympic Math & IT Award", level: "District Level | Consolation", year: "2013 — 2015" },
      { title: "Beautiful Handwriting Contest", level: "School Level | Consolation", year: "2013 — 2015" },
      { title: "“Vuon Uom” Contest", level: "District Level | Consolation", year: "2017 — 2018" },
      { title: "Firefighting Robot Contest", level: "City Level | Consolation", year: "2018 — 2019" }
    ],
    projects: {
      title: "Tech Projects",
      subtitle: "Real-world applications demonstrating programming skills and systems thinking.",
      viewGithub: "View on GitHub"
    },
    testimonials: {
      title: "What Parents Say",
      subtitle: "Parental trust is the greatest motivation for me to constantly improve my teaching methods."
    },
    testimonials_list: [
      {
        quote: "Mr. Quoc is very dedicated; my child went from being afraid of Math to loving it and becoming much more confident.",
        author: "Ms. Lan",
        role: "Parent of Gia Bao"
      },
      {
        quote: "His teaching method is very modern, helping my child think logically instead of just memorizing.",
        author: "Mr. Hung",
        role: "Parent of Minh Anh"
      },
      {
        quote: "My child has made significant progress after 3 months. He doesn't just teach knowledge but also inspires learning.",
        author: "Ms. Mai",
        role: "Parent of Phuong Vy"
      }
    ],
    contact: {
      title: "Looking for a tutor for your child?",
      desc: "Contact me to discuss the most suitable learning path for your child. I am always ready to listen and share.",
      sendEmail: "Send Email",
      orConnect: "Or connect via",
      modalTitle: "Send a Message",
      modalDesc: "I will respond to you as soon as possible.",
      labelName: "Full Name",
      labelEmail: "Email",
      labelSubject: "Subject",
      labelMessage: "Message",
      placeholderName: "John Doe",
      placeholderEmail: "email@example.com",
      placeholderSubject: "Grade 5 Math Tutor",
      placeholderMessage: "Hi Quoc, I want to learn about...",
      submit: "Send Message",
      submitting: "Sending...",
      successTitle: "Thank you for your trust!",
      successDesc: "Your message has been sent successfully. I will contact you via email as soon as possible.",
      close: "Close"
    },
    footer: "© 2026 Nguyen Dai Quoc. Designed based on Portfolio Template."
  }
};

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved) return saved as "vi" | "en";
    }
    return "vi";
  });

  const t = translations[lang];

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === "vi" ? "en" : "vi";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#0F172A] text-[#1A1A1A] dark:text-[#F8FAFC] font-sans selection:bg-[#E6F0FF] dark:selection:bg-blue-900/30 overflow-x-hidden transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg py-3 border-gray-200/50 dark:border-slate-800/50 shadow-xl shadow-black/5" 
          : "bg-transparent py-6 border-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#1A1A1A] dark:bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
            <span className="font-bold text-lg tracking-tight">Quốc Nguyễn Portfolio</span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {["about", "skills", "awards", "experience", "projects", "testimonials"].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                whileHover={{ y: -2 }}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
              >
                {t.nav[item as keyof typeof t.nav]}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold text-xs transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              aria-label="Toggle language"
            >
              <Languages size={16} />
              {lang.toUpperCase()}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 transition-all shadow-sm hover:shadow-md"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[#1A1A1A] dark:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-black/5 group"
            >
              {t.nav.contact} 
              <motion.div
                variants={{
                  hover: { x: [0, 2, 0], transition: { repeat: Infinity, duration: 1 } }
                }}
                whileHover="hover"
              >
                <Mail size={14} className="group-hover:text-blue-200 transition-colors" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
            >
              {t.hero.badge}
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              {t.hero.title.split(',').map((part, i) => (
                <span key={i}>
                  {part}{i === 0 ? ',' : ''}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.2), 0 8px 10px -6px rgba(37, 99, 235, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">{t.hero.downloadCV}</span>
                <Download size={20} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                <motion.div 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.a>

              <div className="flex gap-4">
                {[
                  { icon: <Github size={20} />, href: "https://github.com/NguyenDaiQuoc" },
                  { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/NguyenDaiQuoc" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ y: -5, borderColor: "#2563eb", color: "#2563eb" }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 border border-gray-200 dark:border-slate-800 rounded-xl transition-colors bg-white dark:bg-slate-900 shadow-sm"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-square bg-blue-50 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 relative">
              {/* Decorative circles */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"
              />

              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 z-10 relative"
                >
                  <Calculator size={100} className="text-blue-600" />
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"
                  />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-4 right-4 bg-white p-5 rounded-2xl shadow-xl border border-gray-100"
                >
                  <Code size={40} className="text-gray-400" />
                </motion.div>

                <motion.div 
                  animate={{ x: [-10, 10, -10], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute bottom-10 left-4 bg-white p-5 rounded-2xl shadow-xl border border-gray-100"
                >
                  <BookOpen size={40} className="text-blue-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="bg-white dark:bg-slate-900/50 py-24 border-y border-gray-50 dark:border-slate-800 transition-colors">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight">{t.about.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {t.about.desc1}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {t.about.desc2}
              </p>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  <GraduationCap className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <div>
                  <p className="font-bold text-base">{t.about.university}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{t.about.major}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {t.about.stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemReveal}
                  whileHover={{ y: -5, backgroundColor: theme === 'light' ? "#f8fafc" : "#1e293b" }}
                  className="p-8 bg-gray-50 dark:bg-slate-800/50 rounded-[2rem] space-y-2 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 transition-all duration-300"
                >
                  <h3 className="text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-tighter">{stat.val}</h3>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
          <motion.div 
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{t.skills.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t.skills.subtitle}</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Education Skills */}
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shadow-inner">
                  <BookOpen size={24} />
                </div>
                <h3 className="font-bold text-2xl tracking-tight">{t.skills.teaching}</h3>
              </div>
              <div className="space-y-6">
                {t.skills_list.teaching.map((skill, idx) => (
                  <motion.div 
                    key={skill.name}
                    variants={itemReveal}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-blue-600 dark:text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Skills */}
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-gray-500/5 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl text-gray-600 dark:text-gray-400 shadow-inner">
                  <Code size={24} />
                </div>
                <h3 className="font-bold text-2xl tracking-tight">{t.skills.tech}</h3>
              </div>
              <div className="space-y-6">
                {t.skills_list.tech.map((skill, idx) => (
                  <motion.div 
                    key={skill.name}
                    variants={itemReveal}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                        className="h-full bg-gray-400 dark:bg-gray-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="bg-[#1A1A1A] dark:bg-slate-950 text-white py-32 relative overflow-hidden transition-colors">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -ml-48 -mb-48" />
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">{t.awards.title}</h2>
                <p className="text-gray-400 text-lg">{t.awards.subtitle}</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Award className="text-blue-500" size={64} />
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-x-12">
              {t.awards_list.map((award, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 15, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="p-8 border-b border-gray-800 flex justify-between items-center group cursor-default transition-all duration-300"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-xl group-hover:text-blue-400 transition-colors">{award.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{award.level}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-500 bg-gray-900 dark:bg-slate-900 px-3 py-1 rounded-full border border-gray-800 dark:border-slate-800">{award.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 max-w-6xl mx-auto px-6">
          <motion.h2 
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-20 tracking-tight"
          >
            {t.experience.title}
          </motion.h2>
          
          <div className="relative border-l-2 border-gray-100 dark:border-slate-800 pl-12 ml-4 space-y-20">
            {/* Life Skills Experience */}
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="absolute -left-[57px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-md shadow-blue-500/20"
              />
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{t.experience.lifeSkills}</h3>
                    <p className="text-blue-600 font-bold text-lg">{t.experience.lifeSkillsOrg}</p>
                  </div>
                  <span className="text-sm text-gray-400 font-bold bg-gray-50 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-gray-100 dark:border-slate-700 uppercase tracking-wider">2024 — {t.experience.present}</span>
                </div>
                <ul className="space-y-5 text-gray-600 dark:text-gray-400 text-lg">
                  {t.experience.survivalItems.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      variants={itemReveal}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className="flex gap-4 items-start group"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="mt-1.5 p-1 bg-blue-50 dark:bg-blue-900/30 rounded-md transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50"
                      >
                        <CheckCircle2 size={18} className="text-blue-500 dark:text-blue-400 shrink-0" />
                      </motion.div>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Math Tutor Experience */}
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="absolute -left-[57px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-md shadow-blue-500/20"
              />
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{t.experience.tutor}</h3>
                    <p className="text-blue-600 font-bold text-lg">{t.experience.freelance}</p>
                  </div>
                  <span className="text-sm text-gray-400 font-bold bg-gray-50 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-gray-100 dark:border-slate-700 uppercase tracking-wider">2022 — {t.experience.present}</span>
                </div>
                
                <div className="p-6 bg-blue-50/30 dark:bg-blue-900/10 rounded-3xl border border-blue-100/50 dark:border-blue-900/20">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                    <Star size={18} /> {t.experience.methodology.title}
                  </h4>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    {t.experience.methodology.items.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-base">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-gray-50 dark:bg-slate-900/30 py-32 transition-colors">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex justify-between items-end mb-20"
            >
              <div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">{t.projects.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">{t.projects.subtitle}</p>
              </div>
              <ChevronRight className="text-gray-300 dark:text-slate-700 hidden sm:block" size={48} />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { 
                  title: "Telegram Bot - Bach Hoa Xanh", 
                  desc: "Tự động tìm kiếm và so sánh giá sản phẩm.",
                  tech: ["Node.js", "Telegram API"],
                  link: "https://github.com/NguyenDaiQuoc/BotcheckgiaTelegram"
                },
                { 
                  title: "E-Commerce Grocery Website", 
                  desc: "Cửa hàng bách hóa trực tuyến với giỏ hàng và quản lý đơn hàng.",
                  tech: ["React", "Node.js", "MongoDB"],
                  link: "https://github.com/NguyenDaiQuoc/TiemBachHoaHaiTuiMinh"
                },
                { 
                  title: "Nutrition Management App", 
                  desc: "Theo dõi dinh dưỡng và lượng thực phẩm tiêu thụ hàng ngày.",
                  tech: ["React Native", "Firebase"],
                  link: "https://github.com/NguyenDaiQuoc/Nutrition-Manager"
                },
                { 
                  title: "Smart Plant Watering App", 
                  desc: "Mô phỏng logic tưới cây tự động và lập lịch.",
                  tech: ["C++", "Simulation"],
                  link: "https://github.com/zaikaman/AppTuoiCay"
                }
              ].map((project, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemReveal}
                  whileHover={{ y: -12, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
                  className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all duration-500"
                >
                  <div>
                    <h4 className="font-bold text-xl mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 rounded-lg border border-gray-100 dark:border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 group"
                  >
                    {t.projects.viewGithub} 
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ExternalLink size={16} />
                    </motion.div>
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 transition-colors">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              variants={reveal}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-bold mb-4 tracking-tight">{t.testimonials.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.1 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {t.testimonials_list.map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemReveal}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm relative group transition-all duration-500"
                >
                  <div className="absolute -top-5 left-10 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                    <Quote size={20} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-bold text-lg tracking-tight">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 max-w-4xl mx-auto px-6 text-center relative">
          <div className="absolute inset-0 bg-blue-50/30 dark:bg-blue-900/10 rounded-[3rem] -z-10 blur-2xl" />
          
          <motion.div 
            variants={reveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl font-bold tracking-tight">{t.contact.title}</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t.contact.desc}
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-6">
              <motion.button 
                onClick={() => setIsContactModalOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: theme === 'light' ? "#1f2937" : "#2563eb" }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-[#1A1A1A] dark:bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-bold text-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/20"
              >
                {t.contact.sendEmail} <Mail size={24} />
              </motion.button>
              <motion.div 
                whileHover={{ x: 5 }}
                className="text-base text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest"
              >
                {t.contact.orConnect} <a href="https://linkedin.com/in/NguyenDaiQuoc" className="text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-4">LinkedIn</a>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-16 border-t border-gray-100 dark:border-slate-800 text-center text-sm text-gray-400 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-medium"
          >
            {t.footer}
          </motion.p>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t.contact.modalTitle}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t.contact.modalDesc}</p>
                  </div>
                  <button 
                    onClick={() => setIsContactModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <X size={24} className="dark:text-gray-400" />
                  </button>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    // Simulate sending email
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setIsSubmitting(false);
                    setIsContactModalOpen(false);
                    setShowSuccess(true);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.contact.labelName}</label>
                      <input 
                        required
                        type="text" 
                        placeholder={t.contact.placeholderName}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.contact.labelEmail}</label>
                      <input 
                        required
                        type="email" 
                        placeholder={t.contact.placeholderEmail}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.contact.labelSubject}</label>
                    <input 
                      required
                      type="text" 
                      placeholder={t.contact.placeholderSubject}
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.contact.labelMessage}</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder={t.contact.placeholderMessage}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>{t.contact.submit} <Send size={20} /></>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-blue-600/90 dark:bg-blue-950/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative text-center text-white space-y-6 max-w-md"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl"
              >
                <Heart size={48} className="text-blue-600 fill-blue-600" />
              </motion.div>
              <h2 className="text-4xl font-bold tracking-tight">{t.contact.successTitle}</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                {t.contact.successDesc}
              </p>
              <motion.button 
                onClick={() => setShowSuccess(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-xl hover:bg-blue-50 transition-colors"
              >
                {t.contact.close}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-[60] p-4 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
