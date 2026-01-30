import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { property_id, property_title, name, email, phone, date, message } = body;

    // Validation
    if (!property_id || !name || !email || !date) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await pool.connect();
    
    // Insert into Database
    await client.query(
      `INSERT INTO appointments (property_id, property_title, user_name, user_email, user_phone, appointment_date, message) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [property_id, property_title, name, email, phone, date, message]
    );

    client.release();
    return NextResponse.json({ success: true, message: "Appointment booked successfully!" });

  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}  