import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#0a3460] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">Healix</div>

        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-white text-[#0a3460] font-medium">
            Users
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#123f73]">
            Services
          </button>
        </nav>

        <div className="p-4 border-t border-white/20">
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#123f73]">
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="h-16 bg-white shadow flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-700">Users</h1>
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Admin</span>
            <div className="w-9 h-9 rounded-full bg-[#39CCCC]" />
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
