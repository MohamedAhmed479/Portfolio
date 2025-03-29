import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';

const projects = [
  {
    title: "Simple E-Commerce Platform",
    description: "A full-fledged e-commerce website with product management, payments, and order tracking.",
    image: p2,
    tags: ["Laravel", "MySQL"],
    links: {
      github: "https://github.com/MohamedAhmed479/My_First_Laravel_Project",
    }
  },
  {
    title: "Multi-Restaurant Food Ordering System",
    description: "A food ordering platform supporting multiple restaurants with online payments.",
    image: p1,
    tags: ["Laravel", "Stripe"],
    links: {
      github: "https://github.com/MohamedAhmed479/Multi-Restaurant-Food-Ordering-Application",
    }
  },
];

const Projects: React.FC = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        mass: 0.5
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 8,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
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

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.3
      }
    }),
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(59, 130, 246, 0.1)"
    }
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 70,
            damping: 10
          }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          Featured Projects
        </motion.h2>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <motion.div 
                className="relative overflow-hidden group"
                variants={imageVariants}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={iconVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                    className="text-white p-3 bg-gray-800 rounded-full bg-opacity-80 hover:bg-opacity-100"
                  >
                    <Github size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 sm:p-6"
                variants={textVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <motion.h3 
                  className="text-lg sm:text-xl font-bold mb-2"
                  whileHover={{ color: "#3b82f6" }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      variants={tagVariants}
                      custom={tagIndex}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      whileHover="hover"
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-xs sm:text-sm rounded-full"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;