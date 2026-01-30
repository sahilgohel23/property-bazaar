"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <h3 className="font-bold text-lg">PropertyBazaar</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find your perfect property across India's best cities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition text-sm">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Popular Cities</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?city=Mumbai" className="text-gray-400 hover:text-white transition text-sm">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Delhi" className="text-gray-400 hover:text-white transition text-sm">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Bangalore" className="text-gray-400 hover:text-white transition text-sm">
                  Bangalore
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <a href="mailto:info@propertybazaar.com" className="hover:text-white transition">
                  info@propertybazaar.com
                </a>
              </li>
              <li className="text-gray-400">
                <a href="tel:+918001234567" className="hover:text-white transition">
                  +91-1800-PROPERTY
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">Subscribe for property updates</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition font-medium text-sm"
              >
                Subscribe
              </button>
            </form>
            {subscribed && <p className="text-green-400 text-xs mt-2">Thanks for subscribing!</p>}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* Bottom Footer */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8">
            <p>&copy; 2025 PropertyBazaar. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <Link href="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
