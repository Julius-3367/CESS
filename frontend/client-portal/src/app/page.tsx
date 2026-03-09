'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Calculator,
  FileText,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send
} from 'lucide-react'

// Helper Components
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Here you would typically send to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="card-elegant p-8"
    >
      <h3 className="text-xl font-bold text-brand-deep-rose mb-4">Get in Touch</h3>
      <p className="text-brand-slate mb-6">
        Send us your details and we'll reach out to you within 24 hours
      </p>

      {submitStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-sm text-green-800">
            Thank you! We've received your message and will contact you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Something went wrong. Please try again or call us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input pl-10"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input pl-10"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input pl-10"
              placeholder="+254 700 000 000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="input pl-10 resize-none"
              placeholder="Tell us about your loan requirements..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              Send Message
              <Send className="ml-2" size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-rose-200">
        <p className="text-xs text-brand-slate text-center">
          Already have an account? <Link href="/login" className="text-brand-red hover:underline font-medium">Login here</Link>
        </p>
      </div>
    </motion.div>
  )
}

function RateCard({ amount, rate, highlight }: { amount: string; rate: string; highlight: boolean }) {
  return (
    <div className={`card p-6 text-center ${highlight ? 'ring-2 ring-brand-gold' : ''}`}>
      {highlight && (
        <div className="inline-block px-3 py-1 bg-gradient-gold text-white text-xs font-medium rounded-full mb-3">
          Preferred
        </div>
      )}
      <div className="text-sm text-brand-slate mb-2">KES</div>
      <div className="text-lg font-semibold text-brand-navy mb-2">{amount}</div>
      <div className="text-3xl font-bold text-brand-red">{rate}</div>
      <div className="text-xs text-brand-slate mt-2">per month</div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-rose rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BS</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-brand-deep-rose">
                  Berit Shalvah
                </h1>
                <p className="text-xs text-brand-slate">Financial Services</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-brand-slate hover:text-brand-red transition-colors">
                About
              </Link>
              <Link href="/#services" className="text-brand-slate hover:text-brand-red transition-colors">
                Services
              </Link>
              <Link href="/#rates" className="text-brand-slate hover:text-brand-red transition-colors">
                Rates
              </Link>
              <Link href="/#contact" className="text-brand-slate hover:text-brand-red transition-colors">
                Contact
              </Link>
              <Link href="/login" className="text-brand-slate hover:text-brand-red transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-elegant py-20 overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-rose-100 rounded-lg">
                <span className="text-brand-red font-medium text-sm">
                  Serving Kiambu & Nairobi Counties
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-deep-rose leading-tight">
                Where Vision Meets
                <span className="gradient-text block mt-2">
                  Responsible Capital
                </span>
              </h1>

              <p className="text-xl text-brand-slate leading-relaxed">
                Access business loans from <span className="font-semibold text-brand-red">KES 1,000</span> to
                <span className="font-semibold text-brand-red"> KES 5,000,000</span> with competitive rates starting at <span className="font-semibold text-brand-gold">5%</span> monthly interest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/register" className="btn btn-primary group">
                  Apply Now
                  <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link href="/calculator" className="btn btn-outline group">
                  <Calculator className="inline mr-2" size={20} />
                  Calculate Your Loan
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="text-brand-gold" size={20} />
                  <span className="text-sm text-brand-slate">Licensed by NDTC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-brand-gold" size={20} />
                  <span className="text-sm text-brand-slate">Secure Platform</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="card-elegant p-8 space-y-6">
                <h3 className="text-2xl font-bold text-brand-deep-rose">
                  Why Choose Us
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-brand-red mt-1 flex-shrink-0" size={22} />
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-1">Competitive Rates</h4>
                      <p className="text-sm text-brand-slate">Interest rates from 5% to 20% monthly</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="text-brand-navy mt-1 flex-shrink-0" size={22} />
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-1">Licensed & Regulated</h4>
                      <p className="text-sm text-brand-slate">Registered with NDTC and compliant</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-rose-600 mt-1 flex-shrink-0" size={22} />
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-1">Fast Processing</h4>
                      <p className="text-sm text-brand-slate">Applications reviewed within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="text-brand-gold mt-1 flex-shrink-0" size={22} />
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-1">Transparent Terms</h4>
                      <p className="text-sm text-brand-slate">No hidden fees or surprise charges</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-rose-200 pt-6">
                  <p className="text-brand-slate text-sm">
                    Integrity. Access. Growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl opacity-10 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-10 -z-10" />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-header text-left">About Us</h2>
              <p className="text-brand-slate text-lg mb-6">
                Berit Shalvah Financial Services is an NDTC-registered micro-lending institution serving businesses across Kiambu and Nairobi Counties.
              </p>
              <p className="text-brand-slate mb-6">
                We provide accessible financing solutions based on the principles of <strong className="text-brand-red">Integrity</strong>, <strong className="text-brand-gold">Access</strong>, and <strong className="text-brand-navy">Growth</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Licensed & Compliant</h4>
                    <p className="text-sm text-brand-slate">Registered with NDTC and operating within regulatory guidelines</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Transparent Terms</h4>
                    <p className="text-sm text-brand-slate">Clear lending terms with no hidden charges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-navy">Efficient Processing</h4>
                    <p className="text-sm text-brand-slate">Applications reviewed within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-elegant p-8">
                <h3 className="text-xl font-bold text-brand-deep-rose mb-4">Our Commitment</h3>
                <p className="text-brand-slate">
                  We provide responsible financing solutions to help businesses grow and succeed. Our focus is on building lasting partnerships with our clients.
                </p>
                <div className="mt-6 pt-6 border-t border-rose-200">
                  <p className="text-sm text-brand-slate">
                    <strong>Service Area:</strong> Kiambu County & Nairobi County<br />
                    <strong>Contact:</strong> beritfinance@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-header">Our Loan Services</h2>
            <p className="text-brand-slate text-lg">
              Flexible financing solutions tailored to your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-brand-red" size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">Business Growth</h3>
                <p className="text-brand-slate mb-4">
                  Finance business expansion, equipment purchase, or inventory with loans from KES 100,000 to KES 5,000,000.
                </p>
                <ul className="text-sm text-brand-slate space-y-2">
                  <li>• Repayment terms up to 60 months</li>
                  <li>• Rates from 5% to 20% monthly</li>
                  <li>• Collateral required (1.5x loan value)</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-brand-gold" size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">Working Capital</h3>
                <p className="text-brand-slate mb-4">
                  Finance operational expenses and maintain cash flow with loans from KES 50,000 to KES 500,000.
                </p>
                <ul className="text-sm text-brand-slate space-y-2">
                  <li>• Review within 24-48 hours</li>
                  <li>• 6-24 month repayment terms</li>
                  <li>• Standard documentation required</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-brand-navy" size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">Short-term Loans</h3>
                <p className="text-brand-slate mb-4">
                  Access funds for urgent business needs with loans from KES 1,000 to KES 50,000.
                </p>
                <ul className="text-sm text-brand-slate space-y-2">
                  <li>• Fast processing available</li>
                  <li>• 1-6 month repayment terms</li>
                  <li>• Reduced collateral requirements</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section id="rates" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-header">Transparent Interest Rates</h2>
            <p className="text-brand-slate text-lg">
              No hidden fees. Clear, competitive rates based on loan amount.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <RateCard amount="1 - 99,999" rate="20%" highlight={false} />
            <RateCard amount="100K - 399K" rate="17.5%" highlight={false} />
            <RateCard amount="400K - 599K" rate="15%" highlight={false} />
            <RateCard amount="600K - 799K" rate="10%" highlight={true} />
            <RateCard amount="800K - 999K" rate="7.5%" highlight={true} />
            <RateCard amount="1M+" rate="5%" highlight={true} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-brand-slate">
              * Legal fees: 2.5% of loan amount | Collateral: 1.5x loan value
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-header">Get In Touch</h2>
            <p className="text-brand-slate text-lg">
              Have questions? We're here to help you understand our services
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-brand-deep-rose mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-brand-red" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy">Email</h4>
                    <a href="mailto:beritfinance@gmail.com" className="text-brand-red hover:underline">
                      beritfinance@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-brand-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy">Service Area</h4>
                    <p className="text-brand-slate">Kiambu County & Nairobi County, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-navy" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy">Business Hours</h4>
                    <p className="text-brand-slate">Monday - Friday: 8:00 AM - 5:00 PM EAT</p>
                    <p className="text-brand-slate">Saturday: 9:00 AM - 1:00 PM EAT</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-rose text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start your loan application today and get approved within 48 hours
          </p>
          <Link href="/register" className="btn bg-white text-brand-red hover:bg-gray-100">
            Create Account
            <ArrowRight className="inline ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Berit Shalvah Financial Services</h3>
              <p className="text-gray-300 text-sm">
                Integrity. Access. Growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-300 text-sm">
                Email: beritfinance@gmail.com<br />
                Location: Kiambu County, Kenya
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-300 hover:text-white text-sm">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-300 text-sm">
            © 2026 Berit Shalvah Financial Services Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
