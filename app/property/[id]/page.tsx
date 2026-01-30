"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import properties from "@/data/properties.json"

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const params = useParams()
  
  useEffect(() => {
    if (params?.id) {
      const foundProperty = properties.find((p) => p.id === Number(params.id))
      setProperty(foundProperty)
      setLoading(false)
    }
  }, [params?.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
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

  const formattedPrice = property.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/properties"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-black border-b border-white/10 rounded-lg shadow-lg overflow-hidden">
                {/* Main Image */}
                <div className="relative h-96 md:h-[500px] bg-gray-200">
                  <img
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {property.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {property.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto bg-gray-100">
                    {property.images.map((image: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition ${
                          index === currentImageIndex ? "ring-2 ring-blue-600" : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Description */}
              <div className="bg-black border-b border-white/10 rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Property</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
              </div>

              {/* Facilities */}
              <div className="bg-black border-b border-white/10 rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Facilities & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.facilities.map((facility: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Price Card */}
              <div className="bg-black border-b border-white/10 rounded-lg shadow-lg p-6 mb-6 lg:sticky">
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-2">Price</p>
                  <p className="text-4xl font-bold text-blue-600">₹{formattedPrice}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-gray-600 text-sm">Area</p>
                    <p className="text-xl font-semibold text-gray-800">{property.area} sq.ft</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Type</p>
                    <p className="text-xl font-semibold text-gray-800">{property.type}</p>
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-gray-600 text-sm mb-2">Location</p>
                  <p className="text-lg font-semibold text-gray-800">{property.city}</p>
                </div>

                {/* Contact Owner */}
                <Link
                  href={`/property/${property.id}/contact-owner`}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-3 block text-center"
                >
                  Contact Owner
                </Link>
                <Link
                  href={`/property/${property.id}/schedule-visit`}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold block text-center"
                >
                  Schedule Visit
                </Link>
              </div>

              <div className="bg-black border-b border-white/10 rounded-lg shadow-lg p-6 relative z-10">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Owner Details</h3>

                <div className="mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {property.owner.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-gray-800">{property.owner.name}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <a href={`mailto:${property.owner.email}`} className="text-blue-600 hover:underline break-all">
                      {property.owner.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Phone</p>
                    <a
                      href={`tel:${property.owner.contact}`}
                      className="text-blue-600 hover:underline text-lg font-semibold"
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
