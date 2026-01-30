import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Helper to ensure table exists
async function ensureTableExists() {
  await sql`CREATE TABLE IF NOT EXISTS properties (
      id SERIAL PRIMARY KEY,
      owner_name TEXT,
      owner_contact TEXT,
      title TEXT,
      description TEXT,
      price NUMERIC,
      area NUMERIC,
      city TEXT,
      type TEXT,
      purpose TEXT,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
  );`;
}

export async function GET() {
  try {
    // 1. Ensure table exists before querying
    await ensureTableExists();

    // 2. Fetch properties
    const { rows } = await sql`SELECT * FROM properties ORDER BY created_at DESC`;
    
    return NextResponse.json({ success: true, properties: rows });
  } catch (error: any) {
    console.error("Database Error (GET):", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, area, city, type, purpose, image_url, owner_name, owner_contact } = body;

    // 1. Ensure table exists
    await ensureTableExists();

    // 2. Insert Data
    await sql`INSERT INTO properties 
      (title, description, price, area, city, type, purpose, image_url, owner_name, owner_contact)
      VALUES (
        ${title}, ${description || ''}, ${price}, ${area}, ${city}, ${type}, ${purpose}, ${image_url}, ${owner_name}, ${owner_contact}
      )`;

    return NextResponse.json({ success: true, message: 'Property Listed Successfully!' });

  } catch (error: any) {
    console.error("Database Error (POST):", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}