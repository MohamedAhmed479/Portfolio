import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("moveleob");
  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-lg font-medium text-green-600"
      >
        Thanks for contacting me! I'll get back to you soon.
      </motion.div>
    );
  }
  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-8 shadow-lg rounded-xl"
    >
      {["Name", "Email", "Message"].map((field, index) => (
        <div key={index}>
          <label
            htmlFor={field.toLowerCase()}
            className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2"
          >
            {field}
          </label>
          {field === "Message" ? (
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 focus:shadow-lg"
            />
          ) : (
            <input
              type={field === "Email" ? "email" : "text"}
              id={field.toLowerCase()}
              name={field.toLowerCase()}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 focus:shadow-lg"
            />
          )}
          <ValidationError
            prefix={field}
            field={field.toLowerCase()}
            errors={state.errors}
            className="text-red-500 text-xs mt-1"
          />
        </div>
      ))}
      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "#333",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-black text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg transition-all duration-300 hover:bg-gray-800 text-sm sm:text-base"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
}

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
        >
          Get in Touch
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
              Contact Information
            </h3>

            <div className="flex flex-col space-y-4 sm:space-y-6">
              {[
                { Icon: Mail, text: "mohamedahmeddev333@gmail.com" },
                { Icon: Phone, text: "+0201020129678" },
                { Icon: MapPin, text: "Cairo, Nasr City" },
              ].map(({ Icon, text }, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md 
                             transition-transform duration-300 transform hover:scale-[1.02] sm:hover:scale-105 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 sm:p-3 bg-gray-200 rounded-full shadow-md"
                  >
                    <Icon className="text-gray-700" size={20} />
                  </motion.div>
                  <span className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-lg font-medium break-all">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;