// app/google/callback/page.js
"use client";

import {useEffect, Suspense} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/app/context/useContext';

const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code'); // Get the auth code from the URL
  const { setUserAndToken } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      if (code) {
        try {
          // Send the authorization code to the backend
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (response.ok) {
            // Set user and token in the context
            setUserAndToken(data.user, data.token);

            // Redirect to attendance page after setting user
            router.push('/viewattendance');
          } else {
            console.error('Failed to authenticate:', data.error);
          }
        } catch (err) {
          console.error('Error during Google OAuth:', err);
        }
      }
    };

    handleGoogleAuth();
  }, [code, router, setUserAndToken]);

  <div className="auth-processing">
  <p>Don’t go anywhere! We’re almost done making friends with Google. Your patience is the secret ingredient!</p>
</div>
};

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );

export default Page;
