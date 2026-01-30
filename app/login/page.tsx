"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OtpLogin from "@/components/OtpLogin" 

export default function LoginPage() {
  return (
    <>
      <Navbar />

      {/* FIXED: Changed Blue Gradient to Black/Violet to match your theme */}
      <main className="pt-20 pb-16 min-h-screen bg-black flex items-center justify-center px-4">
        
        {/* Your Original OTP Component */}
        <OtpLogin />

      </main>

      <Footer />
    </>
  )
}
