import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    console.log("Attempting to get worklog with id:", id);

    if (!id) {
      console.log("Worklog ID is missing");
      return NextResponse.json(
        { message: "Worklog ID is required" },
        { status: 400 }
      );
    }

    const query = "SELECT * FROM worklogs WHERE id = ?";
    const values = [id];
    console.log("Executing query:", query, "with values:", values);
    const [rows] = await pool.query(query, values);

    if (rows.length === 0) {
      console.log("No worklog found with id:", id);
      return NextResponse.json(
        { message: "Worklog not found" },
        { status: 404 }
      );
    }

    console.log("Worklog retrieved successfully");
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error getting worklog:", error);
    return NextResponse.json(
      { message: "Failed to get worklog", error: error.message },
      { status: 500 }
    );
  }
}

// Update spesifik worklog
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updatedWorklog = await request.json();

    console.log("Attempting to update worklog with id:", id);

    if (!id) {
      console.log("Worklog ID is missing");
      return NextResponse.json(
        { message: "Worklog ID is required" },
        { status: 400 }
      );
    }

    const query = "UPDATE worklogs SET ? WHERE id = ?";
    const values = [updatedWorklog, id];
    console.log("Executing query:", query, "with values:", values);
    const [result] = await pool.query(query, values);

    console.log("UPDATE query result:", result);

    if (result.affectedRows === 0) {
      console.log("No worklog found with id:", id);
      return NextResponse.json(
        { message: "Worklog not found" },
        { status: 404 }
      );
    }

    console.log("Worklog updated successfully");
    return NextResponse.json(
      { message: "Worklog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating worklog:", error);
    return NextResponse.json(
      { message: "Failed to update worklog", error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    console.log("Attempting to delete worklog with id:", id);

    if (!id) {
      console.log("Worklog ID is missing");
      return NextResponse.json(
        { message: "Worklog ID is required" },
        { status: 400 }
      );
    }

    const query = "DELETE FROM worklogs WHERE id = ?";
    const values = [id];
    console.log("Executing query:", query, "with values:", values);
    const [result] = await pool.query(query, values);

    console.log("DELETE query result:", result);

    if (result.affectedRows === 0) {
      console.log("No worklog found with id:", id);
      return NextResponse.json(
        { message: "Worklog not found" },
        { status: 404 }
      );
    }

    console.log("Worklog deleted successfully");
    return NextResponse.json(
      { message: "Worklog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting worklog:", error);
    return NextResponse.json(
      { message: "Failed to delete worklog", error: error.message },
      { status: 500 }
    );
  }
}
