"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LDAPForm from "../ldapForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const AdminPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const edit = searchParams.get("edit") || false;
  const [ldap, setLdap] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/ldap/getAdmins/${id}`);
      const { data } = res;
      if (data["ldap"]) {
        setLdap(data["ldap"]);
      }
    } catch (error) {
      if (error.response.status === 404) {
        router.replace("/404");
      }
    }
  };

  useEffect(() => {
    if (!id) return; // Make sure "id" is defined
    fetchData(); // Call the async function here
  }, [id]);

  useEffect(() => {
    console.log("ldap", ldap);
  }, [ldap]);
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
      <LDAPForm initialValues={ldap} edit={edit} />
    </>
  );
};

export default AdminPage;
