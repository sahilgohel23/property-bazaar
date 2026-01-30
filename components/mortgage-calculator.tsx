"use client"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Percent, Calendar, Building2 } from "lucide-react"

// Realistic Indian Home Loan Rates (Approximate)
const BANK_RATES = [
  { name: "Standard Market Rate", rate: 8.50 },
  { name: "SBI Home Loan", rate: 8.40 },
  { name: "HDFC Bank", rate: 8.55 },
  { name: "ICICI Bank", rate: 8.75 },
  { name: "Axis Bank", rate: 8.85 },
  { name: "Kotak Mahindra", rate: 8.90 },
  { name: "LIC Housing", rate: 8.65 },
]

export default function MortgageCalculator({ price }: { price: number }) {
  const [loanAmount, setLoanAmount] = useState(price * 0.8) // Default 80% loan
  const [interestRate, setInterestRate] = useState(8.50) 
  const [tenure, setTenure] = useState(20) 
  const [emi, setEmi] = useState(0)

  // Calculate EMI whenever inputs change
  useEffect(() => {
    const p = loanAmount
    const r = interestRate / 12 / 100
    const n = tenure * 12
    
    // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const calculatedEmi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    
    setEmi(Math.round(calculatedEmi) || 0)
  }, [loanAmount, interestRate, tenure])

  // Handle Bank Selection
  const handleBankSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterestRate(Number(e.target.value))
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-violet-900/30 p-2 rounded-lg text-violet-400">
            <Calculator size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Smart EMI Calculator</h3>
        </div>
        <span className="text-xs text-gray-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
          Updated: 2024 Rates
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* --- CONTROLS SECTION --- */}
        <div className="space-y-6">
          
          {/* 1. Bank Selector */}
          <div>
            <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Building2 size={14} className="text-violet-500"/> Select Bank Partner
            </label>
            <select 
              onChange={handleBankSelect}
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-2 focus:border-violet-500 outline-none"
            >
              {BANK_RATES.map((bank) => (
                <option key={bank.name} value={bank.rate}>
                  {bank.name} ({bank.rate}%)
                </option>
              ))}
            </select>
          </div>

          {/* 2. Loan Amount Slider */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block flex justify-between">
              <span>Loan Amount</span>
              <span className="text-white font-bold">₹ {loanAmount.toLocaleString()}</span>
            </label>
            <input 
              type="range" min={price * 0.1} max={price} step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>10%</span>
              <span>100% Value</span>
            </div>
          </div>

          {/* 3. Interest Rate Slider (Auto-updates with Bank) */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block flex justify-between">
              <span>Interest Rate (% p.a)</span>
              <span className="text-violet-400 font-bold">{interestRate}%</span>
            </label>
            <input 
              type="range" min="6" max="14" step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

          {/* 4. Tenure Slider */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block flex justify-between">
              <span>Loan Tenure</span>
              <span className="text-white font-bold">{tenure} Years</span>
            </label>
            <input 
              type="range" min="1" max="30" step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

        </div>

        {/* --- RESULT SECTION --- */}
        <div className="flex flex-col h-full">
           <div className="flex-grow flex flex-col items-center justify-center bg-zinc-950 rounded-xl border border-zinc-800 p-6 relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
               
               <p className="text-gray-400 mb-2 font-medium">Monthly EMI</p>
               <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-1">
                 ₹ {emi.toLocaleString()}
               </h2>
               <p className="text-sm text-green-500 font-semibold mb-6">
                 @ {interestRate}% Interest
               </p>
               
               <div className="w-full space-y-3">
                 <div className="flex justify-between text-sm border-b border-zinc-800 pb-2">
                    <span className="text-gray-500">Principal Amount</span>
                    <span className="text-white font-medium">₹ {loanAmount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm border-b border-zinc-800 pb-2">
                    <span className="text-gray-500">Total Interest</span>
                    <span className="text-white font-medium">₹ {((emi * tenure * 12) - loanAmount).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Payable</span>
                    <span className="text-violet-400 font-bold">₹ {(emi * tenure * 12).toLocaleString()}</span>
                 </div>
               </div>
           </div>

           <button className="mt-4 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-900/20 transition flex items-center justify-center gap-2">
              <Building2 size={18} /> Apply for Loan
           </button>
        </div>
      </div>
    </div>
  )
}