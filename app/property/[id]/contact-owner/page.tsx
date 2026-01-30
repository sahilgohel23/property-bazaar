"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import properties from "@/data/properties.json"

export default function ContactOwnerPage() {
  const params = useParams()
  const property = properties.find((p) => p.id === Number.parseInt(params.id as string))

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Not Found</h1>
            <Link
              href="/properties"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Properties
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return false
    }
    if (!formData.message.trim()) {
      setError("Message is required")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    console.log("Contact form submitted:", formData)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })

    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  const formattedPrice = property.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href={`/property/${property.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Property
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-black border-b border-white/10 rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Owner</h1>
              <p className="text-gray-600 mb-8">Get in touch with the property owner about this listing</p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">Thank you! Your inquiry has been sent to the owner.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91-9876543210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is your inquiry about?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell the owner about your interest and ask any questions..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Property Details Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-black border-b border-white/10 rounded-lg shadow-lg overflow-hidden sticky top-24">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">₹{formattedPrice}</p>
                  <p className="text-gray-600 mb-4">{property.city}</p>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Owner Details</h4>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                      {property.owner.name.charAt(0)}
                    </div>
                    <p className="font-semibold text-gray-800 mb-3">{property.owner.name}</p>
                    <a href={`tel:${property.owner.contact}`} className="text-blue-600 hover:underline block mb-2">
                      {property.owner.contact}
                    </a>
                    <a
                      href={`mailto:${property.owner.email}`}
                      className="text-blue-600 hover:underline block break-all"
                    >
                      {property.owner.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
