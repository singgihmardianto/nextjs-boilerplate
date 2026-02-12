import React from "react";

export default async function AdminPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the admin dashboard. Select an option from the sidebar to get started.
      </p>

      <ul className="list-disc pl-5">
        <li>User Management</li>
      </ul>
    </div>
  );
}
