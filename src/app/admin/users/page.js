"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UsersTable } from "./userTable";

const AdminPage = () => {
  const [ldap, setLdap] = useState([]);
  const [page, setPage] = useState(1); // Default page
  const pageSize = 10;
  const [count, setCount] = useState(0); // Total user count
  const router = useRouter();
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    (async () => {
      if (!fetchData) return;
      try {
        const res = await axios.get("/api/ldap/getUsers", {
          params: { page, pageSize }, // Include page and pageSize as query parameters
        });
        const { data } = res;
        setLdap(data.users);
        setCount(data.count);
        setFetchData(false);
      } catch (error) {
        console.error("Error fetching LDAP data:", error);
      }
    })();
  }, [fetchData, page, pageSize]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setFetchData(true); // Trigger data fetch when page changes
  };

  return (
    <>
      <div className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Page</h1>
        <button
          onClick={async () => {
            router.push("/admin/ldaps");
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Admin
        </button>
        <button
          onClick={async () => {
            await axios.post("/api/admin/deauthenticate");
            router.refresh();
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
      <UsersTable ldap={ldap} />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)} // Go to previous page
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
          disabled={page === 1} // Disable when on the first page
        >
          Previous Page
        </button>
        <span className="mx-4 text-gray-600">
          Page {page} of {Math.ceil(count / pageSize)}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)} // Go to next page
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
          disabled={page === Math.ceil(count / pageSize)} // Disable when on the last page
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default AdminPage;
