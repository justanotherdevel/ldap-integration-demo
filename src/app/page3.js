"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      router.push("/ldaps/admin");
    })(),
      [];
  });
  return (
    <main>
      <h1>Loading...</h1>
      {/* TEST */}
      {/* <ForgotPasswordForm /> */}
    </main>
  );
}