import { useState } from "react";
import Button from "../Elements/button";

const TableWorkLog = () => {
  const [worklogs, setWorklogs] = useState([
    {
      id: 1,
      date: "2024-08-15",
      week: "Week 33",
      pic: "John Doe",
      opportunity: "Project ABC",
      type: "Meeting",
      account: "Client X",
      activity: "Brainstorming session",
    },
    {
      id: 2,
      date: "2024-08-16",
      week: "Week 33",
      pic: "Jane Smith",
      opportunity: "Project XYZ",
      type: "Call",
      account: "Client Y",
      activity: "Follow-up call",
    },
    {
      id: 3,
      date: "2024-08-17",
      week: "Week 33",
      pic: "Michael Lee",
      opportunity: "Project MNO",
      type: "Email",
      account: "Client Z",
      activity: "Sending proposal",
    },
  ]);

  const [filteredWorklogs, setFilteredWorklogs] = useState(worklogs);
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
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewWorkLog({ ...newWorkLog, [e.target.name]: e.target.value });
  };

  const handleAddWorkLog = () => {
    if (editIndex !== null) {
      // Edit existing work log
      const updatedWorklogs = [...worklogs];
      updatedWorklogs[editIndex] = {
        ...newWorkLog,
        id: updatedWorklogs[editIndex].id,
      };
      setWorklogs(updatedWorklogs);
    } else {
      // Add new work log
      setWorklogs([...worklogs, { ...newWorkLog, id: worklogs.length + 1 }]);
    }
    setIsModalOpen(false); // Close modal after adding or editing
    setNewWorkLog({
      date: "",
      week: "",
      pic: "",
      opportunity: "",
      type: "",
      account: "",
      activity: "",
    }); // Reset form after submit
    setEditIndex(null); // Reset edit index after submit
  };

  const handleEdit = (index) => {
    setNewWorkLog(worklogs[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setWorklogs(worklogs.filter((worklog) => worklog.id !== id));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredWorklogs(
      worklogs.filter((worklog) =>
        Object.values(worklog).some((value) =>
          value.toLowerCase().includes(term)
        )
      )
    );
  };

  return (
    <div className="content h-screen ml-auto flex flex-col p-6">
      <h2 className="text-2xl text-[#303030] font-bold mb-6">
        Table Aktivitas atau WorkLog
      </h2>
      <div className="bg-white p-4 rounded-3xl px-5 py-7 shadow-md flex-1">
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

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white">
            <thead>
              <tr className="bg-gray-200">
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
              {filteredWorklogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b p-4">{index + 1}</td>
                  <td className="border-b p-4">{log.date}</td>
                  <td className="border-b p-4">{log.week}</td>
                  <td className="border-b p-4">{log.pic}</td>
                  <td className="border-b p-4">{log.opportunity}</td>
                  <td className="border-b p-4">{log.type}</td>
                  <td className="border-b p-4">{log.account}</td>
                  <td className="border-b p-4">{log.activity}</td>
                  <td className="border-b p-4 flex space-x-2">
                    <Button
                      className="bg-[#7259cc] text-white py-1 px-3 rounded-md transition-colors duration-300 hover:bg-[#4628b7]"
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
          <Button
            className="bg-[#72c1c5]"
            onClick={() => {
              setNewWorkLog({
                date: "",
                week: "",
                pic: "",
                opportunity: "",
                type: "",
                account: "",
                activity: "",
              });
              setEditIndex(null); // Ensure we're adding a new item
              setIsModalOpen(true);
            }}
          >
            Add Worklog+
          </Button>
        </div>
      </div>

      {/* Modal Box */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-auto max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Work Log" : "Add New Work Log"}
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={newWorkLog.date}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="week"
                placeholder="Week"
                value={newWorkLog.week}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="pic"
                placeholder="PIC"
                value={newWorkLog.pic}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="opportunity"
                placeholder="Opportunity"
                value={newWorkLog.opportunity}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={newWorkLog.type}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="account"
                placeholder="Account"
                value={newWorkLog.account}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <textarea
                name="activity"
                placeholder="Activity"
                value={newWorkLog.activity}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                className="bg-[#5932EA] text-white py-2 px-4 rounded-md"
                onClick={handleAddWorkLog}
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

export default TableWorkLog;
