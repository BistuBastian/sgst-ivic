export default function AdminDashboard() {
  const stats = [
    { label: 'Pending', count: 12, color: 'bg-yellow-500' },
    { label: 'In Progress', count: 5, color: 'bg-blue-500' },
    { label: 'Repaired', count: 24, color: 'bg-green-500' }
  ];

  return (
    <div className="w-full p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-jost font-bold text-primary">Global Management Dashboard</h1>
        <p className="text-text/50">Overview of technical support activities</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} p-6 rounded-xl text-white shadow-md`}>
            <p className="text-lg opacity-90">{s.label}</p>
            <p className="text-4xl font-bold">{s.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-primary mb-4">Workload by Technician</h2>
        <p className="italic text-text/50">Table data is currently static (Mockup)</p>
      </div>
    </div>
  );
}