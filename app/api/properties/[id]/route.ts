import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // 🛑 SAFETY CHECK: If ID is "undefined" or not a number, STOP immediately.
    const propertyId = parseInt(id);
    if (!id || isNaN(propertyId)) {
       return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const client = await pool.connect();

    // Now it is safe to query because we know propertyId is a valid number
    const result = await client.query('SELECT * FROM properties WHERE id = $1', [propertyId]);
    client.release();

    if (result.rows.length === 0) {
        return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property: result.rows[0] });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}