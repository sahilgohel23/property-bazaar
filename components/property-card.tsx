"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import { useSaved } from "@/contexts/SavedContext" // 👇 Import the logic

interface PropertyProps {
  id: string
  title: string
  price: string | number
  area: string | number
  type: string
  city: string
  image: string
  purpose?: string
}

export default function PropertyCard({ id, title, price, area, type, city, image, purpose = "sell" }: PropertyProps) {
  // 👇 Connect to the "Brain"
  const { isSaved, toggleSave } = useSaved()
  const saved = isSaved(id)

  return (
    <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg hover:shadow-violet-900/20 transition-all duration-300 relative">
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />
        
        {/* Badge: For Rent/Sale (Violet Gradient) */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          For {purpose}
        </div>

        {/* Badge: Type (Dark Violet) */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
          {type}
        </div>
        
        {/* ❤️ ACTIVE HEART BUTTON */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            toggleSave(id)
          }}
          className={`absolute bottom-4 right-4 p-2 rounded-full backdrop-blur-md transition border ${
            saved 
              ? "bg-red-500/20 border-red-500 text-red-500"  // Style when Saved
              : "bg-white/10 border-white/20 text-white hover:bg-violet-600 hover:text-white" // Style when Not Saved
          }`}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-violet-400 text-xs font-bold uppercase tracking-wide mb-1">{city}</p>
            <h3 className="text-lg font-bold text-white truncate max-w-[200px]">{title}</h3>
          </div>
          <p className="text-xl font-extrabold text-white">
            ₹{parseInt(price.toString()).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-sm mb-6 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-1">
            <Square size={16} className="text-violet-500" /> {area} sq.ft
          </div>
          <div className="flex items-center gap-1">
            <Bed size={16} className="text-violet-500" /> 3 Beds
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link 
            href={`/properties/${id}`} 
            className="flex-1 block text-center bg-gradient-to-r from-violet-700 to-purple-800 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-violet-900/20"
          >
            View Details
          </Link>
          
          <Link 
            href={`/book-appointment/${id}?title=${encodeURIComponent(title)}`}
            className="px-4 flex items-center justify-center border border-zinc-700 rounded-xl text-gray-300 hover:border-violet-500 hover:text-violet-400 transition bg-zinc-950"
          >
            <span className="text-sm font-medium">Book</span>
          </Link>
        </div>
      </div>
    </div>
  )
}