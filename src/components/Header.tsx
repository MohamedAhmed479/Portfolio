import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/30 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Mohamed
            </span>
          </motion.div>

          {/* Desktop Menu - Transparent with hover effects */}
          <div className="hidden md:flex space-x-6">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-3 py-1 rounded-full"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{
                  backgroundColor: 'rgba(0, 217, 255, 0.2)',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white/90 hover:text-white transition-colors">
                  {item}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-px bg-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button - Minimalist */}
          <motion.div 
            className="md:hidden z-50"
            whileTap={{ scale: 0.9 }}
          >
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="text-white" size={24} />
              ) : (
                <Menu className="text-white" size={24} />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu - Fullscreen Glass Morphism */}
        <motion.div
          className={`md:hidden fixed inset-0 pt-20 ${scrolled ? 'bg-gray-900/80' : 'bg-gray-900/90'} backdrop-blur-lg`}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          style={{ zIndex: 40 }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl font-medium px-8 py-3 w-full text-center"
                custom={index}
                variants={itemVariants}
                whileHover={{
                  backgroundColor: 'rgba(0, 217, 255, 0.15)',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-white/90 hover:text-white">
                  {item}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;