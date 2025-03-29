import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    open: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2 
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 24
      }
    },
    closed: { 
      opacity: 0, 
      y: -10,
      transition: { 
        duration: 0.15 
      } 
    }
  };

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  if (!isMounted) return null;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/30 backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Mohamed
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  backgroundColor: 'rgba(8, 145, 178, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  {item}
                </span>
                <motion.span
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden z-50 p-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="text-white" size={24} />
            ) : (
              <Menu className="text-white" size={24} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-0 pt-24 bg-gray-900/95 backdrop-blur-lg"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              style={{ zIndex: 40 }}
            >
              <div className="flex flex-col items-center justify-start h-full space-y-6 pt-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-xl font-medium px-8 py-4 w-full text-center relative"
                    variants={itemVariants}
                    whileHover={{
                      backgroundColor: 'rgba(8, 145, 178, 0.15)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-white/90 hover:text-white">
                      {item}
                    </span>
                    <motion.span
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1/4 h-0.5 bg-cyan-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;