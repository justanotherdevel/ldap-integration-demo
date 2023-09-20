"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        router.push("/adminLogin");
      } else {
        console.log(user);
        setIsSuccess(true);
      }
    })(),
      [];
  });
  if (!isSuccess) return <div>Loading...</div>;
  return <main>{children}</main>;
}

async function getUser() {
  try {
    const { data } = await axios.get("/api/admin/me");
    return {
      user: data,
      error: null,
    };
  } catch (err) {
    return {
      user: null,
      error: err,
    };
  }
}
