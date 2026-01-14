import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const lastPage = 5;

  useEffect(() => {
    // API (موقوف حالياً)
    /*
    fetch(`/api/admin/users?page=${page}`)
      .then(res => res.json())
      .then(data => setUsers(data.data));
    */

    setUsers([
      {
        id: 1,
        full_name: "Ahmad Alhomse",
        email: "ahmad@gmail.com",
        user_type: "Doctor",
        attachments: true,
        date: "21/03/2025",
        is_active: false,
      },
      {
        id: 2,
        full_name: "Sara Mohammad",
        email: "sara@gmail.com",
        user_type: "Patient",
        attachments: false,
        date: "22/03/2025",
        is_active: true,
      },
    ]);
  }, [page]);

  return (
    <>
      <h1 className="text-2xl font-bold text-[#052443] mb-6">
        Users Management
      </h1>    
      <div className="bg-white rounded-xl shadow">
        
        <table className="w-full text-sm text-left">
          <thead className="bg-[#eaf7f7] text-gray-700">
            <tr>
              <th className="p-4">ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Attachments</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">#{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.user_type}</td>

                <td>
                  {user.attachments ? (
                    <button className="text-[#39CCCC] border border-[#39CCCC] px-3 py-1 rounded-lg">
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td>{user.date}</td>

                <td className="flex gap-2 py-3">
                  {!user.is_active ? (
                    <>
                      <button className="px-3 py-1 bg-[#39CCCC] text-white rounded-lg">
                        Activate
                      </button>
                      <button className="px-3 py-1 border border-red-400 text-red-500 rounded-lg">
                        Decline
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-3 py-1 border border-gray-400 rounded-lg">
                        Edit
                      </button>
                      <button className="px-3 py-1 border border-red-400 text-red-500 rounded-lg">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-4 py-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg disabled:text-gray-400"
          >
            Previous
          </button>

          <span className="text-sm">
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersManagement;
