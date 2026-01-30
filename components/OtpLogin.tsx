"use client";

import { useState } from "react";
import { Mail, Smartphone, Loader2, ArrowRight, CheckCircle2, User, UserCircle } from "lucide-react";
import { toast } from "sonner"; 

export default function OtpLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState<"input" | "otp">("input");
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  
  // Form Data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);

  // 1. Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return toast.error("Please enter contact details");
    if (isRegistering && (!name || !username)) return toast.error("Please fill all fields");

    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", type: method, contact }),
      });
      const data = await res.json();
      
      if (data.success) {
        setStep("otp");
        toast.success(`OTP sent to ${contact}`);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Verify OTP & Submit Data
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("OTP must be 6 digits");

    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            action: "verify", 
            contact, 
            otp,
            name: isRegistering ? name : undefined,
            username: isRegistering ? username : undefined,
            type: method
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isRegistering ? "Account Created!" : "Login Successful!");

        // Save User Data so Navbar sees it
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("storage"));
        }

        setTimeout(() => window.location.href = "/", 1000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black border-b border-white/10 border border-neutral-200 rounded-xl shadow-xl overflow-hidden p-8">
      
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-neutral-900">
          {step === "otp" ? "Verify Code" : (isRegistering ? "Create Account" : "Welcome Back")}
        </h2>
        <p className="text-neutral-500 text-sm mt-1 mb-4">
          {step === "otp" ? "Enter the code we just sent you" : "Manage your properties with PropertyBazaar"}
        </p>

        {step === "input" && (
            <div className="flex bg-neutral-100 p-1 rounded-lg mb-6">
                <button type="button" onClick={() => setIsRegistering(false)} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isRegistering ? 'bg-black border-b border-white/10 shadow text-blue-600' : 'text-gray-500'}`}>Login</button>
                <button type="button" onClick={() => setIsRegistering(true)} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isRegistering ? 'bg-black border-b border-white/10 shadow text-blue-600' : 'text-gray-500'}`}>Sign Up</button>
            </div>
        )}
      </div>

      {step === "input" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          
          {isRegistering && (
              <>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-600 uppercase">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-600 uppercase">Username</label>
                    <div className="relative">
                        <UserCircle className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="text" placeholder="johndoe123" value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                </div>
              </>
          )}

          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => { setMethod("mobile"); setContact(""); }} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm border rounded-lg transition-all ${method === "mobile" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"}`}><Smartphone size={16} /> Mobile</button>
            <button type="button" onClick={() => { setMethod("email"); setContact(""); }} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm border rounded-lg transition-all ${method === "email" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"}`}><Mail size={16} /> Email</button>
          </div>

          <div className="space-y-1">
            <input type={method === "mobile" ? "tel" : "email"} value={contact} onChange={(e) => setContact(e.target.value)} placeholder={method === "mobile" ? "+91 98765 43210" : "you@example.com"} className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
            {loading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={18} /></>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Sent to {contact}</p>
            <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="w-full text-center text-3xl tracking-[0.5em] font-bold py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none" placeholder="••••••" autoFocus />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <>Verify & {isRegistering ? "Register" : "Login"} <CheckCircle2 size={18} /></>}
          </button>
          
          <button type="button" onClick={() => setStep("input")} className="w-full text-gray-500 text-sm hover:underline">Wrong number? Go back</button>
        </form>
      )}
    </div>
  );
}