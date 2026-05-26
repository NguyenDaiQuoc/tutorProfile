/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
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
  Languages,
  Copy,
  Check
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
      downloadCV: "Tải CV",
      downloadingCV: "Đang tạo PDF...",
      previewCV: "Xem trước CV"
    },
    about: {
      title: "Về tôi",
      desc1: "Tôi hiện là sinh viên năm 4 ngành Kỹ thuật Phần mềm tại Đại học Sài Gòn. Với nền tảng kiến thức vững chắc về Toán học và Lập trình, tôi đã có hơn 3 năm kinh nghiệm dạy kèm cho học sinh từ mầm non đến lớp 8.",
      desc2: "Phương pháp giảng dạy của tôi tập trung vào việc khơi gợi sự tò mò, rèn luyện tư duy phản biện và giải quyết vấn đề thay vì chỉ học thuộc lòng công thức.",
      university: "Đại học Sài Gòn",
      major: "Kỹ sư Phần mềm (2022 — 2027)",
      stats: [
        { val: "3+", label: "Năm kinh nghiệm" },
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
    footer: "© 2026 Nguyễn Đại Quốc.",
    cv: {
      title: "NGUYỄN ĐẠI QUỐC - SƠ YẾU LÝ LỊCH (CV)",
      subtitle: "Gia sư Toán & Kỹ sư Phần mềm tương lai",
      printBtn: "Xuất PDF / Lưu CV",
      closeBtn: "Đóng CV",
      personalHeader: "Thông Tin Cá Nhân",
      location: "Thành phố Hồ Chí Minh, Việt Nam",
      email: "luutrithon1996@gmail.com",
      github: "github.com/NguyenDaiQuoc",
      linkedin: "linkedin.com/in/NguyenDaiQuoc",
      phone: "0931.454.176",
      educationTitle: "HỌC VẤN",
      school: "Đại học Sài Gòn",
      degree: "Kỹ thuật phần mềm",
      eduDetails: "Nền tảng vững chắc trong phát triển phần mềm, cấu trúc dữ liệu, giải thuật và phân tích thiết kế dự án phức tạp.",
      experienceTitle: "KINH NGHIỆM LÀM VIỆC",
      expTutor: "Gia sư toán học tự do (K-8 Mathematics)",
      expTutorDate: "2022 — Hiện tại",
      expTutorDesc: [
        "Giảng dạy Toán học K-8 cho hơn 20 học sinh, phát triển khả năng tư duy độc lập và giải quyết các bài toán hóc búa.",
        "Xây dựng giáo án cá nhân hóa với phương pháp phát triển tư duy, loại bỏ tình trạng học vẹt hoặc lý thuyết suông.",
        "Tích hợp và ứng dụng CNTT, phần mềm trực quan hóa địa lý và hình học vào giảng dạy giúp tăng độ hào hứng."
      ],
      expSkills: "Hướng dẫn Kỹ năng sống & Sinh tồn",
      expSkillsOrg: "Tổ chức Giáo dục Kỹ năng Việt",
      expSkillsDate: "2024 — Hiện tại",
      expSkillsDesc: [
        "Điều phối các buổi dã ngoại, giảng dạy học trò các biện pháp dã ngoại sinh tồn, định vị thực địa cơ bản.",
        "Phát triển giáo dục kỹ năng giao tiếp, tinh thần tự lập, tuân thủ kỷ luật tập thể qua các sinh hoạt khám phá.",
        "Thiết kế trò chơi thực nghiệm ngoài trời kết hợp giữa thể chất và hoạt động đồng đội kích thích sự nhạy bén."
      ],
      projectsTitle: "DỰ ÁN PHẦN MỀM TIÊU BIỂU",
      projTgBotName: "Telegram Bot Bach Hoa Xanh (Node.js, Telegram API)",
      projTgBotDesc: [
        "Phát triển hệ thống quét, phân tích giá tự động so sánh mặt hàng tiêu dùng hằng ngày.",
        "Thiết lập cơ chế thông báo tự động tới người dùng khi giá đạt ngưỡng thiết lập."
      ],
      projWebGroceryName: "E-Commerce Grocery Web Node (React, Node.js, MongoDB)",
      projWebGroceryDesc: [
        "Xây dựng mô hình trang bách hóa tích hợp giỏ hàng thanh toán, theo dõi hành trình đơn.",
        "Tối ưu trải nghiệm sử dụng trên mọi nền tảng di động và máy tính."
      ],
      projAppNutriName: "Nutrition Manager Tracker (React Native, Firebase)",
      projAppNutriDesc: [
        "Phát triển thiết bị giả định đo hàm lượng dinh dưỡng tiêu thụ mỗi ngày của học viên thể thao.",
        "Tích hợp Firestore đồng bộ hóa tức thời mọi số liệu dinh dưỡng cá nhân."
      ],
      projWateringName: "App Tuoi Cay Thong Minh (C++, Simulation Core)",
      projWateringDesc: [
        "Lập trình thuật toán mô phỏng lập lịch tưới tiêu tự động dựa trên độ ẩm đất giả lập.",
        "Trình diễn giải pháp mô hình hóa kỹ nghệ nông nghiệp công nghệ cao đẹp mắt."
      ],
      skillsTitle: "KỸ NĂNG & THUẬT TOÁN",
      techSkills: "Công nghệ & Lập trình: C/C++, JavaScript, TypeScript, React, HTML/CSS, Git/GitHub, Node.js, Sqlite/MongoDB.",
      pedagogySkills: "Nghiệp vụ giáo dục: Toán học K-8, Sư phạm tương tác học đường, Tư duy Logic, Lập giáo án rèn óc nhạy bén.",
      awardsTitle: "GIẢI THƯỞNG & THÀNH TỰU",
      awardItems: [
        "Giải Violympic Toán & Tin học cấp Quận (Khuyến khích) — 2013 — 2015",
        "Cuộc thi Vở sạch chữ đẹp cấp Trường (Khuyến khích) — 2013 — 2015",
        "Cuộc thi trí tuệ học đường “Vườn Ươm” cấp Quận (Khuyến khích) — 2017 — 2018",
        "Cuộc thi Kỹ nghệ chế tạo Robot chữa cháy cấp Thành phố (Khuyến khích) — 2018 — 2019"
      ]
    }
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
      downloadCV: "Download CV",
      downloadingCV: "Generating PDF...",
      previewCV: "Preview CV"
    },
    about: {
      title: "About Me",
      desc1: "I am currently a 4th-year Software Engineering student at Saigon University. With a solid foundation in Mathematics and Programming, I have over 3 years of experience tutoring students from preschool to grade 8.",
      desc2: "My teaching method focuses on sparking curiosity, training critical thinking, and problem-solving rather than just memorizing formulas.",
      university: "Saigon University",
      major: "Software Engineering (2022 — 2027)",
      stats: [
        { val: "3+", label: "Years Experience" },
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
    footer: "© 2026 Nguyen Dai Quoc.",
    cv: {
      title: "NGUYEN DAI QUOC - CURRICULUM VITAE",
      subtitle: "Math Tutor & Aspiring Software Engineer",
      printBtn: "Print / Export PDF",
      closeBtn: "Close CV Preview",
      personalHeader: "Personal Information",
      location: "Ho Chi Minh City, Vietnam",
      email: "luutrithon1996@gmail.com",
      github: "github.com/NguyenDaiQuoc",
      linkedin: "linkedin.com/in/NguyenDaiQuoc",
      phone: "0931.454.176",
      educationTitle: "EDUCATION",
      school: "Saigon University",
      degree: "Software Engineering",
      eduDetails: "Solid foundation in core software engineering, algorithms, database management systems, and system design paradigms.",
      experienceTitle: "WORK EXPERIENCE",
      expTutor: "Freelance Math Tutor (K-8 Mathematics)",
      expTutorDate: "2022 — Present",
      expTutorDesc: [
        "Tutored over 20+ grade school students in advanced mathematical concepts & logic thinking puzzles.",
        "Curated interactive courses advocating problem-solving instincts while preventing rote memorization patterns.",
        "Integrated geospatial & coordinate graphing tools in rendering mathematical visualizations."
      ],
      expSkills: "Life Skills & Survival Instructor",
      expSkillsOrg: "Vietnam Youth Skills Education Org",
      expSkillsDate: "2024 — Present",
      expSkillsDesc: [
        "Educated children on vital emergency responses, basic navigation, and self-reliant outdoor survival tactics.",
        "Promoted student leadership, effective communication, and spatial awareness during field trips.",
        "Created physical-intellectual team simulations nurturing real-world resilience and strategic logic."
      ],
      projectsTitle: "SELECTED PROJECTS",
      projTgBotName: "Telegram Price Checking Bot (Node.js, Telegram API)",
      projTgBotDesc: [
        "Automated scrapers to monitor and compare grocery prices with robust notification thresholds.",
        "Integrated lightweight asynchronous Node.js task schedulers for peak traffic intervals."
      ],
      projWebGroceryName: "E-Commerce Grocery Platform (React, Node.js, MongoDB)",
      projWebGroceryDesc: [
        "Engineered secure payment simulations and intuitive fluid checkout user interfaces.",
        "Ensured responsive views across all modern desktop, tablet, and mobile platforms."
      ],
      projAppNutriName: "Nutrition Tracker Platform (React Native, Firebase)",
      projAppNutriDesc: [
        "Developed daily nutrition intake analyzers utilizing smart calculation algorithms.",
        "Syncs workout energy expenses instantly with optimized Firebase database structures."
      ],
      projWateringName: "Smart Plant Watering System (C++, Simulation Core)",
      projWateringDesc: [
        "Authored C++ algorithm simulations matching soil moisture parameters against customizable scheduling grids.",
        "Created console demonstrations showcase state machines for automated irrigation workflows."
      ],
      skillsTitle: "TECHNICAL & PERSIONAL SKILLS",
      techSkills: "Technologies: C/C++, JavaScript, TypeScript, React, HTML/CSS, Git/GitHub, Node.js, Sqlite/MongoDB.",
      pedagogySkills: "Teaching: Core K-8 Mathematics, Interactive Pedagogy, Critical Logic Training, Syllabus Designing.",
      awardsTitle: "AWARDS & HONORS",
      awardItems: [
        "Violympic Math & IT District Contest (Consolation Prize) — 2013 — 2015",
        "School Handwriting Aesthetic Competition (Consolation Prize) — 2013 — 2015",
        "“Vuon Uom” Academic District Competition (Consolation Prize) — 2017 — 2018",
        "Citywide Emergency-Firefighting Robot Tournament (Consolation Prize) — 2018 — 2019"
      ]
    }
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

const latexViSource = `%-------------------------
% Sơ yếu lý lịch chuẩn LaTeX
% Nguyễn Đại Quốc - Gia sư Toán học K-8 & Sinh viên Kỹ thuật Phần mềm
%-------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[utf8]{inputenc}
\\usepackage[vietnam]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % Xoá các trường trang đầu/cuối kì
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Căn lề trang chuẩn A4
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Định dạng tiêu đề cho trang mục
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

% Các dòng lệnh tiện ích tùy chỉnh
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

%----------THÔNG TIN CÁ NHÂN----------
\\begin{center}
    \\textbf{\\Huge \\scshape Nguyễn Đại Quốc} \\\\ \\vspace{8pt}
    \\small 0931.454.176 $|$ \\href{mailto:luutrithon1996@gmail.com}{luutrithon1996@gmail.com} $|$ 
    \\href{https://github.com/NguyenDaiQuoc}{github.com/NguyenDaiQuoc} $|$ \\href{https://linkedin.com/in/NguyenDaiQuoc}{linkedin.com/in/NguyenDaiQuoc} \\\\
    \\small Thành phố Hồ Chí Minh, Việt Nam
\\end{center}


%-----------HỌC VẤN-----------
\\section{Học Vấn}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Đại học Sài Gòn}{Hồ Chí Minh, Việt Nam}
      {Kỹ thuật phần mềm (Khóa 2022 -- 2027)}{2022 -- 2027}
      \\resumeItemListStart
        \\resumeItem{Nền tảng vững vàng trong phát triển và kiểm định chất lượng phần mềm, phát triển giải pháp hệ thống, thuật toán và cấu trúc thông tin nâng cao.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd


%-----------KINH NGHIỆM GIẢI TRÌNH-----------
\\section{Kinh Nghiệm Làm Việc}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {Gia sư Toán học tự do (K-8 Mathematics)}{2022 -- Hiện tại}
      {Gia sư tự do}{Hồ Chí Minh, Việt Nam}
      \\resumeItemListStart
        \\resumeItem{Giảng dạy Toán học K-8 cho hơn 20 học sinh, củng cố và phát triển tiềm lực tự lập học tập thông qua rèn dũa tư duy toán học chuyên sâu.}
        \\resumeItem{Phát triển hệ giáo trình tương tác trực diện, tránh các phương thức học học thuộc sáo rỗng thường nhật.}
        \\resumeItem{Ứng dụng các sản phẩm hỗ trợ đồ họa không gian vẽ lập đề toán phẳng trực quan, tăng chỉ số tập trung cuốn hút của buổi giảng học.}
      \\resumeItemListEnd
      
    \\resumeSubheading
      {Hướng dẫn Kỹ năng sống \\& Sinh tồn}{2024 -- Hiện tại}
      {Tổ chức Giáo dục Kỹ năng}{Hồ Chí Minh, Việt Nam}
      \\resumeItemListStart
        \\resumeItem{Quản trò, tổ chức thực nghiệm các khoá dã ngoại thực tế dã ngoại, giảng huấn trẻ em phương pháp tự phục vụ, sơ cứu sự cố cơ bản.}
        \\resumeItem{Tập trung bồi dưỡng năng lực giao tiếp, sinh hoạt kỷ luật tập thể tổ nhóm thông qua hoạt động khám phá khoa học ngoài trời bài bản.}
        \\resumeItem{Thiết lập, kiến tạo hoạt động nhóm dẻo dai thể lực tích hợp tính đồng lòng giải đáp câu đố định vị lý thú.}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd


%-----------DỰ ÁN PHẦN MỀM TIÊU BIỂU-----------
\\section{Dự Án Phần Mềm Tiêu Biểu}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Telegram Bot - Bach Hoa Xanh}{Node.js, Telegram API}
      {Phần mềm phân tích giá tiêu dùng tự động}{2023}
      \\resumeItemListStart
        \\resumeItem{Viết các trình tự động quét đối chiếu biến động chi tiêu mặt hàng của các đại lý siêu thị bán lẻ.}
        \\resumeItem{Thiết lập kênh liên lạc tự phát thông báo trực tiếp đến khách hàng đăng ký nhận giá khuyến mại chuẩn xác.}
      \\resumeItemListEnd

    \\resumeSubheading
      {E-Commerce Grocery Website}{React, Node.js, MongoDB}
      {Trang thương mại điện tử mảng thực phẩm}{2024}
      \\resumeItemListStart
        \\resumeItem{Thiết lập module thanh toán mô phỏng an toàn, tích hợp giỏ hàng thanh toán nhanh và chức năng quản trị đơn hàng.}
        \\resumeItem{Đảm bảo thiết kế tối ưu mượt mà thích ứng hoàn hảo trên mọi thiết bị thông minh.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Nutrition Tracker App}{React Native, Firebase}
      {Hệ thống giám sát chỉ mức năng lượng dinh dưỡng}{2024}
      \\resumeItemListStart
        \\resumeItem{Thiết kế công cụ phân tích hàm lượng chất ăn hằng ngày tích hợp thuật toán đo lường calo tương thích cân nặng thể hình thực tế.}
        \\resumeItem{Thiết lập truyền tải đồng bộ tức thời cơ sở dữ liệu trên đám mây Firestore.}
      \\resumeItemListEnd

    \\resumeSubheading
      {App Tuoi Cay Thong Minh}{C++, Simulation Core}
      {Chương trình kiểm soát tưới tiêu nhân tạo}{2023}
      \\resumeItemListStart
        \\resumeItem{Thiết kế trình thuật toán đo độ ẩm đất mô phỏng, ra quyết định tự động điều tiết van phun sương thông minh.}
        \\resumeItem{Tổ chức thuật toán chuyển giao máy trạng thái rõ ràng, dễ dàng bảo trì và tích hợp nâng cấp thiết bị nhúng.}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd


%-----------KỸ NĂNG VÀ CHUYÊN MÔN -----------
\\section{Kỹ Năng \\& Chuyên Môn}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Công nghệ \\& Lập trình}{: C/C++, JavaScript, TypeScript, React, HTML/CSS, Git/GitHub, Node.js, Sqlite/MongoDB.} \\\\
     \\textbf{Nghiệp vụ Sư phạm}{: Toán học K-8, Sư phạm tương tác học đường, Tư duy Logic, Thiết kế giáo án sáng tạo lý thú.}
    }}
 \\end{itemize}


%-----------GIẢI THƯỞNG-----------
\\section{Giải Thưởng \\& Thành Tích}
  \\resumeSubHeadingListStart
    \\resumeItem{Giải Violympic Toán \\& Tin học cấp Quận (Khuyến khích) -- 2013 -- 2015}
    \\resumeItem{Cuộc thi Vở sạch chữ đẹp cấp Trường (Khuyến khích) -- 2013 -- 2015}
    \\resumeItem{Cuộc thi trí tuệ học đường “Vườn Ươm” cấp Quận (Khuyến khích) -- 2017 -- 2018}
    \\resumeItem{Cuộc thi Kỹ nghệ chế tạo Robot chữa cháy cấp Thành phố (Khuyến khích) -- 2018 -- 2019}
  \\resumeSubHeadingListEnd

\\end{document}
`;

const latexEnSource = `%-------------------------
% LaTeX Resume / Curriculum Vitae
% Author : Nguyen Dai Quoc
%-------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[utf8]{inputenc}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Nguyen Dai Quoc} \\\\ \\vspace{8pt}
    \\small 0931.454.176 $|$ \\href{mailto:luutrithon1996@gmail.com}{luutrithon1996@gmail.com} $|$ 
    \\href{https://github.com/NguyenDaiQuoc}{github.com/NguyenDaiQuoc} $|$ \\href{https://linkedin.com/in/NguyenDaiQuoc}{linkedin.com/in/NguyenDaiQuoc} \\\\
    \\small Ho Chi Minh City, Vietnam
\\end{center}


%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Saigon University}{Saigon, Vietnam}
      {Software Engineering}{2022 -- 2027}
      \\resumeItemListStart
        \\resumeItem{Solid foundation in core software engineering, data structures, algorithms, and database systems.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {Freelance Math Tutor (K-8 Mathematics)}{2022 -- Present}
      {Private Tutor}{HCM City, Vietnam}
      \\resumeItemListStart
        \\resumeItem{Tutored over 20+ grade school students in advanced mathematical concepts and logical thinking puzzles.}
        \\resumeItem{Curated interactive materials focusing on teaching critical reasoning and problem-solving patterns instead of memorization.}
        \\resumeItem{Integrated coordinate graphing and geometry visualization software into tutoring lessons to increase students' engagement.}
      \\resumeItemListEnd
      
    \\resumeSubheading
      {Life Skills \\& Survival Instructor}{2024 -- Present}
      {Vietnam Youth Skills Education Organisation}{HCM City, Vietnam}
      \\resumeItemListStart
        \\resumeItem{Instructed children on crucial emergency field tactics, land navigation, and basic outdoor survival skills.}
        \\resumeItem{Nurtured teamwork, communicative readiness, and positive discipline under rigorous camp conditions.}
        \\resumeItem{Designed physical and mental group challenges promoting outdoor active learning and logical resilience.}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd


%-----------PROJECTS-----------
\\section{Featured Projects}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Telegram Bot - Bach Hoa Xanh}{Node.js, Telegram API}
      {Price Tracking \\& Comparison Bot}{2023}
      \\resumeItemListStart
        \\resumeItem{Automated web scrapers to fetch and compare daily commodity prices from supermarkets.}
        \\resumeItem{Developed asynchronous alert schedulers for notifying subscribers when target thresholds are reached.}
      \\resumeItemListEnd

    \\resumeSubheading
      {E-Commerce Grocery Platform}{React, Node.js, MongoDB}
      {Fullstack Grocery Website}{2024}
      \\resumeItemListStart
        \\resumeItem{Engineered secure payment workflows, shopping carts, and dynamic order management systems.}
        \\resumeItem{Created high-fidelity, device-agnostic responsive user interfaces for modern web browsers.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Nutrition Tracker Platform}{React Native, Firebase}
      {Mobile Nutrition Companion}{2024}
      \\resumeItemListStart
        \\resumeItem{Developed calorie intake counters with customizable profile algorithms matching personalized target scales.}
        \\resumeItem{Implemented real-time synchronization of nutritional diaries via Firebase Cloud Firestore.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Smart Plant Watering System}{C++, Simulation Core}
      {Embedded IoT Logic Simulation}{2023}
      \\resumeItemListStart
        \\resumeItem{Authored custom scheduling algorithms matching soil conditions against custom water timers in virtual environments.}
        \\resumeItem{Designed state machine loops demonstrating responsive irrigation setups.}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd


%-----------PROGRAMMING SKILLS-----------
\\section{Technical \\& Pedagogical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Technologies}{: C/C++, JavaScript, TypeScript, React, HTML/CSS, Git/GitHub, Node.js, Sqlite/MongoDB.} \\\\
     \\textbf{Teaching skills}{: Core K-8 Mathematics, Interactive Pedagogy, Critical Logic Training, Syllabus Designing.}
    }}
 \\end{itemize}


%-----------AWARDS-----------
\\section{Awards \\& Achievements}
  \\resumeSubHeadingListStart
    \\resumeItem{Violympic Math \\& IT District Contest (Consolation Prize) -- 2013 -- 2015}
    \\resumeItem{School Handwriting Aesthetic Competition (Consolation Prize) -- 2013 -- 2015}
    \\resumeItem{"Vuon Uom" Academic District Competition (Consolation Prize) -- 2017 -- 2018}
    \\resumeItem{Citywide Emergency-Firefighting Robot Tournament (Consolation Prize) -- 2018 -- 2019}
  \\resumeSubHeadingListEnd

\\end{document}
`;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [cvActiveTab, setCVActiveTab] = useState<"preview" | "latex">("preview");
  const [copiedLaTeX, setCopiedLaTeX] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const [isDownloadingCV, setIsDownloadingCV] = useState(false);
  const cvExportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

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

  const handleDownloadCV = async () => {
    if (!cvExportRef.current || isDownloadingCV) return;

    try {
      setIsDownloadingCV(true);
      const printWindow = window.open("", "_blank", "width=960,height=1280");

      if (!printWindow) {
        window.alert(
          lang === "vi"
            ? "Trình duyệt đang chặn cửa sổ in. Vui lòng cho phép pop-up rồi thử lại."
            : "Your browser blocked the print window. Please allow pop-ups and try again."
        );
        return;
      }

      const stylesheetMarkup = Array.from(
        document.querySelectorAll('link[rel="stylesheet"], style')
      )
        .map((node) => node.outerHTML)
        .join("\n");

      const printableNode = cvExportRef.current.cloneNode(true) as HTMLDivElement;
      printableNode.removeAttribute("aria-hidden");
      printableNode.className = "cv-print-shell";
      printableNode.style.position = "static";
      printableNode.style.left = "auto";
      printableNode.style.top = "auto";
      printableNode.style.zIndex = "auto";
      printableNode.style.width = "210mm";
      printableNode.style.minHeight = "297mm";
      printableNode.style.margin = "0 auto";
      printableNode.style.padding = "1.5cm";
      printableNode.style.background = "#ffffff";
      printableNode.style.color = "#000000";
      printableNode.style.opacity = "1";
      printableNode.style.pointerEvents = "auto";

      printWindow.document.open();
      printWindow.document.write(`<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nguyen Dai Quoc CV</title>
    ${stylesheetMarkup}
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #f3f4f6;
      }

      body {
        padding: 24px;
      }

      @page {
        size: A4 portrait;
        margin: 0;
      }

      @media print {
        html, body {
          background: #ffffff;
        }

        body {
          padding: 0;
        }

        .cv-print-shell {
          margin: 0 !important;
        }
      }
    </style>
  </head>
  <body>
    ${printableNode.outerHTML}
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => {
          window.print();
        }, 250);
      });
    <\/script>
  </body>
</html>`);
      printWindow.document.close();
    } catch (error) {
      console.error("Failed to generate CV PDF", error);
      window.alert(
        lang === "vi"
          ? "Không thể tạo file PDF lúc này. Vui lòng thử lại sau."
          : "Unable to generate the PDF right now. Please try again."
      );
    } finally {
      setIsDownloadingCV(false);
    }
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
              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.2), 0 8px 10px -6px rgba(37, 99, 235, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isDownloadingCV}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all relative overflow-hidden group cursor-pointer disabled:cursor-wait disabled:opacity-80"
              >
                <span className="relative z-10">{isDownloadingCV ? t.hero.downloadingCV : t.hero.downloadCV}</span>
                <Download size={20} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                <motion.div 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.button>

              <motion.button
                onClick={() => setIsCVModalOpen(true)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-2xl font-semibold border border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer"
              >
                {t.hero.previewCV}
              </motion.button>

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

      {/* LaTeX CV Preview Modal */}
      <AnimatePresence>
        {isCVModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 no-print">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCVModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-slate-900 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-gray-200/50 dark:border-slate-800"
            >
              {/* Left Column: Interactive Controls & Actions */}
              <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 flex flex-col justify-between bg-gray-50/50 dark:bg-slate-900/50 overflow-y-auto">
                <div className="space-y-6">
                  {/* Title & Description */}
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/40 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      LaTeX Compiled TeX
                    </span>
                    <h3 className="text-3xl font-bold tracking-tight mt-4 text-gray-900 dark:text-white">
                      {t.cv.title.split(' - ')[0]}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {t.cv.subtitle}
                    </p>
                  </div>

                  {/* Sandboxed Iframe Print Block Warning */}
                  {isIframe && (
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200 rounded-2xl border border-rose-100 dark:border-rose-900/20 text-xs leading-relaxed space-y-1.5">
                      <p className="font-bold flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                        ⚠️ Quy định bảo mật trình duyệt
                      </p>
                      <p>Do chạy trong iFrame sandbox, nút In/Xuất PDF trực tiếp có thể không in được trang. Để in/tải CV dạng PDF chuẩn:</p>
                      <p className="font-bold text-rose-700 dark:text-rose-300">
                        👉 Hãy click nút "Mở tab mới" (ở phía trên góc phải) rồi nhấn Xuất PDF ở tab mới đó!
                      </p>
                    </div>
                  )}

                  {/* Guide Info */}
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200 rounded-2xl border border-yellow-200/50 dark:border-yellow-900/20 text-xs leading-relaxed space-y-2">
                    <p className="font-semibold">💡 Mẹo xuất file PDF tinh tế nhất:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Chọn <span className="font-bold">Lưu dưới dạng PDF (Save as PDF)</span> làm máy in đích.</li>
                      <li>Bật <span className="font-bold">Đồ họa nền (Background graphics)</span>.</li>
                      <li>Đặt lề (Margins) là <span className="font-bold">Không có (None)</span> để căn trang chuẩn kích thước A4.</li>
                    </ul>
                  </div>

                  {/* Toggle Display Mode between visual A4 sheets and raw LaTeX markup */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      Chế độ hiển thị / View mode
                    </label>
                    <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border border-gray-150 dark:border-slate-700 rounded-xl">
                      <button 
                        onClick={() => setCVActiveTab("preview")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          cvActiveTab === "preview" 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        📄 Bản Đẹp A4
                      </button>
                      <button 
                        onClick={() => setCVActiveTab("latex")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          cvActiveTab === "latex" 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        💻 Mã LaTeX (.tex)
                      </button>
                    </div>
                  </div>

                  {/* Interactive Language Selector on the CV itself */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      Chọn ngôn ngữ CV / Select language
                    </label>
                    <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border border-gray-150 dark:border-slate-700 rounded-xl">
                      <button 
                        onClick={() => setLang("vi")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          lang === "vi" 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        Tiếng Việt
                      </button>
                      <button 
                        onClick={() => setLang("en")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          lang === "en" 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10" 
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-8 md:mt-0 pt-4">
                  {/* Export Button */}
                  <button 
                    onClick={handleDownloadCV}
                    disabled={isDownloadingCV}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:cursor-wait disabled:opacity-80"
                  >
                    <Download size={18} />
                    {isDownloadingCV ? t.hero.downloadingCV : t.cv.printBtn}
                  </button>

                  {/* Close Button */}
                  <button 
                    onClick={() => setIsCVModalOpen(false)}
                    className="w-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all cursor-pointer"
                  >
                    {t.cv.closeBtn}
                  </button>
                </div>
              </div>

              {/* Right Column: Scrollable Content - supports simulated sheet preview OR LaTeX code blocks */}
              <div className="flex-1 bg-gray-100/50 dark:bg-slate-950/20 p-6 md:p-8 overflow-y-auto select-text selection:bg-blue-100">
                {cvActiveTab === "latex" ? (
                  /* Code viewer & copy action */
                  <div className="h-full flex flex-col space-y-4">
                    <div className="flex justify-between items-center bg-gray-200/50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-300/40 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300 ml-2">
                          nguyen_dai_quoc_cv_{lang}.tex
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const texVal = lang === "vi" ? latexViSource : latexEnSource;
                          navigator.clipboard.writeText(texVal);
                          setCopiedLaTeX(true);
                          setTimeout(() => setCopiedLaTeX(false), 2000);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        {copiedLaTeX ? (
                          <>
                            <Check size={14} />
                            Đã sao chép!
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Sao chép TeX Code
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="flex-1 bg-slate-950 text-slate-100 p-6 rounded-2xl overflow-auto font-mono text-xs leading-relaxed select-text border border-slate-800 shadow-inner">
                      <code>{lang === "vi" ? latexViSource : latexEnSource}</code>
                    </pre>
                  </div>
                ) : (
                  /* Simulated A4 TeX Sheet Paper */
                  <div className="mx-auto w-full max-w-[21cm] bg-white text-black p-[1.5cm] shadow-xl border border-gray-200 rounded-sm font-serif min-h-[29.7cm]">
                    {/* LaTeX Header */}
                    <div className="text-center">
                      <h1 className="text-3xl font-bold tracking-widest uppercase mb-1 font-serif text-black">
                        {lang === "vi" ? "NGUYỄN ĐẠI QUỐC" : "NGUYEN DAI QUOC"}
                      </h1>
                      <p className="text-[13px] text-gray-700 tracking-wide">
                        {t.cv.subtitle}
                      </p>
                      <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-xs text-gray-600 mt-2">
                        <span>{t.cv.location}</span>
                        <span>•</span>
                        <span>{t.cv.phone}</span>
                        <span>•</span>
                        <span className="font-mono bg-gray-50 px-1 py-0.5 rounded">{t.cv.email}</span>
                      </div>
                      <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mt-1 font-mono hover:text-blue-600">
                        <span>{t.cv.github}</span>
                        <span>•</span>
                        <span>{t.cv.linkedin}</span>
                      </div>
                    </div>

                    {/* Education Section */}
                    <div className="mt-8 text-black">
                      <h2 className="text-[13px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2.5 text-black">
                        {t.cv.educationTitle}
                      </h2>
                      <div className="flex justify-between items-baseline text-xs mb-1">
                        <span className="font-bold">{t.cv.school}</span>
                        <span className="font-mono text-gray-600">2022 — 2027</span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs italic text-gray-700">
                        <span>{t.cv.degree}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        {t.cv.eduDetails}
                      </p>
                    </div>

                    {/* Experience Section */}
                    <div className="mt-6 text-black">
                      <h2 className="text-[13px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2.5 text-black">
                        {t.cv.experienceTitle}
                      </h2>
                      
                      {/* Tutoring Experience */}
                      <div className="mb-4">
                        <div className="flex justify-between items-baseline text-xs font-bold mb-1 col-span-2">
                          <span>{t.cv.expTutor}</span>
                          <span className="font-mono text-gray-600 font-normal">{t.cv.expTutorDate}</span>
                        </div>
                        <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1 mt-1 leading-relaxed">
                          {t.cv.expTutorDesc.map((desc: string, i: number) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Survival Skills */}
                      <div>
                        <div className="flex justify-between items-baseline text-xs font-bold mb-1">
                          <span>{t.cv.expSkills} — <span className="italic font-normal">{t.cv.expSkillsOrg}</span></span>
                          <span className="font-mono text-gray-600 font-normal">{t.cv.expSkillsDate}</span>
                        </div>
                        <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1 mt-1 leading-relaxed">
                          {t.cv.expSkillsDesc.map((desc: string, i: number) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Projects Section */}
                    <div className="mt-6 text-black">
                      <h2 className="text-[13px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2.5 text-black">
                        {t.cv.projectsTitle}
                      </h2>
                      
                      {/* Project 1 */}
                      <div className="mb-2.5">
                        <p className="text-xs font-bold">{t.cv.projTgBotName}</p>
                        <ul className="list-disc pl-5 text-xs text-gray-700 leading-relaxed mt-0.5">
                          {t.cv.projTgBotDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
                        </ul>
                      </div>

                      {/* Project 2 */}
                      <div className="mb-2.5">
                        <p className="text-xs font-bold">{t.cv.projWebGroceryName}</p>
                        <ul className="list-disc pl-5 text-xs text-gray-700 leading-relaxed mt-0.5">
                          {t.cv.projWebGroceryDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
                        </ul>
                      </div>

                      {/* Project 3 */}
                      <div className="mb-2.5">
                        <p className="text-xs font-bold">{t.cv.projAppNutriName}</p>
                        <ul className="list-disc pl-5 text-xs text-gray-700 leading-relaxed mt-0.5">
                          {t.cv.projAppNutriDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
                        </ul>
                      </div>

                      {/* Project 4 */}
                      <div>
                        <p className="text-xs font-bold">{t.cv.projWateringName}</p>
                        <ul className="list-disc pl-5 text-xs text-gray-700 leading-relaxed mt-0.5">
                          {t.cv.projWateringDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Technical & pedagogical skills */}
                    <div className="mt-6 text-black">
                      <h2 className="text-[13px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2.5 text-black">
                        {t.cv.skillsTitle}
                      </h2>
                      <p className="text-xs text-gray-700 mb-1 leading-relaxed">
                        • <span className="font-bold">{t.cv.techSkills.split(': ')[0]}:</span> {t.cv.techSkills.split(': ')[1]}
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        • <span className="font-bold">{t.cv.pedagogySkills.split(': ')[0]}:</span> {t.cv.pedagogySkills.split(': ')[1]}
                      </p>
                    </div>

                    {/* Awards Section */}
                    <div className="mt-6 text-black">
                      <h2 className="text-[13px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2.5 text-black">
                        {t.cv.awardsTitle}
                      </h2>
                      <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1.5 leading-relaxed">
                        {t.cv.awardItems.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden container formatted purely for print/Save as PDF extraction */}
      <div
        ref={cvExportRef}
        aria-hidden="true"
        className="cv-print-only fixed left-[-99999px] top-0 z-[-1] w-[210mm] min-h-[297mm] bg-white p-[1.5cm] font-serif leading-relaxed text-black opacity-100 pointer-events-none select-text"
      >
        {/* LaTeX Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-1 text-black font-serif">
            {lang === "vi" ? "NGUYỄN ĐẠI QUỐC" : "NGUYEN DAI QUOC"}
          </h1>
          <p className="text-[12px] text-gray-700 tracking-wide font-normal">
            {t.cv.subtitle}
          </p>
          <div className="flex justify-center items-center gap-x-2.5 text-[11px] text-gray-600 mt-2">
            <span>{t.cv.location}</span>
            <span>•</span>
            <span>{t.cv.phone}</span>
            <span>•</span>
            <span className="font-mono">{t.cv.email}</span>
          </div>
          <div className="flex justify-center items-center gap-2 text-[11px] text-gray-500 mt-1 font-mono">
            <span>{t.cv.github}</span>
            <span>•</span>
            <span>{t.cv.linkedin}</span>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-6">
          <h2 className="text-[12px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2 text-black">
            {t.cv.educationTitle}
          </h2>
          <div className="flex justify-between items-baseline text-[11px] mb-0.5">
            <span className="font-bold">{t.cv.school}</span>
            <span className="font-mono text-gray-600">2022 — 2027</span>
          </div>
          <div className="flex justify-between items-baseline text-[11px] italic text-gray-700">
            <span>{t.cv.degree}</span>
          </div>
          <p className="text-[11px] text-gray-600 mt-1">
            {t.cv.eduDetails}
          </p>
        </div>

        {/* Experience Section */}
        <div className="mt-5">
          <h2 className="text-[12px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2 text-black">
            {t.cv.experienceTitle}
          </h2>
          
          {/* Tutoring Experience */}
          <div className="mb-3">
            <div className="flex justify-between items-baseline text-[11px] font-bold mb-0.5 text-black">
              <span>{t.cv.expTutor}</span>
              <span className="font-mono text-gray-600">{t.cv.expTutorDate}</span>
            </div>
            <ul className="list-disc pl-5 text-[11px] text-gray-700 space-y-0.5 mt-0.5">
              {t.cv.expTutorDesc.map((desc: string, i: number) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Survival Skills */}
          <div>
            <div className="flex justify-between items-baseline text-[11px] font-bold mb-0.5 text-black">
              <span>{t.cv.expSkills} — <span className="italic font-normal">{t.cv.expSkillsOrg}</span></span>
              <span className="font-mono text-gray-600">{t.cv.expSkillsDate}</span>
            </div>
            <ul className="list-disc pl-5 text-[11px] text-gray-700 space-y-0.5 mt-0.5">
              {t.cv.expSkillsDesc.map((desc: string, i: number) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-5">
          <h2 className="text-[12px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2 text-black">
            {t.cv.projectsTitle}
          </h2>
          
          {/* Project 1 */}
          <div className="mb-1.5">
            <p className="text-[11px] font-bold text-black">{t.cv.projTgBotName}</p>
            <ul className="list-disc pl-5 text-[11px] text-gray-700 mt-0.5">
              {t.cv.projTgBotDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
            </ul>
          </div>

          {/* Project 2 */}
          <div className="mb-1.5">
            <p className="text-[11px] font-bold text-black">{t.cv.projWebGroceryName}</p>
            <ul className="list-disc pl-5 text-[11px] text-gray-700 mt-0.5">
              {t.cv.projWebGroceryDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
            </ul>
          </div>

          {/* Project 3 */}
          <div className="mb-1.5">
            <p className="text-[11px] font-bold text-black">{t.cv.projAppNutriName}</p>
            <ul className="list-disc pl-5 text-[11px] text-gray-700 mt-0.5">
              {t.cv.projAppNutriDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
            </ul>
          </div>

          {/* Project 4 */}
          <div>
            <p className="text-[11px] font-bold text-black">{t.cv.projWateringName}</p>
            <ul className="list-disc pl-5 text-[11px] text-gray-700 mt-0.5">
              {t.cv.projWateringDesc.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
            </ul>
          </div>
        </div>

        {/* Technical & pedagogical skills */}
        <div className="mt-5">
          <h2 className="text-[12px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2 text-black">
            {t.cv.skillsTitle}
          </h2>
          <p className="text-[11px] text-gray-700 mb-0.5">
            • <span className="font-bold">{t.cv.techSkills.split(': ')[0]}:</span> {t.cv.techSkills.split(': ')[1]}
          </p>
          <p className="text-[11px] text-gray-700">
            • <span className="font-bold">{t.cv.pedagogySkills.split(': ')[0]}:</span> {t.cv.pedagogySkills.split(': ')[1]}
          </p>
        </div>

        {/* Awards Section */}
        <div className="mt-5">
          <h2 className="text-[12px] font-bold tracking-widest uppercase border-b border-black pb-0.5 mb-2 text-black">
            {t.cv.awardsTitle}
          </h2>
          <ul className="list-disc pl-5 text-[11px] text-gray-700 space-y-0.5">
            {t.cv.awardItems.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

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
