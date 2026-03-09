'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-rose rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">BS</span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg text-brand-deep-rose">
                                Berit Shalvah
                            </h1>
                            <p className="text-xs text-brand-slate">Financial Services</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className={`text-sm transition-colors ${pathname === '/' ? 'text-brand-red font-medium' : 'text-brand-slate hover:text-brand-red'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#about"
                            className="text-sm text-brand-slate hover:text-brand-red transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/#rates"
                            className="text-sm text-brand-slate hover:text-brand-red transition-colors"
                        >
                            Rates
                        </Link>
                        <Link
                            href="/calculator"
                            className={`text-sm transition-colors ${pathname === '/calculator' ? 'text-brand-red font-medium' : 'text-brand-slate hover:text-brand-red'
                                }`}
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm text-brand-slate hover:text-brand-red transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="btn btn-primary text-sm px-5 py-2"
                        >
                            Apply Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Link href="/register" className="btn btn-primary text-sm px-4 py-2">
                            Apply
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
