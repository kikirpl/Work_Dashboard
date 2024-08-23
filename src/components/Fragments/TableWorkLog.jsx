import Button from "../Elements/button";

const TableWorkLog = () => {
  const worklogs = [
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
  ];
  return (
    <div className="content h-screen ml-auto flex flex-col p-6">
      <h2 className="text-2xl text-[#303030] font-bold mb-6">
        Table aktivitas atau WorkLog
      </h2>
      <div className="bg-white p-4 rounded-3xl px-5 py-7 shadow-md flex-1">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-xl font-semibold">WorkLog or Activity record</h3>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
          <table className="min-w-full text-sm bg-white">
            <thead>
              <tr>
                <th className="border-b-2 p-4 text-left">Nomor</th>
                <th className="border-b-2 p-4 text-left">Date</th>
                <th className="border-b-2 p-4 text-left">Week</th>
                <th className="border-b-2 p-4 text-left">PIC</th>
                <th className="border-b-2 p-4 text-left">Opportunity</th>
                <th className="border-b-2 p-4 text-left">Type</th>
                <th className="border-b-2 p-4 text-left">Account</th>
                <th className="border-b-2 p-4 text-left">Activity</th>
                <th className="border-b-2 p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {worklogs.map((log, index) => (
                <tr key={index}>
                  <td className="border-b p-4">{index + 1}</td>
                  <td className="border-b p-4">{log.date}</td>
                  <td className="border-b p-4">{log.week}</td>
                  <td className="border-b p-4">{log.pic}</td>
                  <td className="border-b p-4">{log.opportunity}</td>
                  <td className="border-b p-4">{log.type}</td>
                  <td className="border-b p-4">{log.account}</td>
                  <td className="border-b p-4">{log.activity}</td>
                  <td className="border-b p-4">
                    <div className="flex space-x-2">
                      <Button className="bg-[#7259cc] text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#4628b7]">
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
              Add Worklog+
            </Button>
            {/* <UserDropdown /> */}
          </div>
        </div>
      </div>
            
    </div>
  );
};

export default TableWorkLog;
