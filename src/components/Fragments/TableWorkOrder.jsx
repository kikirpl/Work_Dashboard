import Button from "../Elements/button";

const TableWorkOrder = () => {
  const workorders = [
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
    {
      id: 2,
      week: "Week 33",
      date: "2024-08-16",
      due_date: "2024-08-23",
      pic: "Michael Lee",
      work_giver: "David Lee",
      project: "Project XYZ",
      account: "Client Y",
      work_order: "WO-5678",
      priority: "Medium",
      status: "Pending",
      progress: "20%",
      note: "Gathering materials",
    },
    {
      id: 3,
      week: "Week 33",
      date: "2024-08-17",
      due_date: "2024-08-27",
      pic: "Jane Smith",
      work_giver: "John Doe",
      project: "Project MNO",
      account: "Client Z",
      work_order: "WO-9012",
      priority: "Low",
      status: "Completed",
      progress: "100%",
      note: "bjirr",
    },
    // Add more work order objects as needed
  ];
  return (
    <div className="content h-screen ml-auto flex flex-col p-6">
      <h2 className="text-2xl text-[#303030] font-bold mb-6">
        Table Permintaan kerja atau Work Order
      </h2>
      <div className="bg-white p-4 rounded-3xl px-5 py-7 shadow-md flex-1 mr-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-xl font-semibold">
            Table WorkOrder or Work Request
          </h3>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
          <table className=" text-sm bg-white">
            <thead>
              <tr>
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
              </tr>
            </thead>
            <tbody>
              {workorders.map((log, index) => (
                <tr key={index}>
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
                  <td className="border-b p-4">
                    <div className="flex space-x-2">
                      <Button className="bg-[#5932EA] text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#4628b7]">
                        Edit
                      </Button>
                      <Button className="bg-red-500 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-red-600">
                        X
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end py-5 text-lg">
            <Button
              className="bg-[#72c1c5]"
              onClick={() => setIsModalOpen(true)}
            >
              Add Workorder+
            </Button>
            {/* <UserDropdown /> */}
          </div>
        </div>
      </div>
            
    </div>
  );
};

export default TableWorkOrder;
