"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Loader2, UploadCloud } from "lucide-react"

export default function ListProperty() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    city: "",
    type: "Apartment",
    purpose: "sell",
    image_url: "",
    owner_name: "",
    owner_contact: ""
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        alert("Property Listed Successfully! 🎉")
        router.push("/") 
        router.refresh()
      } else {
        alert("Error: " + data.error)
      }
    } catch (error) {
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      {/* 1. Main Background: Black */}
      <div className="pt-24 pb-16 min-h-screen bg-black">
        
        {/* 2. Form Card: Dark Gray with Border */}
        <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-8">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">List Your Property</h1>
            <p className="text-gray-400">Enter the details below to find a buyer or tenant.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Property Title</label>
              <input 
                required name="title" value={formData.title} onChange={handleChange} type="text" 
                placeholder="e.g. Luxury Apartment in Mumbai" 
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none text-white placeholder-zinc-600" 
              />
            </div>

            {/* Price & Area */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Price (₹)</label>
                <input 
                  required name="price" value={formData.price} onChange={handleChange} type="number" 
                  placeholder="5000000" 
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none text-white placeholder-zinc-600" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Area (sq ft)</label>
                <input 
                  required name="area" value={formData.area} onChange={handleChange} type="number" 
                  placeholder="1200" 
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none text-white placeholder-zinc-600" 
                />
              </div>
            </div>

            {/* City & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">City</label>
                <input 
                  required name="city" value={formData.city} onChange={handleChange} type="text" 
                  placeholder="Mumbai" 
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none text-white placeholder-zinc-600" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Type</label>
                <select 
                  name="type" value={formData.type} onChange={handleChange} 
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none text-white"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Purpose</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-lg p-3 text-center transition ${formData.purpose === 'sell' ? 'bg-violet-900/30 border-violet-500 text-violet-300 font-bold' : 'border-zinc-700 text-gray-400 hover:bg-zinc-800'}`}>
                    <input type="radio" name="purpose" value="sell" className="hidden" checked={formData.purpose === 'sell'} onChange={handleChange} /> Sell
                </label>
                <label className={`cursor-pointer border rounded-lg p-3 text-center transition ${formData.purpose === 'rent' ? 'bg-violet-900/30 border-violet-500 text-violet-300 font-bold' : 'border-zinc-700 text-gray-400 hover:bg-zinc-800'}`}>
                    <input type="radio" name="purpose" value="rent" className="hidden" checked={formData.purpose === 'rent'} onChange={handleChange} /> Rent
                </label>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Image URL</label>
              <input 
                required name="image_url" value={formData.image_url} onChange={handleChange} type="text" 
                placeholder="Paste image link..." 
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none text-white placeholder-zinc-600" 
              />
              <p className="text-xs text-zinc-500 mt-2">Tip: Use a link from Unsplash.com.</p>
            </div>

            {/* Owner Details */}
            <div className="p-4 bg-black/30 rounded-lg border border-zinc-800">
                <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Owner Details</h3>
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Your Name</label>
                    <input required name="owner_name" value={formData.owner_name} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md focus:ring-1 focus:ring-violet-600 outline-none text-white text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Contact Number</label>
                    <input required name="owner_contact" value={formData.owner_contact} onChange={handleChange} type="text" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md focus:ring-1 focus:ring-violet-600 outline-none text-white text-sm" />
                </div>
                </div>
            </div>

            <button 
              disabled={loading} 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-700 to-purple-800 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center shadow-lg shadow-violet-900/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>List Property Now <UploadCloud className="ml-2" size={20} /></>}
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}