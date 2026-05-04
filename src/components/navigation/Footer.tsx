import Link from "next/link";

/**
 * Footer component with logo, quick links, contact info, social icons, and copyright
 * Server component - no interactivity needed
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/pets", label: "Pets" },
    { href: "/store", label: "Store" },
    { href: "/about", label: "About" },
    { href: "/guarantee", label: "Guarantee" },
  ];

  const contactInfo = [
    { icon: "📍", text: "123 Pet Street, Animal City" },
    { icon: "📞", text: "(555) 123-4567" },
    { icon: "✉️", text: "hello@petshop.com" },
  ];

  const socialLinks = [
    { label: "Facebook", icon: "f" },
    { label: "Twitter", icon: "𝕏" },
    { label: "Instagram", icon: "📷" },
    { label: "YouTube", icon: "▶️" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-brand-500"
            >
              <span className="text-brown-500">Pet</span>
              <span>Shop</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Your trusted destination for quality pet products and accessories.
              We love pets as much as you do!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-brand-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Follow Us
            </h3>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-brand-500 hover:text-brand-500"
                  aria-label={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} PetShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}