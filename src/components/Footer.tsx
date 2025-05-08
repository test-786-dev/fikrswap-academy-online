
import { Link } from "react-router-dom";
import { FloralPattern } from "@/components/FloralPattern";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "About",
      links: [
        { label: "Our Story", url: "/about" },
        { label: "Mission", url: "/about#mission" },
        { label: "Team", url: "/about#team" },
        { label: "Careers", url: "/careers" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Courses", url: "/courses" },
        { label: "Live Classes", url: "/live-classes" },
        { label: "Blog", url: "/blog" },
        { label: "FAQ", url: "/faq" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", url: "/terms" },
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Cookie Policy", url: "/cookies" },
        { label: "Accessibility", url: "/accessibility" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "Contact Us", url: "/contact" },
        { label: "Support", url: "/support" },
        { label: "Partnership", url: "/partnership" },
        { label: "Community", url: "/community" }
      ]
    }
  ];

  const socialLinks = [
    { label: "Facebook", url: "https://facebook.com" },
    { label: "Twitter", url: "https://twitter.com" },
    { label: "Instagram", url: "https://instagram.com" },
    { label: "YouTube", url: "https://youtube.com" }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-card relative overflow-hidden pt-20 pb-10">
      <FloralPattern />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={childVariants}
            className="lg:col-span-2"
          >
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-3xl font-bold font-playfair">
                <span className="text-gradient">FikrSwap</span> Academy
              </h3>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Empowering learners to share knowledge inspired by the wisdom of tradition. Join our community and embrace the joy of learning together.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={childVariants}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors"
                  aria-label={link.label}
                >
                  {link.label.charAt(0)}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li key={link.label} variants={childVariants}>
                    <Link
                      to={link.url}
                      className="text-muted-foreground hover:text-brand-yellow transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t border-border mt-16 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} FikrSwap Academy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Made with ❤️ for the community
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
