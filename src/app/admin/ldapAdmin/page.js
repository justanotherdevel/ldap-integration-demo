"use client";
import axios from "axios";
import React from "react";
import LDAPForm from "./ldapForm";

const AdminPage = () => {
  return (
    <>
      <div className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Page</h1>
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
      <LDAPForm />
    </>
  );
};

export default AdminPage;
