import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaDownload } from "react-icons/fa";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* تحسين عرض الصورة مع تأثير متحرك */}
          <motion.div
            className="flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="/images/profile.png"
              alt="Developer working"
              className="rounded-full w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-cover shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                y: [0, -10, 0], // تأثير الاهتزاز الطفيف
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          {/* النصوص والعناوين مع تحسينات حركية */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h2
              className="text-4xl font-bold mb-6 text-black"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6 text-lg leading-relaxed"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I'm an aspiring software developer with a strong focus on backend
              development using Laravel. I am passionate about creating clean,
              efficient code and building systems that are easy to maintain and
              scale. Currently, I am honing my skills in PHP and Laravel, and
              I'm particularly interested in mastering database design, backend
              architecture, and security best practices.
            </motion.p>
            <motion.p
              className="text-gray-600 mb-6 text-lg leading-relaxed"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I enjoy tackling challenges and continuously improving my
              development skills. In my free time, I stay up-to-date with the
              latest web technologies and enjoy working on personal projects
              that enhance my understanding of full-stack development.
            </motion.p>

            {/* زر التحميل مع تأثير لمعان متحرك */}
            <a
              href="https://drive.google.com/uc?export=download&id=141BJvuowDiKzcqEcrfZ0R3P4VVCsAvQd"
              download
              className="block"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full relative overflow-hidden"
              >
                <FaDownload size={20} />
                Download Resume
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
