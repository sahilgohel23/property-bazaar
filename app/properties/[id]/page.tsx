"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MapPin, Square, ArrowLeft, Loader2, Calendar, User, Trash2 } from "lucide-react"

// Import Both Calculators
import MortgageCalculator from "@/components/mortgage-calculator"
import PricePredictor from "@/components/price-predictor"

export default function PropertyDetails() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id

  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  // 1. Fetch the Property
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return

      try {
        const res = await fetch(`/api/properties/${id}`)
        
        if (!res.ok) {
           setLoading(false)
           return
        }

        const data = await res.json()
        if (data.success) {
          setProperty(data.property)
        }
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  // 2. Delete Logic
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this?")) return
    
    setDeleting(true)
    try {
        await fetch(`/api/properties/${id}`, { method: "DELETE" })
        alert("Deleted!")
        router.push("/properties")
        router.refresh()
    } catch (e) {
        alert("Error deleting")
    } finally {
        setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <Loader2 className="animate-spin text-violet-600" size={48} />
      </div>
    )
  }
  
  if (!property) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <h1 className="text-3xl font-bold text-red-500">Property Not Found</h1>
        <Link href="/properties" className="text-violet-400 hover:text-violet-300 underline">Back to All Properties</Link>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <div className="flex justify-between items-center mb-6">
            <Link href="/properties" className="inline-flex items-center text-violet-400 hover:text-violet-300 transition">
                <ArrowLeft className="mr-2" size={20} /> Back to Listings
            </Link>

            <button 
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition border border-red-500/20"
            >
                {deleting ? <Loader2 className="animate-spin mr-2" /> : <Trash2 className="mr-2" size={18} />}
                Delete
            </button>
          </div>

          <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-800">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[500px] group">
              <img 
                src={property.image_url || "https://images.unsplash.com/photo-1600596542815-e328d4de4bf7"} 
                alt={property.title} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              {/* GLASS EFFECT PRICE TAG */}
              <div className="absolute top-4 right-4 bg-violet-950/60 backdrop-blur-md border border-violet-500/30 text-white px-6 py-2 rounded-full font-bold text-lg shadow-xl">
                ₹ {parseInt(property.price).toLocaleString('en-IN')}
              </div>
              {/* GLASS EFFECT STATUS TAG */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white px-4 py-1 rounded-full uppercase text-sm font-semibold tracking-wide">
                For {property.purpose}
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-400 text-lg">
                    <MapPin className="mr-2 text-violet-500" size={24} />
                    {property.city}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                   <Link 
                      href={`/book-appointment/${property.id}?title=${encodeURIComponent(property.title)}`}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center"
                    >
                      <Calendar className="mr-2" size={20} />
                      Book a Visit
                   </Link>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 py-8 border-t border-zinc-800 mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Square className="text-violet-500" size={28} />
                  <div>
                    <span className="block text-sm text-gray-500">Area</span>
                    <span className="font-bold text-lg">{property.area} sq ft</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="text-violet-500 text-2xl font-bold">🏢</div>
                  <div>
                    <span className="block text-sm text-gray-500">Type</span>
                    <span className="font-bold text-lg">{property.type}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none text-gray-400 leading-relaxed mb-12">
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <p>{property.description || "No description provided."}</p>
              </div>

              {/* --- FEATURES SECTION (Only if For Sell) --- */}
              {property.purpose === 'sell' && (
                <>
                  {/* 1. AI Price Predictor */}
                  <div className="mb-12">
                     <PricePredictor 
                        currentPrice={parseInt(property.price)} 
                        city={property.city} 
                        type={property.type} 
                     />
                  </div>

                  {/* 2. Mortgage Calculator */}
                  <div className="mb-12">
                    <MortgageCalculator price={parseInt(property.price)} />
                  </div>
                </>
              )}

              {/* Owner Contact */}
              <div className="bg-zinc-950 p-6 rounded-xl flex items-center gap-4 border border-zinc-800">
                  <div className="bg-zinc-900 p-3 rounded-full border border-zinc-800">
                    <User className="text-violet-500" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-violet-400 font-bold uppercase">Owner Contact</p>
                    <p className="text-lg font-bold text-white">{property.owner_name || "Property Owner"}</p>
                    <p className="text-gray-500">{property.owner_contact}</p>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}