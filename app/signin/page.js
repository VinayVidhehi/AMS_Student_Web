"use client";

import { Button } from "@/components/ui/button";
import Header from '@/components/sections/Header';
export default function SignInPrompt() {

  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI)}&response_type=code&scope=openid%20email%20profile`;
  
    const handleLogin = () => {
      window.location.href = googleOAuthUrl;
    };
  

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col gap-20 justify-center items-center flex-grow">
        <div className="flex flex-col gap-8 text-center">
          <p className="text-xl">You are not signed in right now</p>
          <Button onClick={handleLogin}>
            <h1>Sign In with RVCE Email</h1>
          </Button>
        </div>
      </div>
    </div>
  );
}




