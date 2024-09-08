// app/api/auth/google/route.js

import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI, // Update with your correct redirect URI
);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse request body
    const { code } = body;

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Retrieve user profile information
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data: userInfo } = await oauth2.userinfo.get();

    // Prepare response data
    const responseData = {
      user: {
        given_name:userInfo.given_name,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      },
      token: tokens.access_token,
    };

    // Return the user info and access token as JSON
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error exchanging code for token:', error);

    // Handle errors gracefully
    return new Response(
      JSON.stringify({ error: 'Failed to authenticate with Google' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
