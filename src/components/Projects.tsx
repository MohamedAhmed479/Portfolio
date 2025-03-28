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
    image: p1,
    tags: ["Laravel", "MySQL"],
    links: {
      github: "https://github.com/MohamedAhmed479/My_First_Laravel_Project",
    }
  },
  {
    title: "Multi-Restaurant Food Ordering System",
    description: "A food ordering platform supporting multiple restaurants with online payments.",
    image: p2,
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

  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          Featured Projects
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white p-2"
                  >
                    <Github size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-xs sm:text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;