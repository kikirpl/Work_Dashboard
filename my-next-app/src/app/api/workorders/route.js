import { NextResponse } from "next/server";
import { pool } from "../../../lib/db"; // Import koneksi database Anda

// Mendapatkan semua work orders
export async function GET(request) {
  try {
    const [rows] = await pool.query("SELECT * FROM work_order");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching work orders:", error);
    return NextResponse.error("Failed to fetch work orders");
  }
}

// Menambahkan work order baru
export async function POST(request) {
  try {
    const newWorkOrder = await request.json();
    const [result] = await pool.query(
      "INSERT INTO work_order SET ?",
      newWorkOrder
    );
    return NextResponse.json({ id: result.insertId, ...newWorkOrder });
  } catch (error) {
    console.error("Error adding new work order:", error);
    return NextResponse.error("Failed to add new work order");
  }
}

// Mengupdate work order tertentu
export async function PUT(request) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    const updatedWorkOrder = await request.json();
    await pool.query("UPDATE work_order SET ? WHERE id = ?", [
      updatedWorkOrder,
      id,
    ]);
    return NextResponse.json({ id, ...updatedWorkOrder });
  } catch (error) {
    console.error("Error updating work order:", error);
    return NextResponse.error("Failed to update work order");
  }
}

// Menghapus work order tertentu
export async function DELETE(request) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();

    // Cek jika ID ada
    if (!id) {
      return NextResponse.json(
        { message: "Work order ID is required" },
        { status: 400 }
      );
    }

    // Eksekusi query DELETE
    const [result] = await pool.query("DELETE FROM work_order WHERE id = ?", [
      id,
    ]);

    // Cek jika baris berhasil dihapus
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Work order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Work order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting work order:", error.message);
    return NextResponse.json(
      { message: "Failed to delete work order", error: error.message },
      { status: 500 }
    );
  }
}
