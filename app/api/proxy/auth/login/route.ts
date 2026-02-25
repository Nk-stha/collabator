import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/partners/auth/login`;

    // Create FormData for multipart/form-data request
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let fetch set it with boundary
    });

    const data = await response.json();

    // If login successful, set cookies
    if (data.success && data.data?.access_token && data.data?.refresh_token) {
      const res = NextResponse.json(data, { status: response.status });
      
      // Set access token cookie (30 days)
      res.cookies.set('access_token', data.data.access_token, {
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      // Set refresh token cookie (30 days)
      res.cookies.set('refresh_token', data.data.refresh_token, {
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      return res;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
