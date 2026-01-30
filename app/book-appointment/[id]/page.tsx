"use client"

import { useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, Clock, MapPin, CheckCircle, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BookAppointment() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const id = params?.id
  const propertyTitle = searchParams.get("title") || "Selected Property"

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Success!
    setSuccess(true)
    setLoading(false)
    
    // Redirect after 2 seconds
    setTimeout(() => {
        router.push("/properties")
    }, 3000)
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center max-w-md w-full shadow-2xl shadow-violet-900/20">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-400 mb-6">The owner has been notified. They will contact you shortly.</p>
            <button onClick={() => router.push("/properties")} className="w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition font-medium">
                Back to Properties
            </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen bg-black text-white">
        <div className="max-w-xl mx-auto px-4">
          
          <Link href={`/property/${id}`} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="mr-2" size={20} /> Cancel & Go Back
          </Link>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <span className="bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                Free Visit
              </span>
              <h1 className="text-2xl font-bold mb-2">Book a Site Visit</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <MapPin size={16} className="text-violet-500" /> 
                {propertyTitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                <input 
                  required name="name" type="text" placeholder="Sahil Gohel"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                <input 
                  required name="phone" type="tel" placeholder="+91 97257 94099"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <Calendar size={14} /> Date
                  </label>
                  <input 
                    required name="date" type="date"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <Clock size={14} /> Time
                  </label>
                  <select 
                    required name="time"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition"
                    onChange={handleChange}
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Message (Optional)</label>
                <textarea 
                  name="message" rows={3} placeholder="I am interested in this property..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition resize-none"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-900/20 transition-all hover:scale-[1.02] flex items-center justify-center mt-6"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
              </button>
            </form>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}