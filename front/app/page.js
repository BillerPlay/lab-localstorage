"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    // Decode the JWT payload (base64url) to get the email — no request needed
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.email);
    } catch {
      // Malformed token — treat as logged out
      localStorage.removeItem("authToken");
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("authToken");
    router.push("/login");
  }

  // Render nothing until the effect runs (avoids hydration flash)
  if (!email) return null;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">You are in, my friend</h1>

      <p className="text-zinc-500">
        Logged in as <span className="font-medium text-black">{email}</span>
      </p>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Log out
      </button>
    </main>
  );
}