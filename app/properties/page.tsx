"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import { Loader2, Filter } from "lucide-react"

// 1. Create a sub-component to handle the filtering logic
function PropertiesContent() {
  const searchParams = useSearchParams()
  
  // Get the filters from the URL
  const purposeQuery = searchParams.get("purpose") // e.g. "rent" or "sell"
  const cityQuery = searchParams.get("city")      // e.g. "Mumbai"

  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/properties")
        const data = await res.json()

        if (data.success) {
          let filtered = data.properties

          // 🔍 FILTER LOGIC: Purpose (Rent vs Sell)
          if (purposeQuery) {
            filtered = filtered.filter((p: any) => 
               p.purpose && p.purpose.toLowerCase() === purposeQuery.toLowerCase()
            )
          }

          // 🔍 FILTER LOGIC: City
          if (cityQuery) {
            filtered = filtered.filter((p: any) => 
               p.city && p.city.toLowerCase().includes(cityQuery.toLowerCase())
            )
          }
          
          setProperties(filtered)
        }
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [purposeQuery, cityQuery]) // 👈 This makes it re-run when you click "Buy" or "Rent"

  if (loading) {
    return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-violet-500" size={48} />
        </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">
            {purposeQuery ? (purposeQuery === 'sell' ? 'Properties for Sale' : 'Properties for Rent') : 'All Properties'}
          </h1>
          <p className="text-gray-400">
             {properties.length} {properties.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-400">
           <Filter size={18} />
           <span className="text-sm">
             {purposeQuery ? `Filter: ${purposeQuery.toUpperCase()}` : "Showing All"}
           </span>
        </div>
      </div>

      {/* Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              area={property.area}
              type={property.type}
              city={property.city}
              image={property.image_url}
              purpose={property.purpose}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white">No properties found</h3>
            <p className="text-gray-500 mt-2">Try changing your filters.</p>
        </div>
      )}
    </div>
  )
}

// 2. Main Page Component (Wraps content in Suspense)
export default function PropertiesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen bg-black text-white">
        <Suspense fallback={<div className="text-white text-center pt-20">Loading...</div>}>
          <PropertiesContent />
        </Suspense>
      </div>
      <Footer />
    </>
  )
}