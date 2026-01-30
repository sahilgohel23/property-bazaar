import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    // This SQL creates the table automatically
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL,
        property_title TEXT NOT NULL,
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL,
        user_phone TEXT NOT NULL,
        appointment_date DATE NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    return NextResponse.json({ success: true, message: "✅ Table 'appointments' created successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}