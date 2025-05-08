
import { useState } from "react";
import { motion } from "framer-motion";
import { FloralPattern } from "@/components/FloralPattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  // FAQ data
  const faqs = [
    {
      question: "How can I enroll in a course?",
      answer:
        "You can enroll in a course by visiting the course page and clicking on the 'Enroll Now' button. You'll need to create an account or log in if you already have one, then follow the payment process if it's a paid course.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit/debit cards, PayPal, and bank transfers for course payments. All transactions are secure and encrypted for your safety.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Yes, we offer a 14-day money-back guarantee for most courses. If you're not satisfied with the course content, you can request a full refund within this period.",
    },
    {
      question: "How do live classes work?",
      answer:
        "Live classes are conducted through our integrated video conferencing platform. Once enrolled, you'll receive access to the scheduled sessions where you can interact directly with the instructor and other students.",
    },
    {
      question: "Do I get lifetime access to course materials?",
      answer:
        "Yes, once you purchase a course, you have lifetime access to all the materials, including future updates to the course content.",
    },
    {
      question: "How can I become an instructor?",
      answer:
        "To become an instructor, visit our 'Become an Instructor' page and fill out the application form. Our team will review your application and get back to you within 5-7 business days.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloralPattern className="opacity-30" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl font-bold mb-6 font-playfair"
            >
              <span className="text-gradient">Contact Us</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-6"
            >
              We'd love to hear from you. Send us a message and we'll get back to
              you as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-playfair">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="min-h-[150px] w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Calendly Integration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="h-[600px] border border-border rounded-lg overflow-hidden bg-card"
            >
              <h2 className="text-2xl font-bold p-6 font-playfair">
                Book an Appointment
              </h2>
              <div className="calendly-inline-widget h-full" data-url="https://calendly.com/fikrswap-academy/30min"></div>
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold mb-4 font-playfair"
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Find answers to common questions about our courses, payment
              methods, and more.
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold mb-4 font-playfair"
            >
              Get in <span className="text-gradient">Touch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Our support team is available to help you with any questions or
              concerns.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">
                For general inquiries and support
              </p>
              <a
                href="mailto:info@fikrswapacademy.com"
                className="text-brand-yellow hover:underline"
              >
                info@fikrswapacademy.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground mb-4">
                Available Monday-Friday, 9AM-5PM
              </p>
              <a
                href="tel:+1234567890"
                className="text-brand-yellow hover:underline"
              >
                +1 (234) 567-890
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">
                Chat with our support team in real-time
              </p>
              <button className="text-brand-yellow hover:underline">
                Start a Chat
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
