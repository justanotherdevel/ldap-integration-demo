"use client";
import ForgotPasswordForm from "../components/forgot_password_form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Home() {
  const { org } = useParams();
  const [ldap, setLdap] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/ldap/getConnections/${org}/nonAdmin`);
      const { data } = res;
      if (data["ldap"]) {
        console.log("data", data["ldap"]);
        setLdap(data["ldap"]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!org) return;
    fetchData();
  }, [org]);

  useEffect(() => {
    console.log("ldap", ldap);
  }, [ldap]);
  if (ldap) {
    return (
      <main>
        {/* TEST */}
        <ForgotPasswordForm org={org} />
      </main>
    );
  } else return <main>Invalid page or loading</main>;
}
