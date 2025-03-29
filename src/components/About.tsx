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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.03,
      rotate: 2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#111",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center"
        >
          {/* Profile Image Section */}
          <motion.div
            className="flex justify-center items-center w-full md:w-1/2 order-1 md:order-none mb-10 md:mb-0 relative"
            variants={imageVariants}
            whileHover="hover"
          >
            <motion.img
              src={profileImg}
              alt="Profile"
              className="rounded-full w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-88 xl:h-88 object-cover shadow-2xl border-4 border-white"
              animate={floatingAnimation}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-transparent"
              whileHover={{ 
                borderColor: "rgba(255,255,255,0.3)",
                boxShadow: "0 0 30px rgba(0,0,0,0.2)"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            variants={containerVariants}
            className="w-full md:w-1/2 order-2 md:order-none text-center md:text-left"
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-gray-800"
              variants={textVariants}
            >
              About <span className="text-black">Me</span>
            </motion.h2>
            
            <motion.div className="space-y-5 sm:space-y-6">
              <motion.p
                className="text-gray-600 text-lg sm:text-xl lg:text-xl leading-relaxed"
                variants={textVariants}
                custom={0}
              >
                I'm an aspiring <span className="font-semibold text-gray-700">software developer</span> with a strong focus on backend
                development using <span className="font-semibold text-gray-700">Laravel</span>. I am passionate about creating clean,
                efficient code and building systems that are easy to maintain and
                scale.
              </motion.p>
              
              <motion.p
                className="text-gray-600 text-lg sm:text-xl lg:text-xl leading-relaxed"
                variants={textVariants}
                custom={1}
              >
                I enjoy tackling challenges and continuously improving my
                development skills. In my free time, I stay up-to-date with the
                latest web technologies and enjoy working on <span className="font-semibold text-gray-700">personal projects</span>.
              </motion.p>
            </motion.div>

            {/* Download Button */}
            <motion.div
              className="flex justify-center md:justify-start mt-8 sm:mt-10"
              variants={textVariants}
              custom={2}
            >
              <a
                href="https://drive.google.com/uc?export=download&id=141BJvuowDiKzcqEcrfZ0R3P4VVCsAvQd"
                download
                className="inline-block"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center gap-3 bg-black text-white px-7 py-3 sm:px-8 sm:py-3.5 rounded-full relative overflow-hidden text-base sm:text-lg font-medium"
                >
                  <FaDownload className="text-white" />
                  Download Resume
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ 
                      x: "100%", 
                      opacity: [0, 0.4, 0],
                      transition: { 
                        duration: 2.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  />
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;