import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    // Call backend logout endpoint if refresh token exists
    if (refreshToken) {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/partners/auth/logout`;
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (error) {
        console.error('Backend logout failed:', error);
        // Continue with cookie cleanup even if backend call fails
      }
    }

    // Clear cookies
    const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
    
    res.cookies.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    res.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Logout proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
