import { verifyToken } from "../../../lib/verifytoken";
import { pool } from "../../../lib/db"; // Koneksi database MySQL

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = decodedToken.id;

    // Query ke database untuk mengambil izin pengguna
    const [result] = await pool.query(
      "SELECT can_edit_others_worklogs FROM users WHERE id = ?",
      [userId]
    );

    if (!result.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const canEditOthersWorklogs = result[0].can_edit_others_worklogs;
    return res.status(200).json({ canEditOthersWorklogs });
  } catch (error) {
    console.error("Error checking user permissions:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
