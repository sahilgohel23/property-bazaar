import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { sql } from '@vercel/postgres';

// --- CONFIGURATION ---
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Temporary Memory for OTPs
let globalOtpStore: Record<string, { otp: string; expiresAt: number }> = {};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- MAIN API HANDLER ---
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, contact, type, otp, name, username } = body;

    // ==========================================
    // ACTION 1: SEND OTP
    // ==========================================
    if (action === 'send') {
      const newOtp = generateOTP();
      globalOtpStore[contact] = { otp: newOtp, expiresAt: Date.now() + 5 * 60 * 1000 };

      console.log(`Sending OTP ${newOtp} to ${contact} (${type})`); 

      if (type === 'mobile') {
        if (!TWILIO_SID) return NextResponse.json({ success: false, message: 'Twilio Keys Missing' }, { status: 500 });
        const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
        await client.messages.create({ body: `PropertyBazaar OTP: ${newOtp}`, from: TWILIO_PHONE, to: contact });
      } 
      else if (type === 'email') {
        if (!EMAIL_USER) return NextResponse.json({ success: false, message: 'Email Keys Missing' }, { status: 500 });
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        });
        await transporter.sendMail({
          from: EMAIL_USER,
          to: contact,
          subject: 'PropertyBazaar OTP',
          text: `Your Verification Code is: ${newOtp}`,
        });
      }

      return NextResponse.json({ success: true, message: 'OTP Sent successfully' });
    }

    // ==========================================
    // ACTION 2: VERIFY OTP & LOGIN/REGISTER
    // ==========================================
    if (action === 'verify') {
      const record = globalOtpStore[contact];

      if (!record) return NextResponse.json({ success: false, message: 'OTP not found. Resend it.' }, { status: 400 });
      if (Date.now() > record.expiresAt) return NextResponse.json({ success: false, message: 'OTP expired' }, { status: 400 });
      if (record.otp !== otp) return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });

      // 1. OTP is correct! Clear it so it can't be used again.
      delete globalOtpStore[contact];

      let user = null;

      // 2. IF REGISTERING (Name/Username provided): Save to Database
      if (name && username) {
        try {
           // Ensure table exists
           await sql`CREATE TABLE IF NOT EXISTS users (
             id SERIAL PRIMARY KEY, 
             name TEXT, 
             username TEXT, 
             email TEXT UNIQUE, 
             mobile TEXT UNIQUE, 
             created_at TIMESTAMP DEFAULT NOW()
           )`;
           
           if (type === 'email') {
             await sql`INSERT INTO users (name, username, email) VALUES (${name}, ${username}, ${contact}) ON CONFLICT (email) DO NOTHING`;
           } else {
             await sql`INSERT INTO users (name, username, mobile) VALUES (${name}, ${username}, ${contact}) ON CONFLICT (mobile) DO NOTHING`;
           }
           
           user = { name, username, contact, type };
           
        } catch (dbError) {
          console.error("DB Error:", dbError);
        }
      } 
      
      // 3. IF LOGGING IN (No Name provided): Fallback user object
      if (!user) {
         user = { name: "User", contact, type }; 
      }

      // 4. Send Success & User Data
      return NextResponse.json({ 
          success: true, 
          message: 'Verified!', 
          user: user 
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, message: error.message || 'Server Error' }, { status: 500 });
  }
}