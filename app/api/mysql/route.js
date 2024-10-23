import { NextResponse } from 'next/server';  // Import NextResponse

// Create the MySQL pool
import mysql from 'mysql2/promise'; // Use mysql2 with promises
import 'dotenv/config'

const pool = mysql.createPool({
    host: process.env.DB_HOST,  // Use the IP or domain of the cPanel-hosted server
    user: process.env.DB_USER,  // Use the MySQL user from cPanel
    password: process.env.DB_PASSWORD,         // Use the password from cPanel
    database: process.env.DB_DATABASE,  // Use the database from cPanel
});

export async function GET(request) {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        // console.log(rows);
        
        return new NextResponse(JSON.stringify(rows), { status: 200 });
    } catch (err) {
        console.error('MySQL Query Error:', err.message);
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
}


