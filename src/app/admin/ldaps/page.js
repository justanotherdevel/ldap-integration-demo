"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LdatTable } from "./ldapTable";

const AdminPage = () => {
  const [ldap, setLdap] = useState([]);
  const router = useRouter();
  // const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    (async () => {
      // if (!fetchData) return;
      const res = await axios.get("/api/ldap/getAdmins");
      const { data } = res;
      setLdap(data);
      // setFetchData(false);
    })(),
      [];
  });
  return (
    <>
      <div className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Page</h1>
        <button
          onClick={async () => {
            router.push("/admin/users");
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Users
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
      <LdatTable ldap={ldap} />
      <div className="text-white py-4 px-6 flex items-center">
        <button
          onClick={async () => {
            router.push("/admin/ldapAdmin");
          }}
          className="bg-green-500 mx-auto hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Add New
        </button>
      </div>
    </>
  );
};

export default AdminPage;
