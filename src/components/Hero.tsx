import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

// تأثير الطباعة التدريجي للنص
const CodeTypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, [text]);

  return (
    <span className="font-mono">
      {displayedText}
      <motion.span
        className="inline-block w-2 h-6 bg-green-500"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 w-full h-full">
        {[
          { bg: "bg-blue-300", x: [-150, 150], y: [150, -150], duration: 7 },
          { bg: "bg-purple-300", x: [100, -100], y: [-100, 100], duration: 5 },
          { bg: "bg-yellow-300 right-0", x: [-100, 100], y: [100, -100], duration: 5 },
        ].map(({ bg, x, y, duration }, index) => (
          <motion.div
            key={index}
            className={`absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 ${bg} rounded-full mix-blend-multiply filter blur-xl opacity-70`}
            animate={{ x: [0, ...x, 0], y: [0, ...y, 0], rotate: [0, 15, 0, -15, 0] }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4 sm:space-y-6">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 relative inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <span className="mr-2">Hi, I'm</span>
          <span className="relative text-green-500 px-2">
            Mohamed Ahmed
            {/* تأثير التوهج */}
            <motion.span
              className="absolute inset-0 bg-green-400 opacity-30 blur-md rounded-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        <motion.div
          className="mt-2 sm:mt-4 text-base sm:text-xl md:text-2xl text-green-400 font-mono bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700 w-full max-w-xs sm:max-w-none sm:w-max mx-auto overflow-x-auto"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <div className="whitespace-nowrap">
            <CodeTypingEffect text="</?php // Backend Laravel Developer" />
            <motion.span
              className="inline-block bg-green-400 w-[8px] sm:w-[10px] h-[18px] sm:h-[24px] ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* روابط وسائل التواصل */}
        <motion.div
          className="flex justify-center space-x-4 sm:space-x-6 mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {[
            { Icon: Github, href: "https://github.com/MohamedAhmed479", tooltip: "GitHub Profile" },
            { Icon: Linkedin, href: "http://www.linkedin.com/in/mohamed-ahmed-354a572a3", tooltip: "LinkedIn Profile" },
            { Icon: Mail, href: "mailto:mohamedahmeddev333@gmail.com", tooltip: "Send Email" },
          ].map(({ Icon, href, tooltip }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors group relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={tooltip}
            >
              <Icon size={20} className="sm:w-6 sm:h-6" />
              <span className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {tooltip}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;