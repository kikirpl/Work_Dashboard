import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key"; // Ambil dari environment

export function verifyToken(token) {
  try {
    // Verifikasi token dengan kunci rahasia dari environment
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Jika token tidak valid, return null
  }
}
