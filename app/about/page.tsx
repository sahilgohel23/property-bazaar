"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Users, Shield, TrendingUp, Home } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen bg-black text-white">
        
        {/* 1. Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">PropertyBazaar</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in finding the perfect place to call home. We bridge the gap between dream homes and reality with a seamless, digital-first experience.
          </p>
        </div>

        {/* 2. Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 mb-24">
          {[
            { label: "Properties Listed", value: "10k+" },
            { label: "Happy Customers", value: "5k+" },
            { label: "Cities Covered", value: "100+" },
            { label: "Years Experience", value: "12+" },
          ].map((stat, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center hover:border-violet-600/50 transition duration-300">
              <h3 className="text-4xl font-bold text-violet-500 mb-2">{stat.value}</h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 3. Our Mission Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-400">We are redefining real estate with technology and trust.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={32} />} 
              title="Trusted Listings" 
              desc="Every property on our platform is verified to ensure you get exactly what you see."
            />
            <FeatureCard 
              icon={<TrendingUp size={32} />} 
              title="Best Market Rates" 
              desc="We analyze market trends to ensure you get the best value for your money."
            />
            <FeatureCard 
              icon={<Users size={32} />} 
              title="Customer First" 
              desc="Our support team is available 24/7 to help you with your property journey."
            />
          </div>
        </div>

        {/* 4. Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 rounded-3xl p-8 md:p-16 border border-zinc-800 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                PropertyBazaar started with a simple idea: Real estate shouldn't be complicated. 
                We noticed that buyers and renters were tired of fake listings, hidden fees, and endless phone calls.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Today, we are proud to be one of the fastest-growing real estate platforms, connecting thousands of families with their dream homes every single month.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-violet-600 to-purple-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-900/50 transform rotate-3 hover:rotate-0 transition duration-500">
                <Home size={80} className="text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

// Small helper component for the features
function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:bg-zinc-900 transition duration-300">
      <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  )
}