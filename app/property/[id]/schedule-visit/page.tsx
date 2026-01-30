"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import properties from "@/data/properties.json"

export default function ScheduleVisitPage() {
  const params = useParams()
  const property = properties.find((p) => p.id === Number.parseInt(params.id as string))

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    visitTime: "",
    duration: "1",
    notes: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!formData.visitDate) {
      setError("Visit date is required")
      return false
    }
    if (!formData.visitTime) {
      setError("Visit time is required")
      return false
    }

    // Check if the selected date is not in the past
    const selectedDateTime = new Date(`${formData.visitDate}T${formData.visitTime}`)
    if (selectedDateTime < new Date()) {
      setError("Visit date and time must be in the future")
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

    console.log("Visit scheduled:", formData)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      visitDate: "",
      visitTime: "",
      duration: "1",
      notes: "",
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
            {/* Schedule Visit Form */}
            <div className="lg:col-span-2 bg-black border-b border-white/10 rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule a Visit</h1>
              <p className="text-gray-600 mb-8">Book a time slot to visit this property</p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">
                    Visit scheduled successfully! The owner will confirm shortly.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visitDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      id="visitDate"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="visitTime" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      id="visitTime"
                      name="visitTime"
                      value={formData.visitTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Duration (hours)
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10"
                  >
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any specific areas you'd like to focus on, special requirements, etc."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black border-b border-white/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                >
                  Schedule Visit
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

                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-gray-600 text-sm">Area</p>
                      <p className="font-semibold text-gray-800">{property.area} sq.ft</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Type</p>
                      <p className="font-semibold text-gray-800">{property.type}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Owner</h4>
                    <p className="font-semibold text-gray-800 mb-2">{property.owner.name}</p>
                    <a
                      href={`tel:${property.owner.contact}`}
                      className="text-blue-600 hover:underline block mb-2 text-sm"
                    >
                      {property.owner.contact}
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
