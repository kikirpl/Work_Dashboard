import { useState } from "react";
import Button from "../Elements/button";

const TableWorkOrder = () => {
  const [workorders, setWorkorders] = useState([
    {
      id: 1,
      week: "Week 33",
      date: "2024-08-15",
      due_date: "2024-08-20",
      pic: "John Doe",
      work_giver: "Jane Smith",
      project: "Project ABC",
      account: "Client X",
      work_order: "WO-1234",
      priority: "High",
      status: "In Progress",
      progress: "50%",
      note: "Waiting for client approval",
    },
    // Tambahkan work order lainnya
  ]);

  const [filteredWorkorders, setFilteredWorkorders] = useState(workorders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkOrder, setNewWorkOrder] = useState({
    week: "",
    date: "",
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
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewWorkOrder({ ...newWorkOrder, [e.target.name]: e.target.value });
  };

  const handleAddWorkOrder = () => {
    if (editIndex !== null) {
      // Edit existing work order
      const updatedWorkorders = [...workorders];
      updatedWorkorders[editIndex] = {
        ...newWorkOrder,
        id: updatedWorkorders[editIndex].id,
      };
      setWorkorders(updatedWorkorders);
    } else {
      // Add new work order
      setWorkorders([
        ...workorders,
        { ...newWorkOrder, id: workorders.length + 1 },
      ]);
    }
    setIsModalOpen(false); // Tutup modal setelah menambahkan atau mengedit
    setNewWorkOrder({
      week: "",
      date: "",
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
    }); // Reset form setelah submit
    setEditIndex(null); // Reset edit index setelah submit
  };

  const handleEdit = (index) => {
    setNewWorkOrder(workorders[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setWorkorders(workorders.filter((workorder) => workorder.id !== id));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredWorkorders(
      workorders.filter((workorder) =>
        Object.values(workorder).some((value) =>
          value.toLowerCase().includes(term)
        )
      )
    );
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
              {filteredWorkorders.map((log, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b p-4">{index + 1}</td>
                  <td className="border-b p-4">{log.week}</td>
                  <td className="border-b p-4">{log.date}</td>
                  <td className="border-b p-4">{log.due_date}</td>
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
                    <Button
                      className="bg-[#5932EA] text-white py-1 px-3 rounded-md transition-colors duration-300 hover:bg-[#4628b7]"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 text-white py-1 px-3 rounded-md transition-colors duration-300 hover:bg-red-600"
                      onClick={() => handleDelete(log.id)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-auto max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Work Order" : "Add New Work Order"}
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="week"
                placeholder="Week"
                value={newWorkOrder.week}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={newWorkOrder.date}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="due_date"
                placeholder="Due Date"
                value={newWorkOrder.due_date}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="pic"
                placeholder="PIC"
                value={newWorkOrder.pic}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="work_giver"
                placeholder="Work Giver"
                value={newWorkOrder.work_giver}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="project"
                placeholder="Project"
                value={newWorkOrder.project}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="account"
                placeholder="Account"
                value={newWorkOrder.account}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="work_order"
                placeholder="Work Order"
                value={newWorkOrder.work_order}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="priority"
                placeholder="Priority"
                value={newWorkOrder.priority}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={newWorkOrder.status}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="progress"
                placeholder="Progress"
                value={newWorkOrder.progress}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <textarea
                name="note"
                placeholder="Note"
                value={newWorkOrder.note}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                className="bg-[#72c1c5] text-white py-2 px-4 rounded-md"
                onClick={handleAddWorkOrder}
              >
                {editIndex !== null ? "Update" : "Add"}
              </Button>
              <Button
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableWorkOrder;
