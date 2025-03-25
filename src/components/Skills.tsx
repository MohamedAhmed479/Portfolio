import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';

const skills = [
  {
    category: "Backend",
    items: [
      { name: "PHP", mastery: 75, color: "bg-emerald-500" },
      { name: "MySQL", mastery: 75, color: "bg-yellow-500" },
      { name: "Laravel", mastery: 75, color: "bg-purple-500" },
      { name: "RESTful APIs", mastery: 70, color: "bg-indigo-700" },
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", mastery: 60, color: "bg-blue-500" },
      { name: "CSS", mastery: 50, color: "bg-green-500" },
      { name: "JavaScript", mastery: 20, color: "bg-indigo-500" },
    ]
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", mastery: 70, color: "bg-emerald-500" },
      { name: "Docker", mastery: 10, color: "bg-cyan-500" },
      { name: "AWS", mastery: 10, color: "bg-orange-500" },
      { name: "Linux (Ubuntu, CLI Basics)", mastery: 10, color: "bg-gray-800" },

    ]
  },
  {
    category: "Programming Languages",
    items: [
      { name: "Python", mastery: 60, color: "bg-yellow-600" },
      { name: "C#", mastery: 60, color: "bg-cyan-600" },
      { name: "SQL", mastery: 80, color: "bg-blue-700" },
    ]
  },

];

const experiences = [
  {
    year: "2024",
    role: "Backend Developer (Personal Projects)",
    company: "Multi-Restaurant Food Ordering System",
    description: "Built a complete multi-restaurant ordering system with Laravel, Stripe payment, and role-based authentication.",
    location: "Remote"
  },
  {
    year: "2024",
    role: "Backend Developer (Personal Projects)",
    company: "E-Commerce Platform",
    description: "Developed a fully functional e-commerce system with product management, payment integration, and order tracking.",
    location: "Remote"
  },
  {
    year: "2024",
    role: "Backend Developer (Personal Projects)",
    company: "API Development & Authentication Systems",
    description: "Developed multiple APIs using Laravel Sanctum and JWT authentication for secure user access.",
    location: "Remote"
  }
];



const SkillMasteryBadge: React.FC<{ mastery: number, color: string }> = ({ mastery, color }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${mastery}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${color} h-2.5 rounded-full`}
        />
      </div>
      <div className="text-sm font-medium text-gray-700 w-12 text-right">
        {mastery}%
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{ category: string, skill: string } | null>(null);

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Skills & Expertise
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
              className="p-6 bg-gray-50 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">{skillGroup.category}</h3>
              <div className="space-y-4">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="bg-white rounded-lg p-4 shadow-md relative"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    onHoverStart={() => setHoveredSkill({ category: skillGroup.category, skill: skill.name })}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                    </div>
                    <AnimatePresence>
                      {hoveredSkill?.category === skillGroup.category &&
                        hoveredSkill?.skill === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2"
                          >
                            <SkillMasteryBadge mastery={skill.mastery} color={skill.color} />
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Experience Timeline</h3>
          <div className="max-w-4xl mx-auto relative">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                onClick={() => setSelectedExperience(selectedExperience === index ? null : index)}
              >
                {/* Experience Marker */}
                <motion.div
                  className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full z-10 shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <Star className="w-4 h-4 text-gray-500" />
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  className={`flex-1 p-6 bg-white rounded-xl shadow-md mx-4 cursor-pointer ${selectedExperience === index ? 'border-2 border-blue-500' : ''
                    }`}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">{experience.role}</h4>
                    <div className="text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {experience.year}
                    </div>
                  </div>
                  <div className="text-gray-600 mb-2 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {experience.company}
                  </div>
                  <div className="text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {experience.location}
                  </div>

                  <AnimatePresence>
                    {selectedExperience === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-700 mt-4 overflow-hidden"
                      >
                        {experience.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;