"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
// 👇 Changed this to use the Context we created earlier
import { useSaved } from "@/contexts/SavedContext" 
import { useAuth } from "@/contexts/AuthContext"
import { User, LogOut, Menu, X, Heart } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  // 👇 Get the saved count from our Brain
  const { savedIds } = useSaved() 
  const savedCount = savedIds.length

  const { user, logout } = useAuth()
  const [localUser, setLocalUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)

    const checkLocalUser = () => {
      const stored = localStorage.getItem("user")
      if (stored) {
        try { setLocalUser(JSON.parse(stored)) } catch (e) {}
      }
    }
    checkLocalUser()
    window.addEventListener("storage", checkLocalUser)

    return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("storage", checkLocalUser)
    }
  }, [])

  const currentUser = user || localUser
  const displayName = currentUser?.name || currentUser?.email || "User"

  const handleLogout = () => {
    localStorage.clear()
    setLocalUser(null)
    if (logout) logout()
    setIsProfileOpen(false)
    window.location.href = "/"
  }

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-white/5 ${
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-2xl" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Property<span className="text-violet-400">Bazaar</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition font-medium text-sm">Home</Link>
            <Link href="/properties" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition font-medium text-sm">Buy</Link>
            <Link href="/properties?purpose=rent" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition font-medium text-sm">Rent</Link>
            <Link href="/about" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition font-medium text-sm">About</Link>
            
            {/* ✨ SAVED LINK WITH BADGE ✨ */}
            <Link href="/saved" className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition font-medium text-sm flex items-center gap-2">
               Saved
               {savedCount > 0 && (
                 <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-lg shadow-red-500/20">
                   {savedCount}
                 </span>
               )}
            </Link>

            {/* List Property Button */}
            <Link href={currentUser ? "/list-property" : "/login"} 
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-900/20 transition-all hover:scale-105"
            >
              List Property
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-violet-400">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-medium hidden lg:block">{displayName}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-1 overflow-hidden">
                    <div className="px-4 py-3 border-b border-zinc-800">
                      <p className="text-sm text-white font-medium truncate">{displayName}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition flex items-center gap-2">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-gray-300 hover:text-white font-medium text-sm">Login</Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" className="block px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-900">Home</Link>
            <Link href="/properties" className="block px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-900">Buy Properties</Link>
            <Link href="/about" className="block px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-900">About Us</Link>
            
            {/* ✨ SAVED LINK (MOBILE) ✨ */}
            <Link href="/saved" className="flex items-center justify-between px-3 py-3 rounded-lg text-gray-300 hover:bg-zinc-900">
               <span>Saved Properties</span>
               {savedCount > 0 && (
                 <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                   {savedCount}
                 </span>
               )}
            </Link>

            <Link href="/list-property" className="block px-3 py-3 rounded-lg text-violet-400 font-bold hover:bg-zinc-900">List Your Property</Link>
            {currentUser && (
               <button onClick={handleLogout} className="w-full text-left px-3 py-3 text-red-400 font-medium">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}