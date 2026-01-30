"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import { useSaved } from "@/contexts/SavedContext" // 👈 Connects to your Heart button logic
import { Loader2, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SavedPage() {
  const { savedIds } = useSaved() // Get the list of saved IDs from the "Brain"
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        // 1. Fetch ALL properties from your Database
        const res = await fetch('/api/properties')
        const data = await res.json()

        if (data.success) {
          // 2. Filter: Keep ONLY the ones that are in your 'savedIds' list
          const savedOnly = data.properties.filter((p: any) => savedIds.includes(p.id))
          setProperties(savedOnly)
        }
      } catch (err) {
        console.error("Failed to fetch properties")
      } finally {
        setLoading(false)
      }
    }

    fetchSavedProperties()
  }, [savedIds]) // Re-run this whenever you save/unsave something

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
             <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-red-500">
               <Heart size={24} fill="currentColor" />
             </div>
             <div>
               <h1 className="text-3xl font-bold">Your Wishlist</h1>
               <p className="text-gray-400">
                 You have {savedIds.length} saved propert{savedIds.length !== 1 ? "ies" : "y"}
               </p>
             </div>
          </div>

          {/* Loading State */}
          {loading ? (
             <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-violet-600" size={40} />
             </div>
          ) : properties.length > 0 ? (
             /* List of Saved Properties */
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((p) => (
                  <PropertyCard 
                    key={p.id} 
                    id={p.id} 
                    title={p.title} 
                    price={p.price} 
                    area={p.area} 
                    type={p.type} 
                    city={p.city} 
                    image={p.image_url} 
                    purpose={p.purpose} 
                  />
                ))}
             </div>
          ) : (
             /* Empty State (If nothing saved) */
             <div className="flex flex-col items-center justify-center h-96 bg-zinc-900/50 rounded-3xl border border-zinc-800 text-center p-8">
                <Heart size={64} className="text-zinc-700 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">No Saved Properties</h2>
                <p className="text-gray-400 max-w-md mb-8">
                  You haven't saved any properties yet. Browse our listings and click the heart icon to shortlist your favorites.
                </p>
                <Link href="/properties" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold transition flex items-center">
                  Browse Properties <ArrowRight className="ml-2" size={18} />
                </Link>
             </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}