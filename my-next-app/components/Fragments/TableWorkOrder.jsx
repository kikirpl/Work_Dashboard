"use client";

import { useState, useEffect } from "react";
import Button from "../Elements/button";

const TableWorkOrder = () => {
  const [workorders, setWorkorders] = useState([]);
  const [filteredWorkorders, setFilteredWorkorders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkOrder, setNewWorkOrder] = useState({
    week: "",
    due_date: "",
    pic: "",
    work_giver: "",
    project: "",
    account: "",
    work_order: "",
    priority: "",
    status: "",
    progress: "",
    note: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("/api/workorders")
      .then((response) => response.json())
      .then((data) => {
        setWorkorders(data);
        setFilteredWorkorders(data);
      })
      .catch((error) => console.error("Error fetching work orders:", error));
  }, []);

  const handleChange = (e) => {
    setNewWorkOrder({ ...newWorkOrder, [e.target.name]: e.target.value });
  };

  const handleAddWorkOrder = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const workOrderData = { ...newWorkOrder, date: currentDate };

    try {
      const url = editId ? `/api/workorders/${editId}` : "/api/workorders";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workOrderData),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error(
            `Failed to ${editId ? "update" : "add"} work order:`,
            errorData.message
          );
          alert(
            `Error ${editId ? "updating" : "adding"} work order: ${
              errorData.message
            }`
          );
        } catch (parseError) {
          console.error("Server returned an HTML error response.");
          alert(
            "An error occurred while processing your request. Please check the console for details."
          );
        }
        return;
      }

      const updatedWorkOrder = await response.json();

      // Update workorders state
      setWorkorders((prev) =>
        editId
          ? prev.map((order) =>
              order.id === editId ? updatedWorkOrder : order
            )
          : [...prev, updatedWorkOrder]
      );

      // Update filteredWorkorders berdasarkan searchTerm
      setFilteredWorkorders((prev) => {
        if (editId) {
          return prev.map((order) =>
            order.id === editId ? updatedWorkOrder : order
          );
        } else {
          if (
            searchTerm &&
            !Object.values(updatedWorkOrder).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          ) {
            return prev;
          }
          return [...prev, updatedWorkOrder];
        }
      });

      setIsModalOpen(false);
      setNewWorkOrder({
        week: "",
        due_date: "",
        pic: "",
        work_giver: "",
        project: "",
        account: "",
        work_order: "",
        priority: "",
        status: "",
        progress: "",
        note: "",
      });
      setEditId(null);
    } catch (error) {
      console.error(
        `Error ${editId ? "updating" : "adding"} work order:`,
        error
      );
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`/api/workorders/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Work order with ID ${id} not found.`);
          alert("Work order not found. Please refresh the page.");
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to fetch work order for editing:",
            errorData.message
          );
          alert(
            "Error fetching work order for editing. Please check the console for details."
          );
        }
        return;
      }

      const workOrderToEdit = await response.json();

      setNewWorkOrder(workOrderToEdit);
      setEditId(id);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching work order for editing:", error.message);
    }
  };

  const handleDelete = (id) => {
    fetch(`/api/workorders/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete work order");
        }

        setWorkorders(workorders.filter((workorder) => workorder.id !== id));
        setFilteredWorkorders(
          filteredWorkorders.filter((workorder) => workorder.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting work order:", error));
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredWorkorders(
      workorders.filter((workorder) =>
        Object.values(workorder).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      )
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "tenggat waktu tidak ditentukan";
    }

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="content h-screen ml-auto flex flex-col p-6">
      <h2 className="text-2xl text-[#303030] font-bold mb-6">
        Table Permintaan Kerja atau Work Order
      </h2>
      <div className="bg-white p-4 rounded-3xl px-5 py-7 shadow-md flex-1 mr-8">
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex justify-between items-center px-4 mb-4">
            <h3 className="text-xl font-semibold">WorkOrder or Work Request</h3>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b-2 p-4 text-left">No</th>
                <th className="border-b-2 p-4 text-left">Week</th>
                <th className="border-b-2 p-4 text-left">Date</th>
                <th className="border-b-2 p-4 text-left">Due Date</th>
                <th className="border-b-2 p-4 text-left">PIC</th>
                <th className="border-b-2 p-4 text-left">Work Giver</th>
                <th className="border-b-2 p-4 text-left">Project</th>
                <th className="border-b-2 p-4 text-left">Account</th>
                <th className="border-b-2 p-4 text-left">Work Order</th>
                <th className="border-b-2 p-4 text-left">Priority</th>
                <th className="border-b-2 p-4 text-left">Status</th>
                <th className="border-b-2 p-4 text-left">Progress</th>
                <th className="border-b-2 p-4 text-left">Note</th>
                <th className="border-b-2 p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkorders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No work orders found.
                  </td>
                </tr>
              ) : (
                filteredWorkorders.map((log, index) => (
                  <tr key={log.id} className="hover:bg-gray-100">
                    <td className="border-b p-4">{index + 1}</td>
                    <td className="border-b p-4">{log.week}</td>
                    <td className="border-b p-4">{formatDate(log.date)}</td>
                    <td className="border-b p-4">{formatDate(log.due_date)}</td>
                    <td className="border-b p-4">{log.pic}</td>
                    <td className="border-b p-4">{log.work_giver}</td>
                    <td className="border-b p-4">{log.project}</td>
                    <td className="border-b p-4">{log.account}</td>
                    <td className="border-b p-4">{log.work_order}</td>
                    <td className="border-b p-4">{log.priority}</td>
                    <td className="border-b p-4">{log.status}</td>
                    <td className="border-b p-4">{log.progress}</td>
                    <td className="border-b p-4">{log.note}</td>
                    <td className="border-b p-4 flex space-x-2">
                      <>
                        <Button
                          className="bg-[#5932EA] text-white py-1 px-3 rounded-md transition-colors duration-300 hover:bg-[#4628b7]"
                          onClick={() => handleEdit(log.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 text-white py-1 px-3 rounded-md transition-colors duration-300 hover:bg-red-600"
                          onClick={() => handleDelete(log.id)}
                        >
                          X
                        </Button>
                      </>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end py-5 text-lg">
          <Button className="bg-[#72c1c5]" onClick={() => setIsModalOpen(true)}>
            Add Workorder+
          </Button>
        </div>
      </div>

      {/* Modal Box */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-auto max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              {editId !== null ? "Edit Work Order" : "Add Work Order"}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {" "}
              <div>
                <label
                  htmlFor="week"
                  className="block text-sm font-medium text-gray-700"
                >
                  Week
                </label>
                <input
                  type="text"
                  id="week"
                  placeholder="Week"
                  name="week"
                  value={newWorkOrder.week}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="due_date"
                  placeholder="Due Date"
                  name="due_date"
                  required
                  value={newWorkOrder.due_date}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="pic"
                  className="block text-sm font-medium text-gray-700"
                >
                  PIC
                </label>
                <input
                  type="text"
                  id="pic"
                  placeholder="PIC"
                  name="pic"
                  value={newWorkOrder.pic}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="work_giver"
                  className="block text-sm font-medium text-gray-700"
                >
                  Work Giver
                </label>
                <input
                  type="text"
                  id="work_giver"
                  placeholder="Work Giver"
                  name="work_giver"
                  value={newWorkOrder.work_giver}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="project"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project
                </label>
                <input
                  type="text"
                  id="project"
                  placeholder="Project"
                  name="project"
                  value={newWorkOrder.project}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="account"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account
                </label>
                <input
                  type="text"
                  id="account"
                  placeholder="Account"
                  name="account"
                  value={newWorkOrder.account}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="work_order"
                  className="block text-sm font-medium text-gray-700"
                >
                  Work Order
                </label>
                <input
                  type="text"
                  id="work_order"
                  placeholder="Work Order"
                  name="work_order"
                  value={newWorkOrder.work_order}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <input
                  type="text"
                  id="priority"
                  placeholder="Priority"
                  name="priority"
                  value={newWorkOrder.priority}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  placeholder="Status"
                  name="status"
                  value={newWorkOrder.status}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="progress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Progress
                </label>
                <input
                  type="text"
                  id="progress"
                  placeholder="Progress"
                  name="progress"
                  value={newWorkOrder.progress}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note
                </label>
                <textarea
                  id="note"
                  placeholder="Note"
                  name="note"
                  value={newWorkOrder.note}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#5932EA] text-white py-2 px-4 rounded hover:bg-[#4628b7]"
                  onClick={handleAddWorkOrder}
                >
                  {editId !== null ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableWorkOrder;
