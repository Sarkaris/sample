import { NextResponse } from "next/server";
import mysql from 'mysql2/promise'; // Use mysql2 with promises
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,  // Use the IP or domain of the cPanel-hosted server
    user: process.env.DB_USER,  // Use the MySQL user from cPanel
    password: process.env.DB_PASSWORD, // Use the password from cPanel
    database: process.env.DB_DATABASE,  // Use the database from cPanel
});

export async function GET(request) {
    try {
        // Parse URL and extract the search params
        const url = new URL(request.url);
        let id = url.searchParams.get("id");

        // Validate id to prevent SQL injection
        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'ID is required' }), { status: 400 });
        }

        const [rows] = await pool.query(
            `SELECT \`id\`, \`priority\`, \`title\`, \`price\`, \`discountedPrice\`, \`description\`, \`min_quantity\`, \`category\`, \`image1\`, \`image2\`, \`image3\`, \`image4\`, \`rating\`, \`QTY\`, \`show_in_Stock\` 
             FROM \`products\` WHERE id = ?`, // Use parameterized queries to prevent SQL injection
            [id]
        );

        return new NextResponse(JSON.stringify(rows), { status: 200 });
    } catch (err) {
        console.error('MySQL Query Error:', err.message);
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
