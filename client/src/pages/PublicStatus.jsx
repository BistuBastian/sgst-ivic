export default function PublicStatus() {
  return (
    <div className="w-screen min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Check Your Status</h1>
        <p className="text-gray-600 mb-8">Enter your ticket number or ID to track your equipment</p>
        
        <div className="bg-background p-6 rounded-2xl shadow-sm border space-y-4">
          <input 
            type="text" placeholder="e.g., TKT-12345 or V-12345678"
            className="w-full p-4 border rounded-xl focus:border-blue-500 outline-none transition"
          />
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:shadow-lg transition">
            Search Status
          </button>
        </div>
        
        <a href="/login" className="mt-8 inline-block font-bold text-primary hover:underline">
          Staff Portal Access
        </a>
      </div>
    </div>
  );
}