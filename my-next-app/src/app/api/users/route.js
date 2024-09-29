import { verifyToken } from "../../../lib/verifytoken";
import { pool } from "../../../lib/db"; // Koneksi database MySQL

export default async function handler(req, res) {
  console.log("Request Method:", req.method); // Log the incoming request method

  // Verifikasi token
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token); // Verify the token
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch users from the database
    const [users] = await pool.query("SELECT id, username FROM users");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
