"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import { Search, Loader2, Home, Shield, TrendingUp } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [city, setCity] = useState("")
  const [dbProperties, setDbProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties')
        const data = await res.json()
        if (data.success) {
          setDbProperties(data.properties)
        }
      } catch (err) {
        console.error("Failed to fetch properties")
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const handleSearch = () => {
    if (city.trim()) {
      router.push(`/properties?city=${city}`)
    } else {
      router.push("/properties")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Get top 6 properties
  const featuredProperties = dbProperties.slice(0, 6)

  return (
    <>
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-black overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-black to-black z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Dream Property</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Search from thousands of premium properties across India. 
            Your perfect home is just a click away.
          </p>

          {/* --- FIXED SEARCH BAR --- */}
          <div className="relative z-20 max-w-4xl mx-auto mt-8">
            <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 shadow-2xl shadow-violet-900/20 flex flex-col md:flex-row gap-3">
              
              {/* Input Field Area */}
              <div className="relative flex-grow">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Search size={22} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by city (e.g. Mumbai)..." 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-14 pl-12 pr-4 bg-zinc-950 text-white rounded-xl border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition text-base placeholder:text-gray-600"
                />
              </div>

              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="h-14 px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-xl transition shadow-lg whitespace-nowrap flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </div>
          {/* ----------------------- */}

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16 text-center">
            <div className="p-4 rounded-xl hover:bg-white/5 transition">
              <p className="text-2xl md:text-3xl font-bold text-white">
                 {loading ? "..." : dbProperties.length + "+"}
              </p>
              <p className="text-gray-500 text-sm mt-1">Properties</p>
            </div>
            <div className="p-4 rounded-xl hover:bg-white/5 transition">
              <p className="text-2xl md:text-3xl font-bold text-white">50K+</p>
              <p className="text-gray-500 text-sm mt-1">Customers</p>
            </div>
            <div className="p-4 rounded-xl hover:bg-white/5 transition">
              <p className="text-2xl md:text-3xl font-bold text-white">24/7</p>
              <p className="text-gray-500 text-sm mt-1">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURED LISTINGS --- */}
      <section className="bg-black py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-violet-900/30 text-violet-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-violet-500/20">
              Featured Listings
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Handpicked For You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
                 <div className="col-span-full flex justify-center py-20">
                    <Loader2 className="animate-spin text-violet-600" size={40} />
                 </div>
            ) : featuredProperties.length > 0 ? (
                featuredProperties.map((property) => (
                  <div key={property.id} className="h-full">
                    <PropertyCard
                      id={property.id}
                      title={property.title}
                      price={property.price}
                      area={property.area}
                      type={property.type}
                      city={property.city}
                      image={property.image_url}
                      purpose={property.purpose}
                    />
                  </div>
                ))
            ) : (
                <div className="col-span-full text-center py-20 text-gray-500 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p>No properties listed yet.</p>
                </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/properties" className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-xl border border-zinc-800 transition font-semibold shadow-lg">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="bg-zinc-950 py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard 
              icon={<Home size={24} />}
              title="Wide Range"
              desc="From cozy apartments to luxury villas, find exactly what fits your lifestyle."
            />
            <FeatureCard 
              icon={<Shield size={24} />}
              title="Trusted & Verified"
              desc="Every listing is verified by our team to ensure you get a scam-free experience."
            />
            <FeatureCard 
              icon={<TrendingUp size={24} />}
              title="Best Rates"
              desc="We negotiate the best deals so you get the most value for your money."
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-violet-500/50 transition group h-full">
      <div className="w-12 h-12 bg-violet-900/30 rounded-xl flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  )
}