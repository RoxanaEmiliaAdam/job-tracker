"use client";

import MyJobTable from "./MyJobTable";

export default function MyListPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        My Job Applications
      </h1>
      <MyJobTable />
    </main>
  );
}
