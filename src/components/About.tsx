import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaDownload } from "react-icons/fa";
import profileImg from '../assets/profile.png';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* تحسين الصورة للهواتف */}
          <motion.div
            className="flex justify-center items-center relative order-1 md:order-none mb-8 md:mb-0"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src={profileImg}
              alt="Developer working"
              className="rounded-full w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] object-cover shadow-lg md:shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              animate={{
                y: [0, -5, 0], // تقليل مقدار الاهتزاز للهواتف
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          {/* تحسين النصوص للهواتف */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-2 md:order-none"
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black text-center md:text-left"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I'm an aspiring software developer with a strong focus on backend
              development using Laravel. I am passionate about creating clean,
              efficient code and building systems that are easy to maintain and
              scale.
            </motion.p>
            <motion.p
              className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I enjoy tackling challenges and continuously improving my
              development skills. In my free time, I stay up-to-date with the
              latest web technologies and enjoy working on personal projects.
            </motion.p>

            {/* تحسين زر التحميل للهواتف */}
            <div className="flex justify-center md:justify-start">
              <a
                href="https://drive.google.com/uc?export=download&id=141BJvuowDiKzcqEcrfZ0R3P4VVCsAvQd"
                download
                className="block"
              >
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#333" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-black text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full relative overflow-hidden text-sm sm:text-base"
                >
                  <FaDownload size={16} />
                  Download Resume
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;