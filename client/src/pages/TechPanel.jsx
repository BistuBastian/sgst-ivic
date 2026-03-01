export default function TechPanel() {
  const myTasks = [
    { id: 'TKT-001', equipment: 'Dell Optiplex', status: 'In Progress' },
    { id: 'TKT-004', equipment: 'HP LaserJet', status: 'Pending' }
  ];

  return (
    <div className="w-full p-8">
      <h1 className="mb-8 text-4xl font-jost font-bold text-text-base">My Assigned Tasks</h1>
      <div className="space-y-4">
        {myTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <span className="text-sm font-bold text-secondary">{task.id}</span>
              <h3 className="text-lg font-medium">{task.equipment}</h3>
            </div>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}