import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Work order ID is required" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query("SELECT * FROM work_order WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Work order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error getting work order:", error);
    return NextResponse.json(
      { message: "Failed to get work order", error: error.message },
      { status: 500 }
    );
  }
}
// Update  work order
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updatedData = await request.json();

    console.log("Attempting to update work order with id:", id);

    if (!id) {
      console.log("Work order ID is missing");
      return NextResponse.json(
        { message: "Work order ID is required" },
        { status: 400 }
      );
    }

    const query = "UPDATE work_order SET ? WHERE id = ?";
    const values = [updatedData, id];
    console.log("Executing query:", query, "with values:", values);
    const [result] = await pool.query(query, values);

    console.log("UPDATE query result:", result);

    if (result.affectedRows === 0) {
      console.log("No work order found with id:", id);
      return NextResponse.json(
        { message: "Work order not found" },
        { status: 404 }
      );
    }

    console.log("Work order updated successfully");
    return NextResponse.json(
      { message: "Work order updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating work order:", error);
    return NextResponse.json(
      { message: "Failed to update work order", error: error.message },
      { status: 500 }
    );
  }
}

// Delete work order
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    console.log("Attempting to delete work order with id:", id);

    if (!id) {
      console.log("Work order ID is missing");
      return NextResponse.json(
        { message: "Work order ID is required" },
        { status: 400 }
      );
    }

    const query = "DELETE FROM work_order WHERE id = ?";
    const values = [id];
    console.log("Executing query:", query, "with values:", values);
    const [result] = await pool.query(query, values);

    console.log("DELETE query result:", result);

    if (result.affectedRows === 0) {
      console.log("No work order found with id:", id);
      return NextResponse.json(
        { message: "Work order not found" },
        { status: 404 }
      );
    }

    console.log("Work order deleted successfully");
    return NextResponse.json(
      { message: "Work order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting work order:", error);
    return NextResponse.json(
      { message: "Failed to delete work order", error: error.message },
      { status: 500 }
    );
  }
}
