import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

// Get all worklogs
export async function GET(request) {
  try {
    const [rows] = await pool.query("SELECT * FROM worklogs");

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching worklogs:", error);
    return NextResponse.error("Failed to fetch worklogs");
  }
}

export async function POST(request) {
  try {
    const newWorklog = await request.json();

    const [result] = await pool.query("INSERT INTO worklogs SET ?", newWorklog);
    return NextResponse.json({ id: result.insertId, ...newWorklog });
  } catch (error) {
    console.error("Error adding new worklog:", error);
    return NextResponse.error("Failed to add new worklog");
  }
}

// Update  worklog
export async function PUT(request) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    const updatedWorklog = await request.json();
    await pool.query("UPDATE worklogs SET ? WHERE id = ?", [
      updatedWorklog,
      id,
    ]);
    return NextResponse.json({ id, ...updatedWorklog });
  } catch (error) {
    console.error("Error updating worklog:", error);
    return NextResponse.error("Failed to update worklog");
  }
}

// Delete  worklog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "Worklog ID is required" },
        { status: 400 }
      );
    }

    const query = "DELETE FROM worklogs WHERE id = ?";
    const values = [id];
    const [result] = await pool.query(query, values);

    console.log("DELETE query:", query);
    console.log("DELETE query values:", values);
    console.log("DELETE query result:", result);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Worklog not found" },
        { status: 404 }
      );
    }

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
