"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ForgotPasswordForm from "@/app/components/forgot_password_form";

export default function Home() {
  const { org } = useParams();
  const [ldap, setLdap] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/ldap/getConnections/${org}/nonAdmin`);
      if (res.status !== 200) {
        console.log(res.status);
        return;
      }
      const { data } = res;
      if (data["ldap"]) {
        console.log("data", data["ldap"]);
        setLdap(data["ldap"]);
      }
    } catch (error) {
      if (error.response.status === 404) {
        router.replace("/notFound");
      } else {
        console.log("error", error.response);
      }
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
