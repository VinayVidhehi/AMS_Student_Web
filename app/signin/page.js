"use client";

import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from '@/components/sections/Header';
import { useEffect } from "react";

export default function SignInPrompt() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      const emailDomain = data?.user?.email?.split('@')[1];
      if (emailDomain === process.env.DOMAIN) {
        router.back(); // Redirect to the homepage
      }
    }
  }, [status, data, router]);

  async function handleSignIn() {
    await signIn('google', { callbackUrl: '/' });
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col gap-20 justify-center items-center flex-grow">
        <div className="flex flex-col gap-8 text-center">
          <p className="text-xl">You are not signed in right now</p>
          <Button onClick={handleSignIn}>
            <h1>Sign In with RVCE Email</h1>
          </Button>
        </div>
      </div>
    </div>
  );
}
