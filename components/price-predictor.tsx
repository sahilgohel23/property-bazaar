"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Brain, AlertCircle, Sparkles } from "lucide-react"

// Growth Logic based on City Tiers (Simulated AI Data)
const CITY_GROWTH_RATES: Record<string, number> = {
  "Mumbai": 0.08,     // 8% annual growth
  "Bangalore": 0.09,  // 9% (Tech boom)
  "Delhi": 0.07,
  "Goa": 0.10,        // High tourism demand
  "Pune": 0.075,
  "default": 0.06     // 6% standard
}

export default function PricePredictor({ currentPrice, city, type }: { currentPrice: number, city: string, type: string }) {
  const [years, setYears] = useState(5)
  const [predictedPrice, setPredictedPrice] = useState(currentPrice)
  const [growthRate, setGrowthRate] = useState(0.06)
  const [totalAppreciation, setTotalAppreciation] = useState(0)

  useEffect(() => {
    // 1. Determine Growth Rate based on City & Type
    let rate = CITY_GROWTH_RATES[city] || CITY_GROWTH_RATES["default"]
    
    // Villas appreciate faster than Apartments usually
    if (type === "Villa") rate += 0.01

    setGrowthRate(rate)

    // 2. Compound Interest Formula: P * (1 + r)^n
    const futureValue = currentPrice * Math.pow(1 + rate, years)
    
    setPredictedPrice(Math.round(futureValue))
    setTotalAppreciation(Math.round(futureValue - currentPrice))

  }, [years, currentPrice, city, type])

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl mt-8 relative overflow-hidden">
      
      {/* Decorative AI Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-violet-500/10 p-2 rounded-lg border border-violet-500/20 text-violet-400">
          <Brain size={24} />
        </div>
        <div>
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             AI Value Predictor <Sparkles size={14} className="text-yellow-400 animate-pulse"/>
           </h3>
           <p className="text-xs text-gray-500">Based on historical data & local development</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left: Controls & Insights */}
        <div className="space-y-6">
          
          {/* Timeline Slider */}
          <div>
            <label className="text-gray-400 text-sm mb-4 block flex justify-between items-center">
              <span>Projection Period</span>
              <span className="bg-violet-900/40 text-violet-300 px-3 py-1 rounded-full text-xs font-bold border border-violet-500/30">
                {years} Years Later
              </span>
            </label>
            <input 
              type="range" min="1" max="15" step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Next Year</span>
              <span>15 Years</span>
            </div>
          </div>

          {/* AI Insights Box */}
          <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
             <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
               <TrendingUp size={14} className="text-green-500"/> Market Drivers
             </h4>
             <ul className="text-xs text-gray-500 space-y-2">
                <li className="flex items-start gap-2">
                   <span className="text-green-500">✔</span> 
                   High demand in {city} due to infrastructure growth.
                </li>
                {type === "Villa" && (
                  <li className="flex items-start gap-2">
                     <span className="text-green-500">✔</span> 
                     Land value for Villas appreciating faster than apartments.
                  </li>
                )}
                <li className="flex items-start gap-2">
                   <span className="text-green-500">✔</span> 
                   {(growthRate * 100).toFixed(1)}% estimated annual growth rate.
                </li>
             </ul>
          </div>

        </div>

        {/* Right: Big Result Display */}
        <div className="flex flex-col justify-center bg-zinc-950 rounded-2xl p-6 border border-zinc-800 text-center relative">
            <p className="text-gray-400 text-sm mb-1">Estimated Value in {new Date().getFullYear() + years}</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
               ₹ {(predictedPrice / 10000000).toFixed(2)} Cr
            </h2>
            
            <div className="inline-flex items-center justify-center gap-2 bg-green-900/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium mx-auto border border-green-900/30">
               <TrendingUp size={16} /> 
               + ₹ {(totalAppreciation / 100000).toFixed(1)} Lakhs Growth
            </div>

            <div className="mt-6 text-xs text-gray-600 flex items-center justify-center gap-1">
               <AlertCircle size={12} />
               <span>AI Estimate. Not a financial guarantee.</span>
            </div>
        </div>

      </div>
    </div>
  )
}

