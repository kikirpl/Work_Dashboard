"use client";

import { useState, useEffect } from "react";
import Button from "../Elements/button";

const TableWorkLog = () => {
  const [worklogs, setWorklogs] = useState([]);
  const [filteredWorklogs, setFilteredWorklogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkLog, setNewWorkLog] = useState({
    date: "",
    week: "",
    pic: "",
    opportunity: "",
    type: "",
    account: "",
    activity: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchWorklogs();
  }, []);

  const fetchWorklogs = async () => {
    try {
      const response = await fetch("/api/worklogs");

      if (response.ok) {
        const data = await response.json();
        setWorklogs(data);
        setFilteredWorklogs(data);
      } else {
        console.error("Failed to fetch worklogs");
      }
    } catch (error) {
      console.error("Error fetching worklogs:", error);
    }
  };
  console.log(worklogs);

  const handleChange = (e) => {
    setNewWorkLog({ ...newWorkLog, [e.target.name]: e.target.value });
  };

  const handleAddWorkLog = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const worklogData = {
      ...newWorkLog,
      date: currentDate,
    };

    try {
      const url = editId !== null ? `/api/worklogs/${editId}` : "/api/worklogs";
      const method = editId !== null ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(worklogData),
      });

      if (!response.ok) {
        console.error(
          `Failed to ${editId !== null ? "update" : "add"} work log`
        );
        return;
      }

      const updatedWorkLog = await response.json();

      if (editId !== null) {
        setWorklogs(
          worklogs.map((log) => (log.id === editId ? updatedWorkLog : log))
        );
        setFilteredWorklogs(
          filteredWorklogs.map((log) =>
            log.id === editId ? updatedWorkLog : log
          )
        );
      } else {
        setWorklogs([...worklogs, updatedWorkLog]);
        setFilteredWorklogs([...filteredWorklogs, updatedWorkLog]);
      }

      setIsModalOpen(false);
      setNewWorkLog({
        date: "",
        week: "",
        pic: "",
        opportunity: "",
        type: "",
        account: "",
        activity: "",
      });
      setEditId(null);
    } catch (error) {
      console.error(
        `Error ${editId !== null ? "updating" : "adding"} work log:`,
        error
      );
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`/api/worklogs/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Work log with ID ${id} not found.`);
          alert("Work log not found.");
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to fetch work log for editing:",
            errorData.message
          );
          alert(
            "Error fetching work log for editing. Please check the console for details."
          );
        }
        return;
      }

      const workLogToEdit = await response.json();

      setNewWorkLog({
        date: workLogToEdit.date ?? "",
        week: workLogToEdit.week ?? "",
        pic: workLogToEdit.pic ?? "",
        opportunity: workLogToEdit.opportunity ?? "",
        type: workLogToEdit.type ?? "",
        account: workLogToEdit.account ?? "",
        activity: workLogToEdit.activity ?? "",
      });
      setEditId(id);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching work log for editing:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting worklog with id:", id);

      const response = await fetch(`/api/worklogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete work log:", errorData.message);
        alert("Error deleting work log: " + errorData.message);
        return;
      }

      const updatedWorklogs = worklogs.filter((worklog) => worklog.id !== id);
      setWorklogs(updatedWorklogs);
      setFilteredWorklogs(updatedWorklogs);

      console.log("Worklogs after update:", updatedWorklogs);
    } catch (error) {
      console.error("Error deleting work log:", error.message);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredWorklogs(
      worklogs.filter((worklog) =>
        Object.values(worklog).some(
          (value) => value && value.toString().toLowerCase().includes(term)
        )
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="content h-screen ml-auto flex flex-col pr-[150px] p-6">
      <h2 className="text-2xl text-[#303030] font-bold mb-6">
        Table Aktivitas atau WorkLog
      </h2>
      <div className="bg-white p-2 rounded-3xl px-5 py-7 shadow-md flex-1">
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex justify-between items-center px-4 mb-4">
            <h3 className="text-xl font-semibold">WorkLog or Work Activity</h3>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[400px]">
          <table className="min-w-full text-sm bg-white">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="border-b-2 p-4 text-left">No</th>
                <th className="border-b-2 p-4 text-left">Date</th>
                <th className="border-b-2 p-4 text-left">Week</th>
                <th className="border-b-2 p-4 text-left">PIC</th>
                <th className="border-b-2 p-4 text-left">Opportunity</th>
                <th className="border-b-2 p-4 text-left">Type</th>
                <th className="border-b-2 p-4 text-left">Account</th>
                <th className="border-b-2 p-4 text-left">Activity</th>
                <th className="border-b-2 p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorklogs.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No work logs found.
                  </td>
                </tr>
              ) : (
                filteredWorklogs.map((log, index) => (
                  <tr key={log.id}>
                    <td className="border-b p-4">{index + 1}</td>
                    <td className="border-b p-4">{formatDate(log.date)}</td>
                    <td className="border-b p-4">{log.week}</td>
                    <td className="border-b p-4">{log.pic}</td>
                    <td className="border-b p-4">{log.opportunity}</td>
                    <td className="border-b p-4">{log.type}</td>
                    <td className="border-b p-4">{log.account}</td>
                    <td className="border-b p-4">{log.activity}</td>
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
            Add Worklog+
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-auto max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              {editId !== null ? "Edit Work Log" : "Add New Work Log"}
            </h3>
            <div className="grid grid-cols-1 gap-4">
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
                  value={newWorkLog.week}
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
                  value={newWorkLog.pic}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="opportunity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Opportunity
                </label>
                <input
                  type="text"
                  id="opportunity"
                  placeholder="Opportunity"
                  name="opportunity"
                  value={newWorkLog.opportunity}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  placeholder="Type"
                  name="type"
                  value={newWorkLog.type}
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
                  value={newWorkLog.account}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="activity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Activity
                </label>
                <textarea
                  id="activity"
                  placeholder="Activity"
                  name="activity"
                  value={newWorkLog.activity}
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
                  className="bg-[#72c1c5] text-white py-2 px-4 rounded hover:bg-[#5a9e9f]"
                  onClick={handleAddWorkLog}
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

export default TableWorkLog;
